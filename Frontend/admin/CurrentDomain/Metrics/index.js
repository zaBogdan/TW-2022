// functie pentru extragerea unui parametru din URL
function getParamFromUrl(parameter) {
  let search = window.location.search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(parameter);
}
function redirect() {
  window.location.href = "/admin/CurrentDomain/Metrics/AddEvent.html?domain=" + getParamFromUrl("domain");
}

window.addEventListener('load', (event) => {
  $(function () {
    $("#nav").load("/admin/sidebar/sidebarCurrentDomain.html");
  });
  /*sidebar included*/
  
  
  // get all href's and add the id to the name
  var collection = document.getElementsByClassName("id_param");
  for (let i = 0; i < collection.length; i++) {
    let base = collection[i].href.slice(0, collection[i].href.lastIndexOf("/?") + 1);;
    let id = getParamFromUrl("domain");
    collection[i].href = base + "?domain=" + id;
  }

  
  var events_list = document.getElementById("eventList");
  var events = authGet("/event/domain/"+getParamFromUrl("domain"), requestOptions);
  events.then(response => {
    if (response.data.events.length > 0) {
      for (let i = 0; i < response.data.events.length; i++) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        const aText = document.createTextNode(response.data.events[i]['name']);
        const id_p = document.createElement("div");
        const id = document.createTextNode(response.data.events[i]['_id']);
        id_p.appendChild(id);
        id_p.classList.add("id_event"); // id that will be kept hidden
        // the "edit" icon
        const ic1 = document.createElement("i");
        ic1.setAttribute('class', " fas fa-pen");
        ic1.title = "edit";
  
        // the "delete" icon
        const ic2 = document.createElement("i");
        ic2.setAttribute('class', " fas fa-trash");
        ic2.title = "delete";
  
        // constructing the <li> entry
        li.appendChild(aText);
        li.appendChild(ic1);
        li.appendChild(ic2);
        li.appendChild(id_p);
        events_list.appendChild(li);
  
        // edit button functionality
        ic1.addEventListener('click', () => {
          // constructing the fetch url
          let url = "/admin/CurrentDomain/Metrics/EditEvent.html?" + "domain=" + getParamFromUrl("domain") + "&event=" + response.data.events[i]['_id'];
          // redirect to url
          location.href = url;
        })
  
        // delete functionality
        ic2.addEventListener('click', () => {
          if (confirm("Are you absolutely sure you want to remove this domain?")) {
            events_list.removeChild(li);
            authDelete("/event/"+response.data.events[i]['_id']);
          }
  
        })
  
      }
    }
  });
  
  //
});

