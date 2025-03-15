const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Punto_de_venta.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado a la base de datos Punto_de_venta.db');
  });

  module.exports = db;