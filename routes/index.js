var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async(req, res, next) => {

  console.log(req.body)
  
  var nombre = req.body.nombre;
  var email = req.body.email;
  var edad = req.body.edad;
  var sugerencia = req.body.sugerencia;

  var obj = {
    to: 'jmunozcalello@gmail.com',
    subject: 'Formulario completado',
    html: nombre + ", " + edad + " años," +
    " completó el formulario a través de este mail: " + email
    + " y dejó este comentario: " + sugerencia
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS 
    }
  });

  var info = await transport.sendMail(obj);

  res.redirect('gracias');
});


module.exports = router;
