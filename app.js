const express = require('express');
const {Server} = require('socket.io');
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

const io = new Server(server); // se puede llamar io o cualquier otro nombre, siempre tenemos que pasarle el server para que socket sepa donde escuchar, io es el servidor en si

app.use(express.static(__dirname+'/public')); // dirname es la raiz de todo el projecto, evita que se lea en una ruta virtual no considerada, dirname no existe cuando trabajamos con type: module

let messages = []; // array de mensajes, porque no tenemos almacenamiento en la nube aun

io.on('connection', socket => { //cuando se conecte el socket, con ese socket que se conecto quiero hacer todo lo que paso
    console.log('Cliente conectado');
    socket.emit('messagelog', messages); // solo envia el historial de mensajes al cliente que se acaba de conectar
    socket.emit('welcome', 'BIENVENIDO A MI SOCKET'); // welcome es el nombre del evento, luego que quiero enviar al otro lado
    socket.on('message', data=>{
        messages.push(data);
        io.emit('messagelog', messages); // si usamos socket.emit esto reenvia el mensaje al cliente en su registro de eventos, pero usando io.emit el server comparte el mensaje a todos los clientes
    } )
})
