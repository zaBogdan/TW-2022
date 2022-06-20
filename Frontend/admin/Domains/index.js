window.addEventListener('load', (event) => {
  $(function () {
    $("#nav").load("../sidebar/sidebar.html");
  });   /*sidebar included*/
  // Construirea dinamica a listei in functie de ce primim din baza de date
// versiunea initiala, needitata
var domenii = document.getElementById("domainList");
var domains = authGet("/domain/self", requestOptions);
domains.then(response => {
  if (response.data.domains.length > 0) {
    for (let i = 0; i < response.data.domains.length; i++) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const aText = document.createTextNode(response.data.domains[i]['name']);
      a.setAttribute('href', "/admin/CurrentDomain/Statistics/?domain=" + response.data.domains[i]['_id']);
      a.appendChild(aText);
      a.style.color = "#2e3e3f";
      const id_p = document.createElement("div");
      const id = document.createTextNode(response.data.domains[i]['_id']);
      id_p.appendChild(id);
      id_p.classList.add("id_website"); // id that will be kept hidden
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
      li.appendChild(ic1);
      li.appendChild(ic2);
      li.appendChild(id_p);
      domenii.appendChild(li);

      // edit button functionality
      ic1.addEventListener('click', () => {
        // constructing the fetch url
        let url = "/admin/Domains/editDomain/editDomain.html?" + "domain=" + response.data.domains[i]['_id'];
        // redirect to url
        location.href = url;
      })

      // delete functionality
      ic2.addEventListener('click', () => {
        if (confirm("Are you absolutely sure you want to remove this domain?"))
          domenii.removeChild(li);

        var requestOptions = {
          method: 'DELETE',
          redirect: 'follow'
        };
        let domain_id = response.data.domains[i]['_id'];
        let delURL = url + "/domain/" + domain_id;
        console.log(delURL);
        fetch(delURL, requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
        // send PUT request to alter database
      })

    }
  }
});


});



