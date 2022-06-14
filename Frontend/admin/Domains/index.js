
$(function(){
  $("#nav").load("../sidebar/sidebar.html"); 
});   /*sidebar included*/



// construirea adresei
 var baseurl = "https://002f0804-fc69-425b-b291-9739c417bb1f.mock.pstmn.io";
 //let url = baseurl +"/domain/self?status=active";
// obtinerea informatiilor din API
var url = "/admin/Mocks/GetDomains.mock";
 async function getDomains(url){
   try{
    let x = await fetch(url).then(response => response.json());
    return x;
   }
   catch(error){
     console.error("Could not fetch from API!");
   }
   
 }
 // Construirea dinamica a listei in functie de ce primim din baza de date
    // versiunea initiala, needitata
var domenii = document.getElementById("domainList");
var domains = getDomains(url);
 domains.then(response => {
  if(response.data.length>0){
    for (let i=0; i<response.data.length; i++){
        const li = document.createElement("li");
        const a = document.createElement("a");
        const aText =  document.createTextNode(response.data[i]['name']);
            a.setAttribute('href',"/admin/CurrentDomain");
            a.appendChild(aText);
            a.style.color="#2e3e3f";
      // the "edit" icon
        const ic1 = document.createElement("i");
            ic1.setAttribute('class', " fas fa-pen");
            ic1.title = "edit";
         
      // the "delete" icon
        const ic2 = document.createElement("i");
            ic2.setAttribute('class'," fas fa-trash");
            ic2.title = "delete";
    
    // constructing the <li> entry
        li.appendChild(a);
        li.appendChild(ic1);
        li.appendChild(ic2);
        domenii.appendChild(li);

        // edit button functionality
        ic1.addEventListener('click', () => {
            // constructing the fetch url
            let url = "/admin/Domains/editDomain/editDomain.html?" + "domain="+response.data[i]['url'];
            // redirect to url
            location.href = url;
        })

        // delete functionality
        ic2.addEventListener('click', () => {
            if (confirm("Are you absolutely sure you want to remove this domain?"))
            domenii.removeChild(li);
            // send PUT request to alter database
        })
        
    }
  }
   }); 

//