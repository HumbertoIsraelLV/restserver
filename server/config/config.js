///========================
//Puerto
//=========================

process.env.PORT = process.env.PORT || 3000;



///========================
//ENTORNO
//=========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

///========================
//VENCIMIENTO DEL TOKEN
//=========================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

///========================
//SEED DE AUTENTICACION
//=========================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


///========================
//BASE DE DATOS
//=========================
let urlDB;
if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//Para heroku
//Meter en el package.json
// "engines": {
//     "node": "13.13.0"
// },


///========================
//GOOGLE CLIENT ID
//=========================
process.env.CLIENT_ID = process.env.CLIENT_ID || '579261803947-ucifr3di2m3e2u12f6oc9db207c3djv4.apps.googleusercontent.com';