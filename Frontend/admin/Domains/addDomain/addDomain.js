var postURL = url + "/domain/self";
var getAllURL = url + "/domain/self";
var getOneURL = url + "/domain/c89fcd3a1d3c49e793a54c74ff906131";
var putURL = url + "/domain/c89fcd3a1d3c49e793a54c74ff906131";
var delURL = url + "/domain/c89fcd3a1d3c49e793a54c74ff906131";

$(function () {
    $("#nav").load("../../sidebar/sidebar.html");
});

/*sidebar included*/


function showForm() {
    let inpt = document.getElementById("username_form");
    let placeholder = document.getElementById("username");
    placeholder.value = "";
    inpt.style.display = "block";
    let fld = document.getElementById("username");
    fld.disabled = false;
}
function hideForm() {
    let inpt = document.getElementById("username_form");
    inpt.style.display = "none";
    let fld = document.getElementById("username");
    fld.disabled = true;
}


window.addEventListener('load', () => {
    const addBtn = document.querySelector("#add_new_user");
    const cnclBtnU = document.querySelector("#cancel_username");
    const userList = document.querySelector("#domain_moderators_list");

    // the "cancel" cancel when adding a new username
    cnclBtnU.addEventListener("click", (e) => {
        e.preventDefault();
        hideForm();
    })

    // the "add" button when adding a new username
    addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const uname = document.querySelector("#username").value;
        // validare (minimala)
        if (!uname || uname.trim() === '') {
            alert("Please insert a valid username!");
            return
        }

        const li = document.createElement("li");
        li.classList.add("username_entry");
        li.setAttribute("name", "domain_moderators[]")
        li.setAttribute("type", "domain_moderators[]")
        const textVal = document.createElement("input");
        textVal.classList.add("text");
        textVal.type = "text";
        textVal.value = uname;
        textVal.setAttribute("readonly", "readonly");
        li.appendChild(textVal);
        // the "Edit" icon
        let ic1 = document.createElement("i");
        ic1.className = "fas fa-pen";
        ic1.title = "edit";
        li.appendChild(ic1);
        // the "Delete" icon
        let ic2 = document.createElement("i");
        ic2.className = "fas fa-trash";
        ic2.title = "delete";
        li.appendChild(ic2);
        userList.appendChild(li);
        hideForm();

        // the edit icon - will allow to edit input, and change to the "save" icon
        ic1.addEventListener('click', () => {
            if (ic1.classList.contains("fa-pen")) {
                textVal.removeAttribute("readonly");
                textVal.focus();
                ic1.classList.remove("fa-pen");
                ic1.classList.add("fa-save");
                ic1.title = "save";
            } else {
                if (!textVal.value || textVal.value.trim() === '') {
                    alert("Please insert a valid username!");
                    return
                }
                textVal.setAttribute("readonly", "readonly");
                ic1.classList.remove("fa-save");
                ic1.classList.add("fa-pen");
                ic1.title = "edit";
            }

        })

        // adding functionality for the "delete" icon
        ic2.addEventListener('click', () => {
            if (confirm("Are you sure you want to remove this user?"))
                userList.removeChild(li);
        })


    })

    // Post-ing new entry
    document.getElementById("add_domain_form").addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        // get the form data
        var val = {};
        val["name"] = data.get("name");
        val["active"] = true;
        val["activeUrl"] = [data.get("domain_address")];
        // get the <ul> entries and put them in an array
        var users = [];
        const u = document.getElementsByClassName("text");
        for (let x = 0; x < u.length; x++)
            users.push(u[x].value);
        // append this to the result
        val["users"] = users;
        // stringify
        var json = JSON.stringify(val);
        // sending data to the server
        console.log(json);
        authPost("/domain/self", json).then(response => {
            
        // redirect to domains home page
        window.location.href = "/admin/Domains/index.html";
        });
    });

    // daca se decide la renuntare => optiunea "cancel"
    const cnclBtn = document.getElementById("cancel_form").onclick = function () {
        /// informatiile nu se trimit nicaieri
        location.href = "/admin/Domains/index.html";
    };
})

