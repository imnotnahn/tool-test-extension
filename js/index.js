document.getElementById("buttonRelay").addEventListener("click", function(event) {
  openTab(event, 'testRelay');
});

document.getElementById("buttonTimer").addEventListener("click", function(event) {
  openTab(event, 'testTimer');
});

function openTab(event, nameTab) {
  // Declare all variables
  let i, tabcontent, tablinks;
  console.log(nameTab);
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(nameTab).style.display = "block";
  event.currentTarget.classList.add("active");
}
