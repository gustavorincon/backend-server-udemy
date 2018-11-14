var express = require('express');
var mAutenticacion = require('../milddlewares/autenticacion');

var app = express();

var Medico = require('../models/medico');

//===========================================
//Obetener todos los usuarios
//==========================================
app.get('/', (req, res, next) => {

    Medico.find({}, 'nombre email img role')
        .exec(
            (err, medicos) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando medico',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    medicos: medicos
                });
            });

});

//===========================================
//Actualizar nuevo medico
//==========================================

app.put('/:id', mAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Medico.findById(id, (err, medico) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar  medico',
                errors: err
            });
        }

        if (!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El medico con el id' + id + 'no existe',
                errors: { message: 'No existe un medico con ese ID' }
            });
        }
        medico.nombre = body.nombre;
        medico.usuario = req.usuario._id;
        medico.hospital = body.hospital;
        medico.save((err, medicoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar  medico',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                medico: medicoGuardado
            });
        });
    });
});
//===========================================
//Crear nuevo medico
//==========================================

app.post('/', mAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var medico = new Medico({
        nombre: body.nombre,
        usuario: req.usuario._id,
        hospital: body.hospital
    });

    medico.save((err, medicoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error guardando medico',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            medico: medicoGuardado
        })
    });
});
//===========================================
//Eliminar nuevo usuario
//==========================================

app.delete('/:id', mAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    Medico.findByIdAndRemove(id, (err, medicoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar  usuario',
                errors: err
            });
        }
        if (!medicoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: { message: 'No existe un usuario con ese id' }
            });
        }
        res.status(200).json({
            ok: true,
            medico: medicoBorrado
        });

    });

});


module.exports = app;