const socket = io();

let user;
const chatBox = document.querySelector('#chatBox')

Swal.fire({
    title: 'Identificate',
    text: 'Quien sos?',
    icon: 'question',
    input: 'text',
    inputValidator: (value) =>{
        return !value && 'Necesitas escribir tu nombre'
    },
    allowOutsideClick: false
}).then(result =>{
    user = result.value
    socket.emit('new_user', {user})
}) 

socket.on('messageLogs', data =>{
    const log = document.querySelector('#messageLogs');
    const messages = data.map(message => 
        `${message.user} dice: ${message.message}`
        ).join('<br />');
    log.innerHTML = messages
})

socket.on('user_connected', (data) =>{
    Swal.fire({
        title: 'Nuevo usuario conectado',
        text: `El usuario ${data.user} se acaba de conectar`,
        toast: true,
        position: "top-right",
    })
})

chatBox.addEventListener('keyup', event => {
    if(event.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit("message", {
                user: user,
                message: chatBox.value
            });
            chatBox.value = '';
        }
    }
})