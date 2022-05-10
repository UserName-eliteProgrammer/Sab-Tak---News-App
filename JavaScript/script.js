console.log("Included");
const apiKey = "69487909963e44329f45de2ee1dfe8c0";

let source = "bbc-news";

function sendRequest() {
  let requestObj = new XMLHttpRequest();
  requestObj.open(
    "GET",
    `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`,
    true
  );

  requestObj.onload = function () {
    let response = JSON.parse(this.responseText);
    let innerHTML = ` <h1 style="text-align: center; margin-bottom: 10px;">HeadLines</h1>
        <hr>`;
    if (this.status == 200) {
      let articles = response.articles;
      if (articles.length === 0) {
        return;
      }

      for (let index = 0; index < articles.length; index++) {
        innerHTML += ` <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h3 class="accordion-header mx-3 my-2" id="headingOne">
        ${articles[index].title}
    </h3>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <a href="${articles[index].url}" style="" target="_blank">${articles[index].description}</a>
      </div>
    </div>
  </div>
</div>
<br>`;
      }
      document.getElementById("newsContainer").innerHTML = innerHTML;
    }
  };
  requestObj.send();
}

sendRequest();

// for search bar
const searchbtn = document.getElementById("search");
const inp = document.getElementById("inp");

searchbtn.addEventListener("click", () => {
  const inpVal = inp.value;
  source = inpVal.replaceAll(" ", "-");
  console.log(source);
  sendRequest();
});
