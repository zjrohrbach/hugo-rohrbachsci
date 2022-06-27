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
