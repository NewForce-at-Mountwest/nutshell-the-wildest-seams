
// Original event listener to send a message

document.querySelector("#chat-enter-btn").addEventListener("click", () => {
    // console.log("you clicked the send button")
    const messageInput = document.querySelector("#message").value;
    //works to display message input text, but no user info...because it doesn't exist.
    //TODO: find out how to get user specific info
    //TODO: save userName and message to json
    //TODO: refresh and print automatically on 'send' click
    console.log(messageInput)
})