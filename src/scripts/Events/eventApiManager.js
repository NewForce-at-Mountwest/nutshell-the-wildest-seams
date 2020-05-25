import DOMprinterManager from "./eventDOMPrinter.js"


const apiManager = {
    // This is a fetch call that renders events to the Event Container
    getAllEvents() {
        fetch("http://localhost:3000/events")
            .then(response => response.json())
            .then(response => {
                //   console.log(response)
            
                document.querySelector("#eventsContainer").innerHTML = ""
                DOMprinterManager.renderEvents(response.sort((a, b) => (a.date < b.date ? -1 : 1)))
            }
            )
    },
    addNewEntry(newEventObject) {
        fetch("http://localhost:3000/events", {
            // Replace "url" with your API's URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEventObject),
        }).then(() => {
            fetch(`http://localhost:3000/events`) // Fetch from the API
                .then(response => response.json())  // Parse as JSON

                // Sorts response in descending order

                .then(response => {
                    // console.log(response.sort((a, b) => (a.id > b.id ? -1 : 1)))
                    document.querySelector("#eventsContainer").innerHTML = ""
                    DOMprinterManager.renderEvents(response)
                })
        })
    },
    deleteEntry(idToDelete) {
        return fetch(`http://localhost:3000/events/${idToDelete}`, {
            method: "DELETE"
        }).then(() => {
            document.querySelector("#eventsContainer").innerHTML = ""// get all the events again to "refresh" the list
            fetch(`http://localhost:3000/events`) // Fetch from the API
                .then(response => response.json())  // Parse as JSON

                // Sorts response in descending order and renders them 

                .then(response => {
                    console.log(response.sort((a, b) => (a.id > b.id ? -1 : 1)))

                    DOMprinterManager.renderEvents(response)
                })
        })
    },
    editEntry(eventObject) {
        return fetch(`http://localhost:3000/events/${eventObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventObject)
        })

    },

    getSingleEvent(id) {
        return fetch(`http://localhost:3000/events/${id}`).then(response => response.json())
    }


}

export default apiManager