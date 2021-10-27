const socket = io();

// grab username and message input fields from DOM
let chatUserName = document.querySelector("#chat-username");
let chatMessage = document.querySelector("#chat-message");
let chatForm = document.querySelector("form");
let chatDisplay = document.querySelector(".chat-display");

// listen for new incoming messages
socket.on('updateMessage', (data) => {
    // data {username, message}

    let newMessage = document.createElement('p');

    if (chatUserName.value === data.username) {
        newMessage.className = "chat-text";
    }
    else {
        newMessage.className = "response-text chat-text";
    }

    newMessage.innerHTML = `<strong>${data.username}</strong>: ${data.message}`;
    chatDisplay.insertBefore(newMessage, chatDisplay.firstChild);
});

// send message to server
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    socket.emit('postMessage', {
        username: chatUserName.value,
        message: chatMessage.value,
    });

    chatMessage.value = "";
});