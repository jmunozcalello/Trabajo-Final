var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel')

router.get('/', function(req, res, next) {
  res.render('admin/login',{
    layout:'admin/layout'
  });
});

router.get('/logout', function (req,res,next){
  req.session.destroy();
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

router.post('/', async(req,res, next) => {
    try {
        var usuario = req.body.usuario;
        var password = req.body.password;

        

        var data = await usuariosModel.getUserAndPassword
        (usuario, password);

        console.log(req.body);
        console.log("Datos obtenidos de la base de datos:", data);

        if (data != undefined) {
          req.session.id_usuario = data.id;
          req.session.nombre = data.usuario;
         
            res.redirect('add');
        } else {
                res.render('admin/login',{
                   layout: 'admin/layout',
                   error: true
                })
            }
        }
      catch (error) {
        console.log(error)
      }
    
})

module.exports = router;