const io = require('socket.io')(8000, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', nam => {
        console.log("New user joined", nam);
        users[socket.id] = nam;
        socket.broadcast.emit('user-joined', nam);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, nam: users[socket.id] });
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('leave', {nam: users[socket.id]});
        delete users[socket.id];
    })

});
