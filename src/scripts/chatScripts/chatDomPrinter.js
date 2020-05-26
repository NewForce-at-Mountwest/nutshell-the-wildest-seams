//builds and returns HTML string for a message card

const buildChatCard = (singleMessage) => {
    if(singleMessage.userId === 1){
    return `
    <div class="speech-container" id="messageCard-${singleMessage.id}">
    <div class="chat-box">
    <p><strong>${singleMessage.user.userName}:</strong> ${singleMessage.message}</p>
    <button class="editMessage" id="editMessage-btn-${singleMessage.id}">Edit</button>
    <p id="timestamp-output">${singleMessage.user.userName} Sent: ${singleMessage.timestamp}</p>
    </div>
    </div>
   `;
}else{
    return `<div class="speech-container" id="messageCard-${singleMessage.id}">
    <div class="chat-box">
    <p><strong>${singleMessage.user.userName}:</strong> ${singleMessage.message}</p>
    <p id="timestamp-output"><strong>${singleMessage.user.userName} Sent: </strong>${singleMessage.timestamp}</p>
    </div>
    </div>`
}
}

//Print all messages to message container after clearing container:

const printAllMessages = (messageArray) => {
    document.querySelector("#messageScreen").innerHTML = "";
    messageArray.forEach((messageObjectInLoop) => {
        const htmlString = buildChatCard(messageObjectInLoop);
        document.querySelector("#messageScreen").innerHTML += htmlString;
    })
};




//printing messages already saved to dom on page load
// tried ?userId=${sessionStorage.getItem("userId")} in fetch call, but returned empty array in console.

// fetch(`http://localhost:3000/messages?_expand=user`)
// .then((messages) => messages.json())
// .then((parsedMessages) => {
//     // console.log(parsedMessages)
//     parsedMessages.forEach((messageObject) => {
//         // console.log(messageObject)
//         const htmlString = 
//         document.querySelector("#messageScreen").innerHTML += htmlString;
//     });
// });

export default printAllMessages;