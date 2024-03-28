var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

router.get('/', async function(req, res, next) {

        var novedades = await novedadesModel.getNovedades();

        res.render('gracias' , {
            layout: 'layout', 
            usuario: req.session.nombre, 
            novedades
        });
}); 

router.get('/add', (req,res,next) => {
    res.render('admin/add',{
        layout: 'admin/layout'
    })
});

router.post('/', async (req,res,next) =>{
    try {
        if (req.body.titulo != "" && req.body.desarrollo != ""){
            await novedadesModel.insertNovedad(req.body);
            res.redirect('gracias')
        } else {
            res.render('admin/add', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    }catch (error) {
        console.log(error)
        res.render('admin/add', {
            layout: 'admin/layout',
            error:true,
            message:'No se cargo la novedad'
        })
    }
})
module.exports = router;