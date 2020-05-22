  // save article
  function buildNewForm() {
    return `<section>
  
    <div class="form-group-for-news">
      <label for="formGroupForNews">News Title</label>
      <input
        type="text"
        class="newTitle"
        id="new-NewsTitle"
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
      <input 
      type="text" 
      class="newURL" 
      id="new-url" 
      placeholder="URL"
    </div>
    
  <button id="saveArticleBtn">Save New Article</button>
  </section>`
  }

// creates news article card with materialize
const newsArticleCard = (singlePost) => {
  return `<div class="card">
  <div class="card-image waves-effect waves-block waves-light">
    <img class="activator" src="${singlePost.pictureURL}">
  </div>
  <div class="card-content">
    <span class="card-title activator grey-text text-darken-4">${singlePost.title}<i class="material-icons right">more_vert</i></span>
    <p><a href="${singlePost.url}">Go to Article</a></p>
    <!-- Delete button for deleting a saved article -->
        <button id="deleteArticleBtn-${singlePost.id}">Delete Article</button>
        <button id="editArticleBtn-${singlePost.id}">Edit Article</button>
  </div>
  <div class="card-reveal">
    <span class="card-title grey-text text-darken-4">${singlePost.title}<i class="material-icons right">close</i></span>
    <p>${singlePost.synopsis}</p>
    </div>
  </div>
</div>`;
};

// supposed to be the form that pulls up to edit
const editArticleForm = (articleFormObject) => {
  return `
  <form>
  <div class="form-group-for-news">
    <label for="formGroupForNews">News Title</label>
    <input
      type="text"
      class="newTitle"
      id="edit-News-Title"
      placeholder="News Title"
      value="${articleFormObject.title}"
    />
  </div>
  <div class="form-group-for-synopsis">
    <label for="formGroupForSynopsis">Synopsis</label>
    <input
      type="text"
      class="newSynopsis"
      id="edit-Synopsis"
      placeholder="Synopsis"
      value="${articleFormObject.synopsis}"
    />
  </div>
  <div class="form-group-for-url">
    <label for="formGroupForURL">URL</label>
    <input type="text" class="newURL" id="edit-url" placeholder="URL"
    value="${articleFormObject.url}"/>
  </div>
  </form>
  <button id="newFormArticle-${articleFormObject.id}">Save Article</button>`;
  // <button class="edit-btn" id="edit-1">Edit</button>`
};

// New article form pops up
const newArticleBtn = document.querySelector("#newArticleBtn");

// build form
document.querySelector("#newsContainer").addEventListener("click", function () {
  if (event.target.id === "newArticleBtn") {
    document.querySelector("#articleContainer").innerHTML += buildNewForm();
    console.log("You clicked the Create Article Button");
  }
});
//ask Ashon about using original cards with a materialize carousel combo??
// {/* <div class="carousel">
/* <a class="carousel-item" href="#one!"><img src="https://lorempixel.com/250/250/nature/1"></a>
<a class="carousel-item" href="#two!"><img src="https://lorempixel.com/250/250/nature/2"></a>
<a class="carousel-item" href="#three!"><img src="https://lorempixel.com/250/250/nature/3"></a>
<a class="carousel-item" href="#four!"><img src="https://lorempixel.com/250/250/nature/4"></a>
<a class="carousel-item" href="#five!"><img src="https://lorempixel.com/250/250/nature/5"></a>
</div> */
// where news articles gets translated
fetch("http://localhost:8000/newsArticles")
  .then((newsArticles) => newsArticles.json())
  .then((parsednewsArticles) => {
    console.log(parsednewsArticles);
    parsednewsArticles.forEach((element) => {
      document.querySelector("#articleContainer").innerHTML += newsArticleCard(
        element
      );
    });
  });

// delete articles button
document
  .querySelector("#articleContainer")
  .addEventListener("click", function () {
    //     // primary key
    const primaryKey = event.target.id.split("-")[1];
    if (event.target.id.includes("deleteArticleBtn")) {
      console.log("you clicked the delete article button", event.target.id);

      fetch(`http://localhost:8000/newsArticles/${primaryKey}`, {
        method: "DELETE",
      }).then(function () {
        fetch("http://localhost:8000/newsArticles")
          .then((newsArticles) => newsArticles.json())
          .then((parsednewsArticles) => {
            console.log(parsednewsArticles);
            document.querySelector("#articleContainer").innerHTML = "";
            parsednewsArticles.forEach((element) => {
              document.querySelector(
                "#articleContainer"
              ).innerHTML += newsArticleCard(element);
            });
            console.log("You clicked the Delete Button, to delete an article");
          });
      });
    }
  });
// // New article form pops up
// const newArticleBtn = document.querySelector("#newArticleBtn");

// // build form
// document.querySelector("#newsContainer").addEventListener("click", function () {
//   if (event.target.id === "newArticleBtn") {
//     document.querySelector("#articleContainer").innerHTML += buildNewForm();
//     console.log("You clicked the Create Article Button");
//   }
// });

// edit article button on form article container
document
  .querySelector("#articleContainer")
  .addEventListener("click", function () {
    if (event.target.id.includes("editArticleBtn")) {
      const secondaryKey = event.target.id.split("-")[1];
      console.log(secondaryKey);

      fetch(`http://localhost:8000/newsArticles/${secondaryKey}`)
        .then((newsArticle) => newsArticle.json())
        .then((parsednewsArticle) => {
          document.querySelector(
            "#articleContainer"
          ).innerHTML = editArticleForm(parsednewsArticle);
        });
    }
  });
document
  .querySelector("#articleContainer")
  .addEventListener("click", function () {
    if (event.target.id.includes("newFormArticle")) {
      const editArticleID = event.target.id.split("-")[1];

      const articleCreation = {
        title: document.querySelector("#edit-News-Title").value,
        synopsis: document.querySelector("#edit-Synopsis").value,
        url: document.querySelector("#edit-url").value,
      };
      fetch(`http://localhost:8000/newsArticles/${editArticleID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleCreation),
      }).then(() => {
        console.log("AHHHHHHHHHHHHHHHHHHH!");
        document.querySelector("#articleContainer").innerHTML = ``;
        fetch("http://localhost:8000/newsArticles")
          .then((newsArticles) => newsArticles.json())
          .then((parsednewsArticles) => {
            console.log(parsednewsArticles);
            parsednewsArticles.forEach((element) => {
              document.querySelector(
                "#articleContainer"
              ).innerHTML += newsArticleCard(element);
            });
          });
      });
    }
  });
  //event listener on saveArticleBtn button and values of the inputs


document
  .querySelector("body")
  .addEventListener("click", function () {
    if (event.target.id === "saveArticleBtn") {
      console.log("You clicked the Save editedArticle Button");

const articleCreation = {
  title: document.querySelector("#new-NewsTitle").value,
  synopsis: document.querySelector("#new-Synopsis").value,
  url: document.querySelector("#new-url").value,
}
console.log("you created the article");
// fetch to post
fetch("http://localhost:8000/newsArticles", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(articleCreation),
}).then(() => {
  console.log("AHHHHHHHHHHHHHHHHHHH!");
  document.querySelector("#articleContainer").innerHTML = ``;
  fetch("http://localhost:8000/newsArticles")
    .then((newsArticles) => newsArticles.json())
    .then((parsednewsArticles) => {
      console.log(parsednewsArticles);
      parsednewsArticles.forEach((element) => {
        document.querySelector(
          "#articleContainer"
        ).innerHTML += newsArticleCard(element);
      });
    });
});
}
});