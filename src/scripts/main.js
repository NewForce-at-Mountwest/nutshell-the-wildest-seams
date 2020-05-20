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
                <a href="#">Save</a>
                <a href="#">Cancel</a>
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
            <div class="collapsible-body">
                <span>
                    
                </span>
            </div>
        </li>
    </ul>`
}

// New tasks button event listener
const clickNewTaskBtn = document
.querySelector ("#new-task-btn")
.addEventListener ("click", function() {
    // Print New Task Card
    newTaskAreaSelector
    .innerHTML += newCardHTML()
})

// Print existing tasks to the DOM
fetch("http://localhost:3000/tasks")
.then((r) => r.json())
.then((tasks) => {
    // Clear the printing area
    newTaskAreaSelector.innerHTML = ""

    tasks.forEach((task) => {
        newTaskAreaSelector.innerHTML += taskCard(task)
    })
})

// TODO: Print new task card on top - when clicked, print new task card, then print existing json info
// TODO: Cancel button - when clicked, reprint existing tasks from json