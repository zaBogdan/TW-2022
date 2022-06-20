$(function () {
    $("#nav").load("../../sidebar/sidebar.html");
});
/*sidebar included*/


// functie pentru extragerea unui parametru din URL
function getParamFromUrl(parameter) {
    let search = window.location.search;
    const urlParams = new URLSearchParams(search);
    return urlParams.get(parameter);
}
// se extrage din URL id-ul unic al unui domeniu, a.i sa se poata construi corect URL-ul pentru API
let website_id = getParamFromUrl("domain");
let baseURL = "/domain/";
let getOneURL = baseURL + website_id;

//let putURL = baseURL + website_id;




function showForm() {
    let inpt = document.getElementById("username_form");
    let placeholder = document.getElementById("username");
    placeholder.value = "";
    inpt.style.display = "block";
}
function hideForm() {
    let inpt = document.getElementById("username_form");
    inpt.style.display = "none";
}




window.addEventListener('load', () => {
    // se face auth-ul
    var domain_info = authGet(getOneURL, requestOptions);

    domain_info.then(response => {
        let domainName = document.getElementById("domain_name");
        domainName.value = response.data.domain["name"];
        let domainAddress = document.getElementById("domain_address");
        domainAddress.value = response.data.domain["activeUrl"][0];
        const userList = document.querySelector("#domain_moderators_list");
        if (response.data.domain["users"].length > 0) {
            for (let i = 0; i < response.data.domain["users"].length; i++) {
                const li = document.createElement("li");
                li.classList.add("username_entry");
                const textVal = document.createElement("input");
                textVal.classList.add("text");
                textVal.type = "text";
                textVal.value = response.data.domain["users"][i];
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

                // codul de mai jos apare si in  addDomain.js la fel
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
                })  //pana aici e duplicat
            }
        }

        const addBtn = document.querySelector("#add_new_user");
        const cnclBtnU = document.querySelector("#cancel_username");

        cnclBtnU.addEventListener("click", (e) => {
            e.preventDefault();
            hideForm();
        })

        addBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const uname = document.querySelector("#username").value;
            // validare
            if (!uname || uname.trim() === '') {
                alert("Please insert a valid username!");
                return
            }

            const li = document.createElement("li");
            li.classList.add("username_entry");
            const textVal = document.createElement("input");
            textVal.setAttribute("required", "required");
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

        // after saving changes - redirect to domains page
        document.getElementById("edit_domain_form").addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            // get the form data
            let val = {};
            val["name"] = data.get("domain_name");
            val["active"] = true;
            val["activeUrl"] = [data.get("domain_address")];
            // get the <ul> entries and put them in an array
            let users = [];
            const u = document.getElementsByClassName("text");
            for (let x = 0; x < u.length; x++)
                users.push(u[x].value);
            // append this to the result
            val["users"] = users;
            // stringify
            let json = JSON.stringify(val);
            console.log(json);
            authPut("/domain/" + website_id, json).then(response => {
                // redirect to domains home page
                window.location.href = "/admin/Domains/index.html";
            });
            
        });
        const cnclBtn = document.getElementById("cancel_form").onclick = function () {
            location.href = "/admin/Domains/index.html";
        };
    })




})
