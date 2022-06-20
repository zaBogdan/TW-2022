function getParamFromUrl(parameter) {
  let search = window.location.search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(parameter);
}

const search = () => {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const ul = document.getElementById("ruleList");
  const li = ul.getElementsByTagName("li");

  for(const liTag of li) {
    a = liTag.getElementsByClassName("name_in_list")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      liTag.style.display = "";
    } else {
      liTag.style.display = "none";
    }
  }
}

function redirect() {
  window.location.href =
    "/admin/CurrentDomain/Rules/AddRule/index.html?domain=" +
    getParamFromUrl("domain");
}

window.addEventListener("load", (event) => {
  $(function () {
    $("#nav").load("/admin/sidebar/sidebarCurrentDomain.html");
  });

  // get all href's and add the id to the name
  const collection = document.getElementsByClassName("id_param");

  for(const line of collection) {
    let base = line.href.slice(
      0,
      line.href.lastIndexOf("/?") + 1
    );
    let id = getParamFromUrl("domain");
    line.href = base + "?domain=" + id;
  }

  const rules_list = document.getElementById("ruleList");

  const rules = authGet(
    "/rule/domain/" + getParamFromUrl("domain"),
    requestOptions
  );
  rules.then((response) => {
    if (response.data.rules.length > 0) {
      for(const rule of response.data.rules) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        const name = document.createElement("div");
        name.classList.add("name_in_list");
        const aText = document.createTextNode(rule.name);
        name.append(aText);
        const id_p = document.createElement("div");
        const id = document.createTextNode(rule._id);
        id_p.appendChild(id);
        id_p.classList.add("id_rule"); // id that will be kept hidden
        // the "edit" icon
        const ic1 = document.createElement("i");
        ic1.setAttribute("class", " fas fa-pen");
        ic1.title = "edit";

        // the "delete" icon
        const ic2 = document.createElement("i");
        ic2.setAttribute("class", " fas fa-trash");
        ic2.title = "delete";

        // constructing the <li> entry
        li.appendChild(a);
        li.appendChild(name);
        li.appendChild(ic1);
        li.appendChild(ic2);
        li.appendChild(id_p);
        rules_list.appendChild(li);

        // edit button functionality
        ic1.addEventListener("click", () => {
          // constructing the fetch url
          let url =
            "/admin/CurrentDomain/Rules/EditRule/index.html?" +
            "domain=" +
            getParamFromUrl("domain") +
            "&rule=" +
            rule._id;
          // redirect to url
          location.href = url;
        });

        // delete functionality
        ic2.addEventListener("click", () => {
          if (
            confirm("Are you absolutely sure you want to remove this rule?")
          ) {
            rules_list.removeChild(li);
            authDelete("/rule/" + rule._id).then(
              (response) => {
                console.log("Rule successfully deleted!");
              }
            );
          }
        });
      }
    }
  });

  //
});
