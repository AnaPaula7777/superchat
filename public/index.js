// aqui no se importa socket porque ya esta importado en index.html y este archivo ya solo lo usa

const socket = io();

let input = document.getElementById('mensaje');
let user = document.getElementById('user');
input.addEventListener('keyup', (e)=>{
    if(e.key==="Enter"){
        if(e.target.value){
            socket.emit('message', {user: user.value, message: e.target.value});
        }
        else{
            console.log('NO ENVIADO');
        }
}})
socket.on('welcome', data=>{ //escucha el evento welcom from el servidor
    alert(data);
})
socket.on('messagelog', data=>{
    console.log(data);
})
socket.on('messagelog', data=>{
    let p = document.getElementById('log');
    let mensajes = data.map(message=>{
        return `<div><span>${message.user} dice ${message.message}</span></div>`
    }).join(''); // este join es para que se le vayan las comas del array
    p.innerHTML= mensajes;
})