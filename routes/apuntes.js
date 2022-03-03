const { Router } = require('express')
const router = Router()

// Obtener todos o uno
router.get('/', (req, res) => {
    
    const idApunte = req.query.idApunte;

    if(idApunte){
        req.getConnection((err, conn) =>{
            if(err) return res.send(err);
        
            conn.query('SELECT * FROM apuntes WHERE idApunte LIKE ?;', idApunte, (err, row) =>{
                if (err) return res.send('Error en la consulta');
                res.json(row);
            })
        })
    }else{
        req.getConnection((err, conn) =>{
            if(err) return res.send(err);
            conn.query('SELECT * FROM apuntes', (err, rows) =>{
                if (err) return res.send('Error en la consulta');
                res.json(rows);
            })
        })
    }

    
});

// Insertar
router.post('/', (req, res) => {
    req.getConnection((err, conn) =>{
        if(err) return res.send('Error')
        const { fechaApunte, descripcionApunte, idCategoriaFK } = req.body;

        if( fechaApunte && descripcionApunte && idCategoriaFK) {
            conn.query("INSERT INTO apuntes(fechaApunte, descripcionApunte, idCategoriaFK) VALUES('"+fechaApunte+"', '"+descripcionApunte+"', "+idCategoriaFK+")", () =>{
                res.send('Insertado en Apuntes');
            })
        }else{
            res.send('Error en los parámetros')
        }
    })
})

// Eliminar
router.delete('/', (req, res) => {
    req.getConnection((err, conn) =>{
        if (err) return res.send(err);
        const idApunte = req.query.idApunte;

        if(idApunte){
            conn.query("DELETE FROM apuntes WHERE idApunte LIKE ?", idApunte, () =>{
                res.send('Eliminado Correctamente');
            })
        }else{
            res.send('Error en los parámetros');
        }

    })
});

// Actualizar
router.put('/', (req, res) =>{
    req.getConnection((err, conn) =>{
        if (err) return res.send(err);
        const { idApunte, fechaApunte, descripcionApunte, idCategoriaFK } = req.query;

        if(idApunte && fechaApunte && descripcionApunte && idCategoriaFK){
            conn.query("UPDATE apuntes SET fechaApunte = '"+fechaApunte+"', descripcionApunte = '"+descripcionApunte+"', idCategoriaFK = "+idCategoriaFK+" WHERE idApunte = " + idApunte, ()=>{
                res.send('Modificado correctamente');
            })
        }else{
            res.send('Error en los parámetros');
        }
    })
})

module.exports = router;