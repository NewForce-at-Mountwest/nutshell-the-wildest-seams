const newsArticleCard= (singlePost)=>{
  return `<div class="card">
  <div class="card-image waves-effect waves-block waves-light">
    <img class="activator" src="${singlePost.pictureURL}">
  </div>
  <div class="card-content">
    <span class="card-title activator grey-text text-darken-4">${singlePost.title}<i class="material-icons right">more_vert</i></span>
    <p><a href="${singlePost.url}">Go to Article</a></p>
  </div>
  <div class="card-reveal">
    <span class="card-title grey-text text-darken-4">${singlePost.title}<i class="material-icons right">close</i></span>
    <p>${singlePost.synopsis}</p>
  </div>
</div>`
}

fetch("http://localhost:8000/newsArticles")
  .then((newsArticles) => newsArticles.json())
  .then((parsednewsArticles) => {
    console.log(parsednewsArticles);
    parsednewsArticles.forEach(element => {
      document.querySelector("#articleContainer").innerHTML +=
      newsArticleCard(element)
    });
         
  });

  document.querySelector("#newsContainer").addEventListener("click", function () {
    if (event.target.id === "newArticleBtn"){
    
      document.querySelector("#articleContainer").innerHTML += buildNewForm() 
    console.log("You clicked the Create Article Button");
  }
  })

const newArticleBtn = document.querySelector("#newArticleBtn");

function buildNewForm(){

  return `<form>
  <div class="form-group-for-news">
    <label for="formGroupForNews">News Title</label>
    <input
      type="text"
      class="newTitle"
      id="new-News-Title"
      placeholder="News Title"
    />
  </div>
  <div class="form-group-for-synopsis">
    <label for="formGroupForSynopsis">Synopsis</label>
    <input
      type="text"
      class="newSynopsis"
      id="new-Synopsis"
      placeholder="Synopsis"
    />
  </div>
  <div class="form-group-for-url">
    <label for="formGroupForURL">URL</label>
    <input type="text" class="newURL" id="new-url" placeholder="URL" />
  </div>
  </form>
<button id="saveArticleBtn">Save New Article</button>`
}  
  

//event listener on saveArticleBtn button and values of the inputs
// const ()
document.querySelector("#articleContainer").addEventListener("click", function () {
  if (event.target.id === "saveArticleBtn"){
    
  console.log("You clicked the Save Article Button");

const articleCreation = {
  "title": document.querySelector("#new-News-Title").value,
  "synopsis": document.querySelector("#new-Synopsis").value,
  "url": document.querySelector("#new-url").value
}

fetch("http://localhost:8000/newsArticles", { // Replace "url" with your API's URL
  method: "POST",
  headers: {
      "Content-Type": "application/json"
  },
  body: JSON.stringify(articleCreation)
}) .then(()=>{
  fetch("http://localhost:8000/newsArticles")
  .then((newsArticles) => newsArticles.json())
  .then((parsednewsArticles) => {
    console.log(parsednewsArticles);
    parsednewsArticles.forEach(element => {
      document.querySelector("#articleContainer").innerHTML +=
      newsArticleCard(element)
    });
})
}
)}})
