//builds and returns HTML string for a message card

const buildChatCard = (singleMessage) => {
    return `
    <div id="editMessage-form">
    <div id="messageCard">
    <p><strong>${singleMessage.user.userName}:</strong> ${singleMessage.message}</p>
    <button class="editMessage-btn" id="editMessage-1">Edit</button>
    <p id="timestamp-output"><strong>${singleMessage.user.userName} Sent: </strong>${singleMessage.timestamp}</p>
    </div>
    </div>`;
};


//Print all messages to message container:

const printAllMessages = (messageArray) => {
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