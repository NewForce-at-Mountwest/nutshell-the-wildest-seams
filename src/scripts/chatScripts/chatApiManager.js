

const chatApiManager = {
    getAllMessages: () => {
        return fetch(`http://localhost:3000/messages?_expand=user
        `).then((messages) => messages.json());
        
    },
    postMessage: (newMessageObject) => {
        return         fetch("http://localhost:3000/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessageObject)
    })
    }
}

//



export default chatApiManager;