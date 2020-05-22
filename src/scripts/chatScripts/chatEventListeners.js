import printAllMessages from "./chatDomPrinter.js"
import chatApiManager from "./chatApiManager.js"

//         sessionStorage.setItem("userId", user[0].id);
//       });
//   });


// Original event listener to send a message
const buildMessageObjectFromInput = () => {
    return {
        userId: 1,
        message: document.querySelector("#message").value,
        timestamp: new Date().toLocaleString()
     };
}

const messageEventListeners = {
    saveMessageEvent: () => {
        const messageObject = buildMessageObjectFromInput();
        chatApiManager.postMessage(messageObject) // Post the message to json-server
        .then(chatApiManager.getAllMessages) // Fetch all the messages again
        .then(printAllMessages) // Once the messages come back, print them to the DOM
      },
      printChatEditForm: () => {
          console.log("you clicked an edit button")
          console.log(event.target.id)
          const primaryKey = event.target.id.split("-")[2];
          console.log(primaryKey)
          //select the message card that edit button belongs to (parent card)
          const messageCardToReplace = document.querySelector(`#messageCard-${primaryKey}`)
          console.log(messageCardToReplace)

          //replace inner html on card with prefilled form to edit

          chatApiManager.getOneMessage(primaryKey)
          .then(singleMessageObject => {
              console.log("This is a message from the api", singleMessageObject)

              messageCardToReplace.innerHTML = `
              <section>
              <form>
              <input type="text" placeholder="Message" value="${singleMessageObject.message}" id="edit-message-content" />
              </form>
              <p>${singleMessageObject.timestamp}</p>
              <button id="save-messageEdit-${singleMessageObject.id}">Save Changes</button>
              </section>`
          })
      },
      saveMessageChangeEvent: () => {
          //get value of input
          console.log("you clicked the save changes button", event.target.id)
          const messageEditValue = document.querySelector("#edit-message-content").value;
          const newTimestamp = new Date().toLocaleString();
          

          //store those values in an object

          const messageObjectToEdit = {
              message: messageEditValue,
              timestamp: newTimestamp,
              userId: 1,
              id: event.target.id.split("-")[2]
          }

          console.log("this is what you are sending to the json", messageObjectToEdit)

          //make a PUT request to the api
          //refresh the DOM
          chatApiManager.updateMessages(messageObjectToEdit)
          .then(chatApiManager.getAllMessages)
          .then(parsedMessages => {
              printAllMessages(parsedMessages)
          })
      }
}







export default messageEventListeners;