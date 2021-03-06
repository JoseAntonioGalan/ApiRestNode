const { Router } = require('express')
const router = Router()


// Obtener todos o uno
router.get('/', (req, res) => {
    
    const idCategoria = req.query.idCategoria;

    if(idCategoria){
        req.getConnection((err, conn) =>{
            if(err) return res.send(err);
        
            conn.query('SELECT * FROM categorias WHERE idCategoria LIKE ?;', idCategoria, (err, row) =>{
                if (err) return res.send('Error en la consulta');
                res.json(row);
            })
        })
    }else{
        req.getConnection((err, conn) =>{
            if(err) return res.send(err);
            conn.query('SELECT * FROM categorias', (err, rows) =>{
                if (err) return res.send('Error en la consulta');
                res.json(rows);
            })
        })
    }

    
});


//Insertar
router.post('/', (req, res) => {
    req.getConnection((err, conn) =>{
        if(err) return res.send(err);
        const { nombreCategoria } = req.body;

        if( nombreCategoria) {
            conn.query("INSERT INTO categorias(nombreCategoria) VALUES('"+nombreCategoria+"')", () =>{
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
        const idCategoria = req.query.idCategoria;

        if(idCategoria){
            conn.query("DELETE FROM categorias WHERE idCategoria = ?", idCategoria, (err) =>{
                if(err) return res.sendStatus(404);
                res.sendStatus(200);
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

        const { idCategoria, nombreCategoria } = req.query;

        if(idCategoria && nombreCategoria){
            conn.query("UPDATE categorias SET nombreCategoria = '"+nombreCategoria+"' WHERE idCategoria = " + idCategoria, ()=>{
                res.send("1");
            })
        }else{
            res.send("0");
        }
    })
})

module.exports = router;