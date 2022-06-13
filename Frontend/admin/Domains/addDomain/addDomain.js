const sidebar = document.querySelector('.sidebar')
fetch('../../sidebar/sidebar.html')
.then(res=>res.text())
.then(data=>{
    sidebar.innerHTML=data
})
/*sidebar included*/


function showForm(){
    let inpt = document.getElementById("username_form");
    let placeholder = document.getElementById("username");
    placeholder.value = "";
    inpt.style.display = "block";
}
function hideForm(){
    let inpt = document.getElementById("username_form");
    inpt.style.display = "none";
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
        const textVal = document.createElement("input");
            textVal.classList.add("text");
            textVal.type = "text";
            textVal.value = uname;
            textVal.setAttribute("readonly","readonly");
        li.appendChild(textVal);
        // the "Edit" icon
        let ic1 = document.createElement("i");
            ic1.className= "fas fa-pen";
            ic1.title = "edit";
        li.appendChild(ic1);
        // the "Delete" icon
        let ic2 = document.createElement("i");
            ic2.className= "fas fa-trash";
            ic2.title = "delete";
        li.appendChild(ic2);
        userList.appendChild(li);
        hideForm();

        // the edit icon - will allow to edit input, and change to the "save" icon
        ic1.addEventListener('click', () => {
            if (ic1.classList.contains("fa-pen")){
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
    document.getElementById("add_domain_form").addEventListener("submit",(e) => {
        e.preventDefault()
        window.location.href = "/admin/Domains/index.html";
    });

    // daca se decide la renuntare => optiunea "cancel"
    const cnclBtn = document.getElementById("cancel_form").onclick = function(){
        /// informatiile nu se trimit nicaieri
        location.href = "/admin/Domains/index.html";
    };
})

