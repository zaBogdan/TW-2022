$(function(){
    $("#nav").load("../../sidebar/sidebarCurrentDomain.html"); 
  });
/*sidebar included*/


function hideAll(class_name){
    const fields = document.querySelectorAll(class_name);
    fields.forEach(f => {
        f.style.display = 'none';
        f.disabled = true;
    })
}

function show_appropriate(){
    let result = document.getElementById("select_reward_type").value;
    hideAll('.dynamic_reward_type');
    if (result=="0"){
        hideAll('.dynamic_reward_type');
    }
    else if (result == "Score"){
        let fd = document.getElementById("reward_score");
        fd.style.display = "block";
        fd.disabled = false;
    }
    else if (result=="Achievement"){
        let fd = document.getElementById("reward_achievement");
        fd.style.display = "block";
        fd.disabled = false;
    }
    else if (result=="Rank-up"){
        let fd = document.getElementById("reward_rank-up");
        fd.style.display = "block";
        fd.disabled = false;
    }
    else if (result=="Rank-down"){
        let fd = document.getElementById("reward_rank-down");
        fd.style.display = "block";
        fd.disabled = false;
    }   
}

function show_rule_params(){
    let result = document.getElementById("select_rule_type").value;
    hideAll('.dynamic_rule_type');
    if (result=="0"){
        hideAll('.dynamic_rule_type');
    }
    else if (result == "has_metric"){
        let fd = document.getElementById("user_has_metric");
        fd.style.display = "block";
        fd.disabled = false;
    }
    else if (result == "all"){
        const btn = document.getElementById("all_rules").getElementsByClassName("add_rule_button")[0];
        let fd = document.getElementById("all_rules");
        const newtext = document.createTextNode("The user performed the action:");
        fd.insertBefore(newtext,btn);
        fd.style.display = "block";
        fd.disabled = false;
    }
    else if (result == "any"){
        const btn = document.getElementById("any_rule").getElementsByClassName("add_rule_button")[0];
        let fd = document.getElementById("any_rule");
        const newtext = document.createTextNode("The user performed the action:");
        fd.insertBefore(newtext,btn);
        fd.style.display = "block";
        fd.disabled = false;
    }
}

function insert_new_rule_field(field_id){
    const btn = document.getElementById(field_id).getElementsByClassName("add_rule_button")[0];
    const field = document.getElementById("user_has_metric");
    const clone = field.cloneNode(true);
    const parent = document.getElementById(field_id);
    clone.classList.add("new_sub_rule");
    clone.style.display="block";
    clone.disabled = false;
    // the "Delete" icon
    let ic1 = document.createElement("i");
        ic1.className= "fas fa-trash";
        ic1.title = "delete";
    clone.appendChild(ic1);
    parent.insertBefore(clone,btn);
    ic1.addEventListener('click', () => {
        if (confirm("Are you sure you want to remove this rule?"))
    parent.removeChild(clone);
    })
}


/** Functie repetata */
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
   async function getFromApi(url, requestOptions){
     try{
      let x = await fetch(url, requestOptions).then(response => response.json());
      return x;
     }
     catch(error){
       console.error("Could not fetch from API!");
     }
     
   }
/** */


/** Generarea listei de achievement-uri pentru dropdownul de la reward type */
var url = "http://localhost:8085/achievement/domain/c89fcd3a1d3c49e793a54c74ff906131";
var achievement_list = document.getElementById("achievement_list");
var achievements = getFromApi(url, requestOptions);
 achievements.then(response => {
  if(response.data.achievements.length>0){
    for (let i=0; i<response.data.achievements.length; i++){
        const option = document.createElement("option");
        option.value = response.data.achievements[i]["name"];
        const textNode = document.createTextNode(response.data.achievements[i]["name"]);
        option.appendChild(textNode);
        achievement_list.appendChild(option);
    }
}}
 );

 /** Generarea listei de rank-uri pentru dropdownul de la reward type */
var url = "http://localhost:8085/rank/domain/c89fcd3a1d3c49e793a54c74ff906131";
var rank_lists = document.getElementsByClassName("rank_list");
var ranks = getFromApi(url,requestOptions);
 ranks.then(response => {
  if(response.data.ranks.length>0){
    for (let i=0; i<response.data.ranks.length; i++){
        for (const list of rank_lists){
            const option = document.createElement("option");
            option.value = response.data.ranks[i]["name"];
            const textNode = document.createTextNode(response.data.ranks[i]["name"]);
            option.appendChild(textNode);
            list.appendChild(option);
        }
    }
}}
 );

 /** Generarea listei de event-uri pentru dropdownul de la rule */
var url = "http://localhost:8085/event/domain/c89fcd3a1d3c49e793a54c74ff906131";
var actions_list = document.getElementById("actions_list");
var actions = getFromApi(url,requestOptions);
actions.then(response => {
  if(response.data.events.length>0){
    for (let i=0; i<response.data.events.length; i++){
        const option = document.createElement("option");
        option.value = response.data.events[i]["name"];
        const textNode = document.createTextNode(response.data.events[i]["name"]);
        option.appendChild(textNode);
        actions_list.appendChild(option);
    }
}}
 );


/** Generarea listei de "rules" din baza de date */
/*var url = "http://localhost:8085/event/domain/c89fcd3a1d3c49e793a54c74ff906131";
var actions_list = document.getElementById("actions_list");
var actions = getFromApi(url,requestOptions);
actions.then(response => {
  if(response.data.events.length>0){
    for (let i=0; i<response.data.events.length; i++){
        const option = document.createElement("option");
        option.value = response.data.events[i]["name"];
        const textNode = document.createTextNode(response.data.events[i]["name"]);
        option.appendChild(textNode);
        actions_list.appendChild(option);
    }
}}
 );*/


 const cnclBtn = document.getElementById("cancel_rule").onclick = function(){
    /// informatiile nu se trimit nicaieri
    location.href = "/admin/CurrentDomain/Rules/index.html";
};