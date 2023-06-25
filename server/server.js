const io = require('socket.io')(5000)

io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({ recepients, text}) => {

        recepients.forEach(recepient => {
            const newRecepients = recepients.filter( r => r !== recepient)
            newRecepients.push(id)
            socket.broadcast.to(recepient).emit('receive-message', 
            {recepients: newRecepients, sender: id, text})
        })
    })
})