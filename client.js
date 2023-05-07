
// const express = require('express');
// const cors = require('cors');

// const app = express();

// // Enable CORS for all routes
// app.use(cors());

// // Handle your routes here

// app.listen(8000, () => {
//     console.log('Server started on port 8000');
// });

const socket = io("http://localhost:443");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3')

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message'); // Adds a class for our message element
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left') {
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault(); // Prevents the reloading of the page
    const message = messageInput.value;
    append(`You : ${message}`,'right')
    socket.emit('send',message)
    messageInput.value = '';
})

socket.emit('new-user-joined', prompt("Enter your name - "));

socket.on('user-joined', name=>{
    if(name!=null){
    append(`${name} joined the chat`,'left');
    }
})

socket.on('recieve', data=>{
    append(`${data.name} : ${data.message}`,'left');
})

socket.on('left', name=>{
    if(name!=null){
    append(`${name} left the chat`,'left')
    }
})
