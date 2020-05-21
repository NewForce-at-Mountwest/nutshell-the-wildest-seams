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
                    <div class="input-field s6">
                        <input id="new-task-text-form" type="text" class="validate">
                        <label for="new-task-text-form">Enter Task</label>
                    </div>
                </form>

                <!-- Date -->
                    <div class="s4">
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

// Task card
const taskCard = (singleEntry) => {
    return `
    <ul class="collapsible" id="card-${singleEntry.id}">
        <li>
            <div class="collapsible-header">
            <!--Task text-->
            ${singleEntry.task}
            <!--Edit button-->
            <i class="tiny material-icons hoverable" id="task-edit-btn-${singleEntry.id}">create</i>
            <!--Delete button-->
            <i class="tiny material-icons hoverable" id="task-delete-btn-${singleEntry.id}">delete</i>
            </div>
        </li>
    </ul>`
}

const editTaskCard = (singleEntry) => {
    return `<div class="row taskCard" id="task-edit-form">
    <div class="col s12">
        <div class="card">
            <div class="card-content dark-text">

                <!-- Task Card Header -->
                <span class="card-title">Edit Task</span>

                <!-- Task Name Form-->
                <form>
                    <div class="input-field s6">
                        <input 
                        id="edit-task-text" 
                        type="text" 
                        class="validate" 
                        value="${singleEntry.task}">
                    </div>
                </form>

                <!-- Date -->
                    <div class="s4">
                        <input id="new-task-date-form" type="Date" class="datepicker">
                    </div>
                </form>
            </div>
            <div class="card-action">
            <a class="waves-effect waves-teal btn-flat" id="save-task-changes-btn-${singleEntry.id}">Save</a>
            <a class="waves-effect waves-teal btn-flat" id="cancel-task-changes-btn-${singleEntry.id}">Cancel</a>
            </div>
        </div>
    </div>
</div>`
   
}

// const editTaskCard = (singleEntry) => {
//     return `
//     <ul class="collapsible" id="task-edit-form">
//         <li>
//             <div class="collapsible-header">
//                 <div class="card-content dark-text"
//                 <!-- Task Card Header -->
//                 <span class="card-title">Edit Task</span>
//                 <!-- Edit Task Form-->
//                     <form>
//                         <div class="row">
//                             <!-- Date -->
//                             <div class="input-field col s12">
//                                 <input placeholder="Enter task" 
//                                 value="${singleEntry.task}" 
//                                 id="edit-task-text" 
//                                 type="text" 
//                                 class="validate">
//                             </div>
//                             <!-- Date -->
//                             <div class="s4">
//                                 <input id="new-task-date-form" 
//                                 type="Date" 
//                                 class="datepicker">
//                             </div>
//                             <!-- Save button -->
//                             <a class="waves-effect waves-teal btn-flat" id="save-task-changes-btn-${singleEntry.id}">Save</a>
//                             <a class="waves-effect waves-teal btn-flat" id="cancel-task-changes-btn-${singleEntry.id}">Cancel</a>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </li>
//     </ul>`
   
// }



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
                newTaskAreaSelector.innerHTML = ""
                // Print existing tasks to DOM
                tasks.forEach((task) => {
                newTaskAreaSelector.innerHTML += taskCard(task)
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
                newTaskAreaSelector.innerHTML = ""
                // Print existing tasks to DOM
                tasks.forEach((task) => {
                    newTaskAreaSelector.innerHTML += taskCard(task)
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
        console.log("This is the save edit button")
    // Cancel edit button functionality
    } else if(event.target.id.includes("cancel-task-changes-btn")){
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



