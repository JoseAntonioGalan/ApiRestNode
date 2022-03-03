const express = require('express');
const app = express();
const mysql = require('mysql');
const myconn = require('express-myconnection');
const dbConfig = require('./dbConfig');


// Settings Port
app.set('port', process.env.PORT || 3000);


// Middle wares
app.use(myconn(mysql, dbConfig, 'single')); // It is connection to database
app.use(express.urlencoded({extended : false})); // It is used to collect the data from other sites
app.use(express.json()); // It is to collect data in JSON


// routes
app.use("/api/categorias",require('./routes/categorias.js'));
app.use('/api/apuntes', require('./routes/apuntes.js'));

// Starting the server
app.listen(app.get('port'), ()=>{
    console.log("Server on port", app.get('port'))
})