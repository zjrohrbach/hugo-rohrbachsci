/////////////////////////////////////////////////////////
// Script for live loading of the next set of articles //
/////////////////////////////////////////////////////////

//Everytime next link is clicked, this is the order of functions:
// loadNext() -> loadDoc() -> appendArticles()

function loadDoc(url, cFunction) {
  const snippet = new XMLHttpRequest();
  snippet.open("POST", url);
  snippet.responseType = 'document';
  snippet.send()
  snippet.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  }
}

function appendArticles(snippet) {
  //get important info from snippet
  const newHTML = snippet.responseXML.getElementById("newarticles").innerHTML;
  const JSONInput = snippet.responseXML.getElementById("json-variables").innerHTML;

  //parse the JSON
  const JSONVars = JSON.parse(JSONInput);

  //insert the newHTML
  const nextPageElement = document.getElementById("next-page");
  nextPageElement.insertAdjacentHTML("beforebegin", newHTML);

  //it is now okay to scroll right
  toggleDisable("nav-right", false);

  //update pathToNext for the next snippet; otherwise remove the next-page element.
  const hasNext = JSONVars.hasNext;
  if (hasNext) {
    const pathToNext = JSONVars.nextURL;
    nextPageElement.innerHTML = '<a href="" onclick="return false" onmouseup="loadNext(\'' + pathToNext + '\')">Older Posts &#8811;</a>';
  } else {
    nextPageElement.remove();
  }
}

function loadNext(url) {
  const loader = 'Loading';
  nextPageButton = document.getElementById('next-page');

  nextPageButton.innerHTML = loader;
  loadDoc(url, appendArticles);
}
