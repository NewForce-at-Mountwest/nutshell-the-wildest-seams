// Query selectors
// New tasks printing area query selector
const taskAreaSelector = document.querySelector("#tasks-printing-container")


// New task card HTML
const newCardHTML = () => {
    return `<div class="row taskCard">
    <div class="col s12 my-card">
        <div class="card">
            <div class="card-content dark-text">

                <!-- Task Card Header -->
                <span class="card-title">Create New Task</span>

                <!-- Task Name Form-->
                <form>
                    <div class="input-field">
                        <input id="new-task-text-form" type="text" class="validate">
                        <label for="new-task-text-form">Enter Task</label>
                    </div>
                </form>

                <!-- Date -->
                    <div>
                        <input id="new-task-date-form" type="Date" class="datepicker">
                    </div>
                </form>
            </div>
            <div class="new-task-card-btns">
                <a class="waves-effect waves-teal btn-flat" id="task-save-btn">Save</a>
                <a class="waves-effect waves-teal btn-flat" id="task-cancel-btn">Cancel</a>
            </div>
        </div>
    </div>
</div>`
}

// Task card
const taskCard = (singleEntry) => {
    return `
    <ul class="collapsible" id="card-${singleEntry.id}">
        <li>
            <div class="collapsible-header task-card-container">
                <div class="task-header">
                    <!--Task text-->
                    ${singleEntry.task}
                </div>
            <div class="task-icons-container"
                <!--Edit button-->
                <i class="tiny material-icons icon-btn" id="task-edit-btn-${singleEntry.id}">create</i>
                <!--Delete button-->
                <i class="tiny material-icons icon-btn" id="task-delete-btn-${singleEntry.id}">delete</i>
                <!--Complete button-->
                <label class="checkbox">
                    <input type="checkbox"/>
                    <span>Incomplete</span>
                </label>
            </div>
            </div>
        </li>
    </ul>`
}

const editTaskCard = (singleEntry) => {
    return `<div class="row taskCard" id="task-edit-form">
    <div class="col s12 my-card">
        <div class="card">
            <div class="card-content dark-text">

                <!-- Task Card Header -->
                <span class="card-title">Edit Task</span>

                <!-- Task Name Form-->
                <form>
                    <div class="input-field">
                        <input 
                        id="edit-task-text" 
                        type="text" 
                        class="validate" 
                        value="${singleEntry.task}">
                    </div>
                </form>

                <!-- Date -->
                    <div>
                        <input id="edit-task-date-form" type="Date" class="datepicker">
                    </div>
                </form>
            </div>
            <div class="new-task-card-btns">
            <a class="waves-effect waves-teal btn-flat" id="save-task-changes-btn-${singleEntry.id}">Save</a>
            <a class="waves-effect waves-teal btn-flat" id="cancel-task-changes-btn-${singleEntry.id}">Cancel</a>
            </div>
        </div>
    </div>
</div>`
   
}

// New tasks button event listener
document
.querySelector ("body")
.addEventListener ("click", function() {
    // Primary key
    const primaryKey = event.target.id.split("-")[3]
    // Fetch for one task
    const getOneTask = (id) => {
        fetch(`http://localhost:3000/tasks/${id}`)
        .then((r) => r.json())
    }
    // If statements for buttons
    // New task button functionality
    if(event.target.id === "new-task-btn"){
    // Clear the printing area
    taskAreaSelector.innerHTML = ""
    // Fetch existing tasks
    fetch("http://localhost:3000/tasks")
    .then((r) => r.json())
    .then((tasks) => {
    // Print New Task Card
    taskAreaSelector
    .innerHTML += newCardHTML()
    // Print existing tasks to DOM
    tasks.forEach((task) => {
        taskAreaSelector.innerHTML += taskCard(task)
        })
    })
    // Cancel button functionality
    } else if(event.target.id === "task-cancel-btn"){
        // Clear the printing area
        taskAreaSelector.innerHTML = ""
        // Fetch existing tasks
        fetch("http://localhost:3000/tasks")
        .then((r) => r.json())
        .then((tasks) => {
        // Clear the printing area
        taskAreaSelector.innerHTML = ""
        // Print existing tasks to DOM
        tasks.forEach((task) => {
        taskAreaSelector.innerHTML += taskCard(task)
        })
    })
    // New task save button functionality
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
                taskAreaSelector.innerHTML = ""
                // Print existing tasks to DOM
                tasks.forEach((task) => {
                taskAreaSelector.innerHTML += taskCard(task)
                })
            })
        })
    // Delete buttons functionality
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
                taskAreaSelector.innerHTML = ""
                // Print existing tasks to DOM
                tasks.forEach((task) => {
                    taskAreaSelector.innerHTML += taskCard(task)
                    })    
                })
        })
    // Edit buttons functionality
    } else if(event.target.id.includes("task-edit-btn")){
        // console.log("This is the edit button", event.target.id, primaryKey)
        // define card to replace
        const cardToReplace = document.querySelector(`#card-${primaryKey}`)
        // Fetch specific card clicked
        fetch(`http://localhost:3000/tasks/${primaryKey}`)
        .then((r) => r.json())
        .then ((tasks) => {
            cardToReplace.innerHTML = editTaskCard(tasks)
        })
    // Save edit button functionality
    } else if(event.target.id.includes("save-task-changes-btn")){
        // Edit primary key
        const primaryKeyEdit = event.target.id.split("-")[4]
        // Edit form values
        const editTaskValue = document.querySelector("#edit-task-text").value
        // Store edit values in an object
        const taskObjectToEdit = {
            task: editTaskValue,
            id: primaryKeyEdit
        }
        // Put statement
        fetch(`http://localhost:3000/tasks/${primaryKeyEdit}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskObjectToEdit)
        }) .then(() => {
                // Fetch existing tasks
                fetch("http://localhost:3000/tasks")
                .then((r) => r.json())
                .then((tasks) => {
                // Clear the printing area
                taskAreaSelector.innerHTML = ""
                // Print existing tasks to DOM
                tasks.forEach((task) => {
                taskAreaSelector.innerHTML += taskCard(task)
                })
            })        
            
        })

    // Cancel edit button functionality
    } else if(event.target.id.includes("cancel-task-changes-btn")){
                // Clear the printing area
                taskAreaSelector.innerHTML = ""
                // Fetch existing tasks
                fetch("http://localhost:3000/tasks")
                .then((r) => r.json())
                .then((tasks) => {
                // Clear the printing area
                taskAreaSelector.innerHTML = ""
                // Print existing tasks to DOM
                tasks.forEach((task) => {
                taskAreaSelector.innerHTML += taskCard(task)
                })
            })        
    }
})



// Print existing tasks to the DOM
fetch("http://localhost:3000/tasks")
.then((r) => r.json())
.then((tasks) => {
    // Clear the printing area
    taskAreaSelector.innerHTML = ""
    // Print existing tasks to DOM
    tasks.forEach((task) => {
        taskAreaSelector.innerHTML += taskCard(task)
    })
})



