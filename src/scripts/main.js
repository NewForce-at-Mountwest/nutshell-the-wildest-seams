// Query selectors
// New tasks printing area query selector
const newTaskAreaSelector = document.querySelector("#tasks-printing-container")



// New task card HTML
const newCardHTML = () => {
    return `<div class="row taskCard">
    <div class="col s12">
        <div class="card">
            <div class="card-content dark-text">

                <!-- Task Card Header -->
                <span class="card-title">Create New Task</span>

                <!-- Task Name Form-->
                <form>
                    <div class="input-field col s6">
                        <input id="new-task-name-form" type="text" class="validate">
                        <label for="new-task-name-form">Task Name</label>
                    </div>
                </form>

                <!-- Date -->
                    <div class="s6">
                        <input type="Date" class="datepicker">
                    </div>
                </form>
            </div>
            <div class="card-action">
                <a href="#" id="save-btn">Save</a>
                <a class="waves-effect waves-teal btn-flat" id="cancel-btn">Cancel</a>
            </div>
        </div>
    </div>
</div>`
}

const taskCard = (singleEntry) => {
    return `
    <ul class="collapsible">
        <li>
            <div class="collapsible-header">${singleEntry.task}</div>
        </li>
    </ul>`
}

// New tasks button event listener
document
.querySelector ("body")
.addEventListener ("click", function() {
    if(event.target.id === "new-task-btn"){
    console.log("New Task Button")
        // Clear the printing area
    newTaskAreaSelector.innerHTML = ""
    // Fetch existing tasks
    fetch("http://localhost:3000/tasks")
    .then((r) => r.json())
    .then((tasks) => {
    // Print New Task Card
    newTaskAreaSelector
    .innerHTML += newCardHTML()
    // Print existing tasks to DOM
    tasks.forEach((task) => {
        newTaskAreaSelector.innerHTML += taskCard(task)
        })
    })
    } 
    else if(event.target.id === "cancel-btn"){
        // Clear the printing area
        newTaskAreaSelector.innerHTML = ""
        // Fetch existing tasks
        fetch("http://localhost:3000/tasks")
        .then((r) => r.json())
        .then((tasks) => {
        // Clear the printing area
        newTaskAreaSelector.innerHTML = ""
        // Print existing tasks to DOM
        tasks.forEach((task) => {
        newTaskAreaSelector.innerHTML += taskCard(task)
        })
    })

    }
})



// Print existing tasks to the DOM
fetch("http://localhost:3000/tasks")
.then((r) => r.json())
.then((tasks) => {
    // Clear the printing area
    newTaskAreaSelector.innerHTML = ""
    // Print existing tasks to DOM
    tasks.forEach((task) => {
        newTaskAreaSelector.innerHTML += taskCard(task)
    })
})



