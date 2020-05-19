// New tasks button event listener
const clickNewTaskBtn = document
.querySelector ("#new-task-btn")
.addEventListener ("click", function() {
    document.querySelector("#tasks-printing-container")
    .innerHTML += `
    <div class="row taskCard">
    <div class="col s12 m6">
    <div class="card blue-grey darken-1">
        <div class="card-content white-text">
            <input type="Date" class="datepicker">
            <p>I am a very simple card. I am good at containing small bits of information.
            I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
        <a href="#">This is a link</a>
        <a href="#">This is a link</a>
        </div>
    </div>
    </div>
</div>`
})