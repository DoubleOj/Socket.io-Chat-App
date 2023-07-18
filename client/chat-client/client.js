import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const chatBox = $("#chat_box_area")
const header = $("#app_title")
const inputText = $("#message_input_box")
const sendBtn = $("#send_message_button")
const socket = io("http://localhost:3000");
let message = "hello from client";
const userID = socket.id

socket.on("connect", ()=>{
    console.log(`I have connected (${socket.id})`);
    header.html(`<h1>ID: ${socket.id}</h1>`)
    //socket.emit("client-emit","hello from client")
})

//socket.emit("client-emit","hello from client")

socket.on("serverEmit" ,(msg)=>{
    console.log(msg);
})

sendBtn.click(() =>{
    console.log(`${socket.id} clicked the send button`)
    
    let message = {
        message: inputText.val(),
        user : socket.id
    }
    //console.log("sent message clicked")
    socket.emit("sendMessage", message)

    chatBox.append(`<div id="my_message"> you: ${inputText.val()}</div>`)
    inputText.val("")
})

socket.on("clientMessage", (msg)=>{
    console.log(`user: ${msg.user} sent: ${msg.message}`)
    displayNewMessage(msg)
    //console.log(msg)
})

function displayNewMessage(message){
    chatBox.append(`<div id=text_message>${message.user}: ${message.message}</div>`)
}
