const { io } = require("../app");

io.on('connection', (socket) => {
    socket.emit('new-connection', { id: socket.id })
})
