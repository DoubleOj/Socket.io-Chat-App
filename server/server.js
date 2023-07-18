const io = require("socket.io")({
    cors:{
        origin: ["http://localhost:5173"],
    },
})

io.on("connection", (socket) =>{
    //io.emit("serverEmit", "hello from server")
    socket.on("client-emit", (arg)=>{
        console.log(arg)
    })
    socket.on("sendMessage", (msg) =>{
        socket.broadcast.emit("clientMessage", msg)
        console.log(msg)
    })
    //console.log("client: ",socket.id, " has connected")
})

io.listen(3000)



