function toggleDisable (id, condition) {
    // id is the name of an element id
    // condition is the condition in which link should be disabled

    element = document.getElementById(id);
        
    if (condition) {
      element.className = "scroll-disable";
    } else {
      element.classList.remove("scroll-disable");
    } 

    element = null;
  }

  function updateHighlight() {
    scrollTarget = document.getElementById("scroll_window")
    var maxScroll = scrollTarget.scrollWidth - scrollTarget.clientWidth;

    toggleDisable("nav-left", scrollTarget.scrollLeft < 5);
    toggleDisable("nav-right", scrollTarget.scrollLeft >= maxScroll - 5)

  }

  function moveDirection(dir) {

    scrollTarget = document.getElementById("scroll_window")
    var stepSize = 0.6 * scrollTarget.clientWidth;
    var maxScroll = scrollTarget.scrollWidth - scrollTarget.clientWidth;

    if(dir == 'right' && scrollTarget.scrollLeft < maxScroll) {
      scrollTarget.scrollLeft += stepSize;     
    } else if (dir == 'left' && scrollTarget.scrollLeft > 0) {
      scrollTarget.scrollLeft -= stepSize;   
    }

  }

  /////////////////////////////////////////////////////////////////////////////////
  // Everything below this point is for live loading of the next set of articles //
  /////////////////////////////////////////////////////////////////////////////////
  
  //Everytime next link is clicked, this is the order of functions:
  // loadNext() -> loadDoc() -> appendArticles()




  //This variable holds the path to the next HTML snippet.  It gets changed in 
  pathToNext = '/snippets/';

  function loadDoc(url, cFunction) {
    let snippet = new XMLHttpRequest();
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
    let newHTML = snippet.responseXML.getElementById("newarticles").innerHTML;
    let JSONInput = snippet.responseXML.getElementById("json-variables").innerHTML;

    //parse the JSON
    var JSONVars = JSON.parse(JSONInput);

    //insert the newHTML
    let nextPageElement = document.getElementById("next-page")
    nextPageElement.insertAdjacentHTML("beforebegin", newHTML)

    //reset the value of the next-page element
    nextPageElement.innerHTML = '<a href="" onclick="return false" onmouseup="loadNext()">Older Posts &#8811;</a> ';
    toggleDisable("nav-right", false);

    //update pathToNext for the next snippet; otherwise remove the next-page element.
    hasNext = JSONVars.hasNext;
    if (hasNext) {
      pathToNext = JSONVars.nextURL;
    } else {
      nextPageElement.remove();
    }
  }

  function loadNext() {
    let loader = 'Loading';
    nextPageButton = document.getElementById('next-page');

    nextPageButton.innerHTML = loader;
    loadDoc(pathToNext, appendArticles);
  }