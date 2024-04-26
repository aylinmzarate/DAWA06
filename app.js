const express = require('express');
const app = express();

// Configurar el motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Rutas
app.get('/pug', (req, res) => {
    res.render('index', { nombre: 'Usuario Pug', edad: 25, ciudad: 'Barcelona' });
});

// Ruta para página web de Annete
app.get('/Annete', (req, res) => {
    console.log('Accediendo a /Annete');
    res.render('Annete'); 
});

app.get('/Annete/servicios', (req, res) => {
    console.log('Accediendo a /Annete/servicios');
    res.render('servicios'); 
});

app.get('/Annete/servicios/design', (req, res) => {
    console.log('Accediendo a /Annete/servicios/design');
    res.render('design'); 
});

// Ruta para renderizar la tabla de multiplicar
app.get('/multiplicar/:numero', (req, res) => {
    const numero = parseInt(req.params.numero, 10);

    if (isNaN(numero)) {
        return res.status(400).send('El parámetro debe ser un número');
    }

    const tabla = [];
    for (let i = 1; i <= 10; i++) {
        tabla.push({ multiplicando: i, resultado: i * numero });
    }

    res.render('tabla', { numero: numero, tabla: tabla });
});

// Ruta para renderizar la plantilla Pug mejorada
app.get('/miplantilla-pug/:nombre/:edad/:correo', (req, res) => {
    const { nombre, edad, correo } = req.params;
    res.render('miplantilla', { 
        mensaje: '¡Hola desde la plantilla Pug!', 
        fecha: new Date().toDateString(),
        nombre: nombre,
        edad: parseInt(edad, 10),
        correo: correo
    });
});




// Ruta para renderizar la plantilla EJS
app.get('/miplantilla-ejs', (req, res) => {
    res.render('miplantilla.ejs', { mensaje: '¡Hola desde la plantilla EJS!', hora: new Date().toLocaleTimeString() });
});

// Ruta dinámica para mostrar el perfil del usuario
app.get('/perfil/:id', (req, res) => {
    const userId = req.params.id;
    // Aquí puedes buscar los datos del usuario en una base de datos, por ejemplo
    const user = { id: userId, nombre: 'Usuario ' + userId, edad: 30, ciudad: 'Madrid' };
    res.render('perfil', { user: user });
});

// Configurar EJS como motor de plantillas para una ruta específica
app.engine('ejs', require('ejs').renderFile);

// Ruta para renderizar la plantilla EJS mejorada
app.get('/ejs', (req, res) => {
    res.render('index.ejs', { nombre: 'Usuario EJS', hobby: 'Programar', trabajo: 'Desarrollador' });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Aplicación web dinámica ejecutándose en el puerto 3000');
});

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});
