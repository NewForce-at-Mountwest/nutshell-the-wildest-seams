

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
    });
    },
    getOneMessage: (id) => {
  return fetch(`http://localhost:3000/messages/${id}`).then(r => r.json())
    },
    updateMessages: (messageObject) => {
        return fetch(`http://localhost:3000/messages/${messageObject.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(messageObject)
            })
        }
        };
    


//



export default chatApiManager;