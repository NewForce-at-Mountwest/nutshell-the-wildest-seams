//TODO:
//need a login event listener to eventually be able to save messages for a specific user rather than message text only.
// document.querySelector("#login-btn").addEventListener("click", () => {
//     // console.log("Ya clicked the login button");
//     const usernameValue = document.querySelector("#username-input").value;
//     const passwordValue = document.querySelector("#password-input").value;
//     // console.log(usernameValue, passwordValue);
//     fetch(`http://localhost:3000/users?username=${usernameValue}`)
//       .then((r) => r.json())
//       .then((user) => {
//         console.log(user[0].id);
//     //     // TODO: check and make sure they entered the right password
//     //     // TODO: handle errors if user enters username that doesn't exist
//     //     // TODO: think about how to register new users
//         sessionStorage.setItem("userId", user[0].id);
//       });
//   });


// Original event listener to send a message

document.querySelector("#chat-enter-btn").addEventListener("click", () => {
    // console.log("you clicked the send button")
    const messageInput = document.querySelector("#message").value;
 
    //TODO: refresh and print automatically on 'send' click
    // console.log(messageInput)

    //build into an object
    var newMessageObject = {
        userId: 1,
        message: messageInput
    };
        // console.log(newMessageObject);

    fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMessageObject)
    }).then(() => {
        document.querySelector("#messageScreen").innerHTML = ""
        fetch(`http://localhost:3000/messages?_expand=user`)
        .then(r => r.json())
        .then(parsedMessages => {
            parsedMessages.forEach((messageObject) => {
              
                // console.log(messageObject)
                const htmlString = `<p>${messageObject.user.userName}: ${messageObject.message}</p>
                <p>${new Date().toLocaleString()}</p>`;
                document.querySelector("#messageScreen").innerHTML += htmlString;
            });
        })
    })
})