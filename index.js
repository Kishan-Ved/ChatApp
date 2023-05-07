// Node server to handle socket io connections

// npm run dev - to start nodemon (run in nodeServer)

// node .\index.js - maybe needed (run in nodeServer)

// Contains events that happen at server level and what to do when these events happen.
// Usually, when such events occur, functions are called at client level.

const io = require('socket.io')(443)

const users = {};

io.on('connection', socket=>{
    socket.on('new-user-joined',name=>{ // If the event new-user-joined occurs, it runs the arrow function
        // console.log(name,'joined the chat.')
        users[socket.id] = name; // Creates a new key, socket.id is a unique id for every socket connection
        socket.broadcast.emit('user-joined',name) // Runs for all OTHER users
    })

    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message: message,name: users[socket.id]}) // Remember spelling of broadcast, it may cause errors.
    })

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})


