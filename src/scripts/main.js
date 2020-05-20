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
                        <input id="new-task-text-form" type="text" class="validate">
                        <label for="new-task-text-form">Enter Task</label>
                    </div>
                </form>

                <!-- Date -->
                    <div class="s6">
                        <input id="new-task-date-form" type="Date" class="datepicker">
                    </div>
                </form>
            </div>
            <div class="card-action">
                <a class="waves-effect waves-teal btn-flat" id="task-save-btn">Save</a>
                <a class="waves-effect waves-teal btn-flat" id="task-cancel-btn">Cancel</a>
            </div>
        </div>
    </div>
</div>`
}

const taskCard = (singleEntry) => {
    return `
    <ul class="collapsible">
        <li>
            <div class="collapsible-header">
            ${singleEntry.task}
            <i class="tiny material-icons" id="task-delete-btn-${singleEntry.id}">delete</i>
            </div>
        </li>
    </ul>`
}

// New tasks button event listener
document
.querySelector ("body")
.addEventListener ("click", function() {
    // Primary key
    const primaryKey = event.target.id.split("-")[3]
    // If statements for buttons
    if(event.target.id === "new-task-btn"){
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
    // Cancel button functionality
    } else if(event.target.id === "task-cancel-btn"){
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

    } else if (event.target.id === "task-save-btn"){
        // Form values
        // Task name value
        const newTaskNameValue = document.querySelector("#new-task-text-form").value
        // Task date value
        const newTaskDateValue = document.querySelector("#new-task-date-form").value
        // JSON object
        const taskObject = {
        task: newTaskNameValue,
        date: newTaskDateValue,
        completed: "false"
    }
            // Post statement
            fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(taskObject)
        }) 
            .then(function(){
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
        })
    } else if (event.target.id.includes("task-delete-btn")){
        // Delete fetch call
        fetch(`http://localhost:3000/tasks/${primaryKey}`, {
            method: "DELETE",
        }) .then(function(){
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



