// This is a variable for selecting the #eventsContainer
const eventsContainer = document.querySelector("#eventsContainer")

const DOMprinterManager = {

makeIndividualEventObject: (eventName,date,location,id) => {
    // Create your own HTML structure for a journal entry 
    // debugger
    return `
        <section class="single-entry card " id="card-${id}" >
        <p>Name of Event:${eventName}</p>
        <p>Date of Event:${date}</p>
        <p>Location of Event:${location}</p>
        <button class="edit-btn" id="edit-btn-${id}">Edit</button>
        <button class="delete-btn" id="delete-btn-${id}">Delete</button>
        </section>
    `
},
// This renders the events as objects to the DOM
renderEvents: (response) => {
    for(let i = 0; i < response.length; i++){
    const individualEvent = response[i]
    console.log(response)
    eventsContainer.innerHTML += DOMprinterManager.makeIndividualEventObject(
        
        individualEvent.eventName,
        individualEvent.date,
        individualEvent.location,
        individualEvent.id
    )
    }
},
// This makes the form for editing an Event
makeEventEditForm: (eventObject) => {
    console.log(eventObject)
    for(let i = 0; i < eventObject.length; i++){
    // const individualEvent = eventObject[i]
    // eventsContainer.innerHTML += 
    // return `
    // <form class="single-entry card " id="card-${id}" >
    //     <input value ="${eventName}">Name of Event:
    //     <input value ="${date}>Date of Event:
    //     <input value ="${location}>Location of Event:
    //     <button class="save-btn" id="save-btn-${id}">Save</button>
    //     <button class="cancel-btn" id="cancel-btn-${id}">Cancel</button>
    //     </form>
    // `
    }
}
}




export default DOMprinterManager
