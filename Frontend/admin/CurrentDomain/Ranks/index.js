// functie pentru extragerea unui parametru din URL
function getParamFromUrl(parameter) {
  let search = window.location.search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(parameter);
}
// url-urile de baza
var baseGetURL = url + "/rank/domain/";
var baseDeleteURL = url + "/rank/self/";
// id-ul domeniului
let website_id = getParamFromUrl("domain");
let GetURL = baseGetURL + website_id;

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


function redirect() {
  window.location.href = "/admin/CurrentDomain/Ranks/AddRanks.html/?domain=" + getParamFromUrl("domain");
}



var ranks_list = document.getElementById("rankList");
var ranks = authGet(GetURL, requestOptions);
ranks.then(response => {
  if (response.data.ranks.length > 0) {
    for (let i = 0; i < response.data.ranks.length; i++) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      const name = document.createElement("div");
      name.classList.add("name_in_list");
      const aText = document.createTextNode(response.data.ranks[i]['name']);
      name.append(aText);
      const id_p = document.createElement("div");
      const id = document.createTextNode(response.data.ranks[i]['_id']);
      id_p.appendChild(id);
      id_p.classList.add("id_rank"); // id that will be kept hidden
      // the "edit" icon
      const ic1 = document.createElement("i");
      ic1.setAttribute('class', " fas fa-pen");
      ic1.title = "edit";

      // the "delete" icon
      const ic2 = document.createElement("i");
      ic2.setAttribute('class', " fas fa-trash");
      ic2.title = "delete";

      // constructing the <li> entry
      li.appendChild(a);
      li.appendChild(name);
      li.appendChild(ic1);
      li.appendChild(ic2);
      li.appendChild(id_p);
      ranks_list.appendChild(li);

      // edit button functionality
      ic1.addEventListener('click', () => {
        // constructing the fetch url
        let url = "/admin/CurrentDomain/Ranks/EditRanks.html/?" + "domain=" + website_id + "&rank=" + response.data.ranks[i]['_id'];
        // redirect to url
        location.href = url;
      })

      // delete functionality
      ic2.addEventListener('click', () => {
        if (confirm("Are you absolutely sure you want to remove this rank?")) {
          ranks_list.removeChild(li);
        }

        var requestOptions = {
          method: 'DELETE',
          redirect: 'follow'
        };
        let rank_id = response.data.ranks[i]['_id'];
        let DeleteURL = baseDeleteURL + rank_id;
        console.log(rank_id);
        fetch(DeleteURL, requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
        // send PUT request to alter database
      })

    }
  }
});

// functia de search
function search() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("rankList");
  li = ul.getElementsByTagName('li');
  console.log(li);
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {

    a = li[i].getElementsByClassName("name_in_list")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
//