///========================
//Puerto
//=========================

process.env.PORT = process.env.PORT || 3000;



///========================
//ENTORNO
//=========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';




///========================
//BASE DE DATOS
//=========================
let urlDB;
if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://heroku:du1llIP49P93YzPp@cluster0-ycito.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;

//Para heroku
//Meter en el package.json
// "engines": {
//     "node": "13.13.0"
// },