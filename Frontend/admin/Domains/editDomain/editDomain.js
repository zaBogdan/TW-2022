$(function(){
    $("#nav").load("../../sidebar/sidebar.html"); 
  });
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
function buildFetchUrl(){
    /* building the URL to fetch the data for this domain
    ....
    let search_params = window.location.search;
    let search_fetchKey = search_params.slice(1).split("&")[0].split("=")[1];
    */
   let baseURL = "https://002f0804-fc69-425b-b291-9739c417bb1f.mock.pstmn.io";
   let URL = baseURL+"/domain/644fc60f37564676aeb277c74712a856";
   return URL;
}

// should this be a universal function?
async function getFetch(url){
    try{
     let x = await fetch(url).then(response => response.json());
     return x;
    }
    catch(error){
      console.error("Could not fetch from API!");
    } 
  }
  



window.addEventListener('load', () => {
    // se face fetch-ul
    const domain_info = getFetch(buildFetchUrl());

    domain_info.then(response => {
        let domainName = document.getElementById("domain_name");
            domainName.value = response.data["name"];
        let domainAddress = document.getElementById("domain_address");
            domainAddress.value = response.data["url"];
        const userList = document.querySelector("#domain_moderators_list");
        if (response.data["users"].length>0){
            for (let i=0; i<response.data["users"].length; i++){
                const li = document.createElement("li");
                    li.classList.add("username_entry");
                const textVal = document.createElement("input");
                    textVal.classList.add("text");
                    textVal.type = "text";
                    textVal.value = response.data["users"][i]["username"];
                    textVal.setAttribute("required","required");
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

                // codul de mai jos apare si in  addDomain.js la fel
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
                textVal.setAttribute("required","required");
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
        document.getElementById("edit_domain_form").addEventListener("submit",(e) => {
            e.preventDefault()
            window.location.href = "/admin/Domains/index.html";
        });
        const cnclBtn = document.getElementById("cancel_form").onclick = function(){
        /// informatiile nu se trimit nicaieri
        location.href = "/admin/Domains/index.html";
    };
    })
        

        
    
})
