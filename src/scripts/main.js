import chatApiManager from "./chatScripts/chatApiManager.js"
import printAllMessages from "./chatScripts/chatDomPrinter.js"
import messageEventListeners from "./chatScripts/chatEventListeners.js"


//prints all of chat messages on page load
chatApiManager.getAllMessages()
.then((parsedMessages) => {
    // print response
    // console.log("this is from main.js", parsedMessages)
    printAllMessages(parsedMessages);
});



// document
//   .querySelector("#message")
//   .addEventListener("keypress", function (e) {
//     if (e.keyCode === 13) {
//       saveMessageEvent();
//     }
//   });


//saves and reprints old and new messages once user clicks the 'send' button.
document.querySelector("#chat-enter-btn").addEventListener("click", messageEventListeners.saveMessageEvent)
//     const messageInput = document.querySelector("#message").value; 
//     const timestamp = new Date().toLocaleString();

//     var newMessageObject = {
//         userId: 1,
//         message: messageInput,
//         timestamp: timestamp
//     };
//         // console.log(newMessageObject);

//         fetch("http://localhost:3000/messages", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newMessageObject)
//     }).then(() => {
//         document.querySelector("#messageScreen").innerHTML = ""
//         fetch(`http://localhost:3000/messages?_expand=user`)
//         .then(r => r.json())
//         .then(parsedMessages => {
//                 printAllMessages(parsedMessages)
              
//             });
//         })
// })