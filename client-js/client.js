const socket = io('http://localhost:8000');
// console.log(window.location.hostname);

const form = document.getElementById('send-container');
const messageInput = document.getElementById('msg-ip');
const messageContainer = document.querySelector('.message-screen');
const serverStatus = document.getElementById('active-status');
const userList = document.querySelector('.active-users');

var names = {};

serverStatus.innerText = 'online'; 
serverStatus.classList.remove('offline');
serverStatus.classList.add('online');

var audio = document.getElementById('audio');


const append = (message,position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
    
}

const addUser = (name) => {
    const userElement = document.createElement('div');
    userElement.innerText = `${name} is active.`;
    userElement.classList.add('active-users');
    userElement.classList.add('member-container');
    console.log(`${name}..`);
    userList.append(userElement);
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    if(message != ''){
        append(`You: ${message}`,'right');
        socket.emit('send',message);
        messageInput.value = '';
    }   
    
})

const name = prompt("Enter your name to join!");
socket.emit('new-user-joined',name);

socket.on('user-joined',name =>{
    append(`${name} joined the chat`,'right');
    addUser(name);
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`,'left');
   
})

socket.on('left', data =>{
    append(`${name}: left the chat`,'left');
})
