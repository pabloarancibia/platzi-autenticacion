/**
 * Configuraciones para tomar variables de entorno
 * para no tomarlas directamente en la configuracion
 * sino utilizando este archivo como intermediario
 */
require('dotenv').config();

const config = {
    authJwtSecret: process.env.AUTH_JWT_SECRET
};

module.exports = {config: config};