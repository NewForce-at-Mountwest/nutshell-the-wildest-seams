import DOMprinterManager from "./eventDOMPrinter.js"


const apiManager = {
    // This is a fetch call that renders events to the Event Container
    getAllEvents() {
    fetch('http://localhost:3000/events')
      .then(response => response.json())
      .then(response => {
          console.log(response)
          DOMprinterManager.renderEvents(response)
      }
      )},
        addNewEntry (newEventObject){
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
                    console.log(response.sort((a, b) => (a.id > b.id ? -1 : 1)))
    
                    DOMprinterManager.renderEvents(response)
                })
        })
    },
    deleteEntry(idToDelete){
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
    editEntry(idToEdit){
        fetch(`http://localhost:3000/events/${idToEdit}`)
      .then(response => response.json())
      .then(response => {
          console.log(response)
          DOMprinterManager.makeEventEditForm(response)
      })
    }


    }

    export default apiManager