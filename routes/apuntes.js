const { Router } = require('express')
const router = Router()

// Obtener todos o uno
router.get('/', (req, res) => {
    
    const idCategoriaFK = req.query.idCategoriaFK;

    if(idCategoriaFK){
        req.getConnection((err, conn) =>{
            if(err) return res.send(err);
        
            conn.query('SELECT * FROM apuntes WHERE idCategoriaFK = ?;', idCategoriaFK, (err, row) =>{
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
                res.send("1");
            })
        }else{
            res.send("0")
        }
    })
})

// Eliminar
router.delete('/', (req, res) => {
    req.getConnection((err, conn) =>{
        if (err) return res.send(err);
        const idApunte = req.query.idApunte;

        if(idApunte){
            conn.query("DELETE FROM apuntes WHERE idApunte = ?", idApunte, () =>{
                res.send("1");
            })
        }else{
            res.send("0");
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
                res.send("1");
            })
        }else{
            res.send("0");
        }
    })
})

module.exports = router;