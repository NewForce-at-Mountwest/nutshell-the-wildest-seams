import apiManager from "./eventApiManager.js"
import DOMprinterManager from "./eventDOMPrinter.js"

// This function runs all of the event listeners
  function activateEventListeners (){
      console.log("the activate event listeners has run, fool!")
// This is an event listener that creates a form upon click
document.querySelector("#newEventBtn").addEventListener("click", event => {
    console.log("you clicked, fool!")
    document.querySelector("#eventsContainer").innerHTML = DOMprinterManager.makeNewForm()
})

// This is an event listener that saves the inputted values from the New Form
document.querySelector("body").addEventListener("click", event => {
        if (event.target.id === "saveBtnTask"){
        const nameOfEvent = document.querySelector("#eventNameInput").value
        const dateOfEvent = document.querySelector("#eventDateInput").value
        const locationOfEvent = document.querySelector("#eventLocationInput").value
      
        // This is an objected created from the values of the new form
        const newEventObject = {
            eventName: nameOfEvent,
            date: dateOfEvent,
            location: locationOfEvent,
        }
    
        console.log("you clicked, fool!")
        apiManager.addNewEntry(newEventObject)

        apiManager.getAllEvents()

        // TODO:Create fetch call with newEventObject as parameter and post the newly created Event. Then refresh the page and create a fetch call to print the dates in descending order. The next event should be bold, have a non-white background, and be slightly larger than the other event cards.
      }}
      );

    //   This is a event listener for the delete button 
      document.querySelector("body").addEventListener("click", () => {

        // Check to see if the user clicked on something with a class of delete-btn
        if (event.target.classList.contains("delete-btn")) {
            console.log(event.target.id); // this will be "delete-1"
            console.log(event.target.id.split("-")); // ["delete", "1"]
            console.log(event.target.id.split("-")[2]) // "1"
    
            const idToDelete = (event.target.id.split("-")[2])
    
            apiManager.deleteEntry(idToDelete)
        }
            
            else if (event.target.id.includes("edit-btn")){
                // eventListenerObject.printEditForm()
            console.log(event.target.id); // this will be "delete-1"
            console.log(event.target.id.split("-")); // ["delete", "1"]
            console.log(event.target.id.split("-")[2])
            // This targeting the edit buttons id
                const idToEdit = (event.target.id.split("-") [2])

                apiManager.getSingleEvent(idToEdit)
                .then(singleEventData => {
                    document.querySelector(`#eventsContainer`).innerHTML = DOMprinterManager.makeEventEditForm(singleEventData)
                })
        }
    });
// This is listening for a click to the save-edit button on the edit form
    document.querySelector("body").addEventListener("click", () => {
        // Check to see if the user clicked on something with a class of save-edit-btn
        if(event.target.classList.contains("save-edit-btn")){
          const eventId = event.target.id.split("-")[2] // "1"
          const editedEventData = {
         eventName: document.querySelector("#eventNameInput").value,
         date: document.querySelector("#eventDateInput").value,
         location: document.querySelector("#eventLocationInput").value,
         id:eventId
          }
      
        // We'll call our PUT method right here!
      apiManager.editEntry(editedEventData).then(() =>{
          apiManager.getAllEvents()
      })
        }
      })
}
export default activateEventListeners