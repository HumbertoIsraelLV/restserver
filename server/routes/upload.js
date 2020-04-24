const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');



//default options
app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:tipo/:id', function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;



    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionad ningun archivo'
            }
        });
    }

    let tiposValidos = ['producto', 'usuario'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El tipo ingresado no es valido (' + tiposValidos.join(', ') + ')'
            }
        });
    }

    let archivo = req.files.archivo;
    let extensionesValidas = ['png', 'jpg', 'pdf', 'jpeg', 'PNG'];
    let nombreArchivo = archivo.name.split('.');
    let extension = nombreArchivo[nombreArchivo.length - 1];
    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El archivo no posee una extension permitida (' + extensionesValidas.join(', ') + ')'
            }
        });
    }

    //Cambiar nombre al archivo
    let nom = `${id}-${new Date().getMilliseconds()}.${extension}`;


    archivo.mv(`uploads/${tipo + 's'}/${nom}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        switch (tipo) {
            case 'usuario':
                imagenUsuario(id, res, nom);
                break;
            case 'producto':
                imagenProducto(id, res, nom);
                break;
        }

    });
});

function imagenUsuario(id, res, nom) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borraArchivo(nom, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            borraArchivo(nom, 'usuarios');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        borraArchivo(usuarioDB.img, 'usuarios');


        usuarioDB.img = nom;

        usuarioDB.save((err, usuarioDB) => {
            res.json({
                ok: true,
                usuario: usuarioDB,
                img: nom
            });
        });

    });
}

function imagenProducto(id, res, nom) {
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            borraArchivo(nom, 'productos');
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            borraArchivo(nom, 'productos');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        borraArchivo(productoDB.img, 'productos');


        productoDB.img = nom;

        productoDB.save((err, productoDB) => {
            res.json({
                ok: true,
                producto: productoDB,
                img: nom
            });
        });

    });
}

function borraArchivo(nombre, tipo) {
    let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${nombre}`);
    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }
}


module.exports = app;