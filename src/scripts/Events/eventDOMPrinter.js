// This is a variable for selecting the #eventsContainer
const eventsContainer = document.querySelector("#eventsContainer")

const DOMprinterManager = {

    makeIndividualEventObject: (eventName, date, location, id) => {
        // Create your own HTML structure for a journal entry 
        // debugger
        return `
        <section class="single-entry card" id="card-${id}" >
        <p>Name of Event: ${eventName}</p>
        <p>Date of Event: ${date}</p>
        <p>Location of Event: ${location}</p>
        <button class="edit-btn" id="edit-btn-${id}">Edit</button>
        <button class="delete-btn" id="delete-btn-${id}">Delete</button>
        </section>
    `
    },
    // This renders the events as objects to the DOM
    renderEvents: (response) => {
        for (let i = 0; i < response.length; i++) {
            const individualEvent = response[i]
            // console.log(response)
            eventsContainer.innerHTML += DOMprinterManager.makeIndividualEventObject(

                individualEvent.eventName,
                individualEvent.date,
                individualEvent.location,
                individualEvent.id
            )
        }
    },
    // This returns a new form for the user to input values in for an Event
makeNewForm: () => {
    return `
      <form action="">
  <fieldset id="fieldsetNameOfEvent">
      <label for="eventName">Name of Event</label>
      <input type="text" name="eventName" id="eventNameInput">
  </fieldset>
  <fieldset id="fieldsetDateOfEvent">
      <label for="eventDate">Date of Event</label>
      <input type="date" name="eventDate" id="eventDateInput">
  </fieldset>
  <fieldset>
      <label for="eventLocation">Location of Event</label>
      <input type="text" name="eventLocation" id="eventLocationInput"></fieldset>
  
  </form>
  <button id="saveBtnTask">Save</button>`
  },  
    // This makes the form for editing an Event
    makeEventEditForm: singleEvent => {
        return `
      <form action="">
  <fieldset id="fieldsetNameOfEvent">
      <label for="eventName">Name of Event</label>
      <input type="text" name="eventName" id="eventNameInput" value=${singleEvent.eventName}>
  </fieldset>
  <fieldset id="fieldsetDateOfEvent">
      <label for="eventDate">Date of Event</label>
      <input type="date" name="eventDate" id="eventDateInput" value=${singleEvent.date}>
  </fieldset>
  <fieldset>
      <label for="eventLocation">Location of Event</label>
      <input type="text" name="eventLocation" id="eventLocationInput" value=${singleEvent.location}>
      </fieldset>
  
  </form>
  <button class="save-edit-btn" id="save-edit-${singleEvent.id}">Save</button>`
    }

}




export default DOMprinterManager
