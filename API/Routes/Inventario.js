const express = require('express');
const router = express.Router();

const db = require('../DB');

db.run(`CREATE TABLE inventario (id INTEGER PRIMARY KEY AUTOINCREMENT, codigo VARCHAR(30), descripcion TEXT, precio FLOAT, existencia NUMBER, inv. min NUMBER)`, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Tabla Inventario creada');
    });

router.post('/agregar_producto', (req, res) => {
    const { codigo, descripcion, precio, existencia, inv_min } = req.body;

    db.run(`INSERT INTO inventario(codigo, descripcion, precio, existencia, inv. min) VALUES (?, ?, ?, ?, ?)`, [codigo, descripcion, precio, existencia, inv_min], (err)=>{
        
        if(err){
            console.error(err.message);
        }
        console.log("Datos ingresados con exito");
    });

    res.send({message: 'Datos ingresados con exito'})
}); 

router.get('/productos', (req, res) =>{

    db.all(`SELECT descripcion FROM inventario`, (err, rows)=>{
        if(err){
            console.error(err.message)
        }
        res.json(rows);
    });

}); 

router.get('/producto/:id', (req, res) =>{

    const { id } = req.params;

    db.get(`SELECT descripcion FROM inventario WHERE id = ?`, [id], (err, rows)=>{
        if(err){
            console.error(err.message)
        }
        res.json(rows);
    });

}); 

router.put('/modificacion_producto/:id', (req, res) =>{

    const { id } = req.params;

    const { codigo, descripcion, precio, existencia, inv_min } = req.body;

    const parametros = [];
    const actualiza = [];

    sql = `UPDATE inventario SET `

    if (codigo !== undefined && codigo !== "") {
        actualiza.push(`codigo = ?`);
        parametros.push(codigo);
    }

    if(descripcion !== undefined && descripcion !== "") {
        actualiza.push(`descripcion = ?`);
        parametros.push(descripcion);
    }

    if(precio !== undefined && precio !== "") {
        actualiza.push(`precio = ?`);
        parametros.push(precio)
    }
    if(existencia !== undefined && existencia !== "") {
        actualiza.push(`existencia = ?`);
        parametros.push(existencia);
    }
    if(inv_min !== undefined && inv_min !== "") {
        actualiza.push(`inv. min = ?`);
        parametros.push(inv_min);
    }

    sql += actualiza.join(`,`);
    sql += `WHERE id = ?`;
    parametros.push(id);

    db.run(sql, parametros, (err)=>{
        if(err){
            console.error(err.message)
        }
        res.send({message: 'Datos modificados con exito'})
    });


}); 

router.get('/buscar', (req,res) =>{
    const { codigo, descripcion, precio, existencia, inv_min } = req.body;
    
    const parametros = [];
    const actualiza = [];

    sql = `SELECT * FROM inventario `

    if (codigo !== undefined && codigo !== "") {
        actualiza.push(`codigo = ?`);
        parametros.push(codigo);
    }

    if(descripcion !== undefined && descripcion !== "") {
        actualiza.push(`descripcion = ?`);
        parametros.push(descripcion);
    }

    if(precio !== undefined && precio !== "") {
        actualiza.push(`precio = ?`);
        parametros.push(precio)
    }
    if(existencia !== undefined && existencia !== "") {
        actualiza.push(`existencia = ?`);
        parametros.push(existencia);
    }
    if(inv_min !== undefined && inv_min !== "") {
        actualiza.push(`inv. min = ?`);
        parametros.push(inv_min);
    }

    sql += actualiza.join(`,`);
    sql += `WHERE id = ?`;
    parametros.push(id);

    db.run(sql, parametros, (err)=>{
        if(err){
            console.error(err.message)
        }
        res.send({message: 'Datos modificados con exito'})
    });
})

module.exports = router;