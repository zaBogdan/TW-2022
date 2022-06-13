
var Sidebar = document.getElementById("sidebar");

function showMenu() {
    Sidebar.style.left = "0";
}
function hideMenu() {
    Sidebar.style.left = "-200px";
}
 window.addEventListener("resize", function () {
  if (window.innerWidth > 650) Sidebar.style.removeProperty("left");
});


