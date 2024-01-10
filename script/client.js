const socket = io('http://localhost:8000');
 
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput = '';
})

let nam = prompt("Enter your name to join");
socket.emit('new-user-joined', nam);

socket.on('user-joined', nam => {
    append(`${nam} joined the chat`, 'center')
})

socket.on('receive', data =>{
    append(`${data.nam} : ${data.message}`, 'left')
})

socket.on('leave', data =>{
    append(`${data.nam} left`, 'center')
})