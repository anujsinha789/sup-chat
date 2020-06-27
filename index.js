var port = process.env.PORT || 8000;
var io = require('socket.io')(port);

const users = {};


io.on('connection',socket => {
    socket.on('new-user-joined',name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive' , {message : message , name : users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left' , users[socket.id]);
        delete users[socket.id];
    });
})

// server.listen(port, () => console.log(`Server has started.`));