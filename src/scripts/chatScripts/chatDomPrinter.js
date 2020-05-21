//printing messages already saved to dom on page load
// tried ?userId=${sessionStorage.getItem("userId")} in fetch call, but returned empty array in console.

fetch(`http://localhost:3000/messages?_expand=user`)
.then((messages) => messages.json())
.then((parsedMessages) => {
    // console.log(parsedMessages)
    parsedMessages.forEach((messageObject) => {
        // console.log(messageObject)
        const htmlString = 
        `<p>${messageObject.user.userName}: ${messageObject.message}</p>`;
        document.querySelector("#messageScreen").innerHTML += htmlString;
    });
});