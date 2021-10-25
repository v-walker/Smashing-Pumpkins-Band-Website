// grab api data; display all messages on screen when page loads
let form = document.querySelector("form");
let forumContainer = document.querySelector('.forum-messages')
console.log(forumContainer);

form.addEventListener('submit', async (e) => {
    // prevent default behavior of the form
    e.preventDefault();
    let newMessage = {
        name: document.querySelector('#forum-form-name').value,
        title: document.querySelector('#forum-form-title').value,
        message: document.querySelector('#forum-form-message').value
    };
    // make a fetch to /api
    let results = await fetch('/api', {
        method: "POST", 
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(newMessage)
    });

    let messages = await results.json();
    updateforum(messages);

    document.querySelector('#forum-form-name').value = "";
    document.querySelector('#forum-form-title').value = "";
    document.querySelector('#forum-form-message').value = "";

});

// listen for click on message span tag; get id; make fetch call
forumContainer.addEventListener('click', async (e) => {    
    if (e.target.nodeName === 'I') {
        let messageID = e.target.id;
        let results = await fetch('/api', {
            method: "DELETE",
            headers: {'Content-type': "application/json; charset=UTF-8"},
            body: JSON.stringify({id: messageID})
        });
        let messages = await results.json();
        updateforum(messages);
    };  
});


let displayMessages = async () => {
    let result = await fetch('/api');
    let messages = await result.json();
    updateforum(messages);
};

const updateforum = (data) => {
    let htmlBlock = "";
    data.forEach((item, key) => {

        htmlBlock += '     <div class="forum-item item-list container-fluid m-0 p-0">';
        htmlBlock += '       <div class="forum-item row">';
        htmlBlock += '       <div class="text-left col-1"><button class="forum-delete btn btn-xs btn-danger"><i id="'+ key +'" class="fas fa-trash-alt"></i></button></div>';
        htmlBlock += '          <div class="forum-info col-10 offset-1">';
        htmlBlock += '           <div class="forum-head">';
        htmlBlock += '             <div class="forum-title">' + item.title + ' <small class="forum-name label label-info">' + '-' + item.name + '</small></div>';
        htmlBlock += '           </div>';
        htmlBlock += '           <div class="forum-message">' + item.message + '</div>';
        htmlBlock += '         </div>'; 
        htmlBlock += '       </div>';
        htmlBlock += '     </div>';
        htmlBlock += '     <hr>';
    });
    
    //attach to a dom element
    let forumMessages = document.querySelector('.forum-messages');
    forumMessages.innerHTML = htmlBlock;
};

displayMessages();