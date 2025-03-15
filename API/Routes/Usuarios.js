const express = require('express');
const router = express.Router();

const db = require('../DB')

db.run(`CREATE TABLE usuarios(id INTEGER PRIMARY KEY AUTOINCREMENT, usuario TEXT, email TEXT, contraseña TEXT, rol TEXT)`, (err) => {
if (err) {
    console.error(err.message);
}
console.log('Tabla usuarios creada');
});

function validarContraseña(contraseña) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_#%])[A-Za-z\d@$!%*?&-_#%]{8,}$/;
    return regex.test(contraseña);
}

function ValidarUsuario(usuario, contraseña, callback) {
    db.get('SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?', [usuario, contraseña], (err, row) =>{
        
        if (err) {
            callback(err, null);
            return;
          }
          // Si row existe, significa que se encontró un usuario con ese nombre de usuario.
          callback(null, row !== undefined);
        });
}


router.post('/login', (req, res) => {
    const { User } = req.body;
    const { Pass } = req.body;
    ValidarUsuario(User, Pass, (err, existe) =>{
        if (err) {
            console.error(err.message);
            return;
        }
        if(existe) {
            res.send({ message: "Session iniciada"})
        }else{
            res.send({message: 'Algo sucedió'})
        }
        
    })
    
    
});

router.post('/register', (req, res) =>{
    const { Username } = req.body;
    const { Password } = req.body;
    const { Email } = req.body;
    const { RePassword }  = req.body;

    
    if (!validarContraseña(Password)){
        res.send({ message: 'La contraseña no cumple con los requisitos de seguridad'})
    } else if (Password !== RePassword){
    
        res.send({message: 'Las contaseñas no son iguales'})

    } else {
        db.run(`Insert into usuarios (usuario, email, contraseña, rol) VALUES ( ?, ?, ?, ?)`, [Username, Email, Password, 'Empleado'], (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Datos ingresados con exito');
        });

            
        res.send({message: 'Se ha registrado con exito'})
    }
});

module.exports = router;