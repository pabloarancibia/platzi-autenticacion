/**
 * Servidor de express para exponer un endpoint
 * que nos brinde el JWT
 */

 const express = require('express');
 const jwt = require('jsonwebtoken');
 const {config} = require('./config');
 
// inicio express
 const app = express();

 //parser json
 app.use(express.json());

 // sign jwt
 app.post("/api/auth/token", function(req,res){
    const {email, username, name} = req.body;
    const token = jwt.sign({sub:username, email, name}, 
        config.authJwtSecret);
    
    res.json({access_token: token});
 });

 // verify jwt
 app.get("/api/auth/verify", function(req, res, next){
    const {access_token} = req.query;//acá conviene implementar bearer en header

    //acá podemos implementar async en vez de try catch
    try {
        const decoded = jwt.verify(access_token, config.authJwtSecret);

        res.json({message: "access token valid", username: decoded.sub })

    } catch (error) {
        next(error);
    }
 });


 // levanto el server en puerto: 5000
 const server = app.listen(5000,function(){
    console.log('listening on port ', server.address().port);
 });