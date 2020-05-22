import printAllMessages from "./chatScripts/chatDomPrinter.js"
import chatApiManagerObject from "./chatScripts/chatApiManager.js"

//         sessionStorage.setItem("userId", user[0].id);
//       });
//   });


// Original event listener to send a message
const buildMessageObjectFromInput = () => {
    return {
        userId: 1,
        message: document.querySelector("#message").value,
        name: document.querySelector("#restaurant-name").    value,
        timestamp: new Date().toLocaleString()
     };
}

const messageEventListeners = {
    saveMessageEvent: () => {
        const messageObject = buildMessageObjectFromInput();
        chatApiManagerObject.postMessage(messageObject) // Post the message to json-server
        .then(chatApiManagerObject.getAllMessages) // Fetch all the messages again
        .then(printAllMessages) // Once the messages come back, print them to the DOM
      }
}





//target edit button and get specific button info to edit specific message
// document.querySelector("body").addEventListener("click", () => {
    // Check to see if the user clicked on something with an id of editMessage-btn
    // if(event.target.id.includes("editMessage")){
    //   const primaryKey = event.target.id.split("-")[1] 
      
    //   console.log("you clicked edit", event.target.id)

    //   const getSingleMessage = (id) => {
    //     return fetch(`http://localhost:3000/messages/${id}`)
    //     .then(r => r.json())
    //     console.log(getSingleMessage)
      
//     }
// })

export default messageEventListeners;