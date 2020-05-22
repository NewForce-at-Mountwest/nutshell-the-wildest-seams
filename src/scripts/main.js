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

//saves and reprints old and new messages once user clicks the 'send' button.
document.querySelector("#chat-enter-btn").addEventListener("click", messageEventListeners.saveMessageEvent)

// document
//   .querySelector("#message")
//   .addEventListener("keypress", function (e) {
//     if (e.keyCode === 13) {
//       saveMessageEvent;
//     }
// })
 

//target edit button and get specific button info to edit specific message
document.querySelector("body").addEventListener("click", () => {
    // Check to see if the user clicked on something with an id of editMessage-btn
    if(event.target.id.includes("editMessage-btn")){
        messageEventListeners.printChatEditForm()
        //clicking save-messageEdit button will then save and send to json
    }else if(event.target.id.includes("save-messageEdit")){
        messageEventListeners.saveMessageChangeEvent()
    }

});

chatApiManager.getAllMessages()
.then((parsedMessages) => {
    // print response
    // console.log("this is from main.js", parsedMessages)
    printAllMessages(parsedMessages);
});
