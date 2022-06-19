// functie pentru extragerea unui parametru din URL
function getParamFromUrl(parameter) {
    let search = window.location.search;
    const urlParams = new URLSearchParams(search);
    return urlParams.get(parameter);
}

let postURL = "www.google.ro";


// get all href's and add the id to the name
var collection = document.getElementsByClassName("id_param");
for (let i = 0; i < collection.length; i++) {
    let base = collection[i].href.slice(0, collection[i].href.lastIndexOf("/?") + 1);;
    let id = getParamFromUrl("domain");
    collection[i].href = base + "?domain=" + id;
}

function redirect() {
    window.location.href = "/admin/CurrentDomain/Rules/AddRule.html/?domain=" + getParamFromUrl("domain");
}

function hideAll(class_name) {
    const fields = document.querySelectorAll(class_name);
    fields.forEach(f => {
        f.style.display = 'none';
        f.disabled = true;
    })
}

function show_appropriate() {
    let result = document.getElementById("select_reward_type").value;
    hideAll('.dynamic_reward_type');
    if (result == "0") {
        hideAll('.dynamic_reward_type');
    }
    else if (result == "Score") {
        let fd = document.getElementById("reward_score");
        fd.style.display = "block";
        fd.disabled = false;
    }
    else if (result == "Achievement") {
        let fd = document.getElementById("reward_achievement");
        fd.style.display = "block";
        fd.disabled = false;
    }
    else if (result == "Rank-up") {
        let fd = document.getElementById("reward_rank-up");
        fd.style.display = "block";
        fd.disabled = false;
    }
    else if (result == "Rank-down") {
        let fd = document.getElementById("reward_rank-down");
        fd.style.display = "block";
        fd.disabled = false;
    }
}

function show_rule_params() {
    let result = document.getElementById("select_rule_type").value;
    hideAll('.dynamic_rule_type');
    if (result == "0") {
        hideAll('.dynamic_rule_type');
    }
    else if (result == "has_metric") {
        let fd = document.getElementById("user_has_metric");
        fd.style.display = "block";
        fd.disabled = false;
    }
    else if (result == "all") {
        const btn = document.getElementById("all_rules").getElementsByClassName("add_rule_button")[0];
        let fd = document.getElementById("all_rules");
        if (document.getElementById("desc_text_all") == null) {
            const desc_text = document.createElement("div");
            desc_text.id = "desc_text_all";
            const newtext = document.createTextNode("The user performed the action:");
            desc_text.appendChild(newtext);
            fd.insertBefore(desc_text, btn);
        }

        fd.style.display = "block";
        fd.disabled = false;
    }
    else if (result == "any") {
        const btn = document.getElementById("any_rule").getElementsByClassName("add_rule_button")[0];
        let fd = document.getElementById("any_rule");
        if (document.getElementById("desc_text_any") == null) {
            const desc_text = document.createElement("div");
            desc_text.id = "desc_text_any";
            const newtext = document.createTextNode("The user performed the action:");
            desc_text.appendChild(newtext);
            fd.insertBefore(desc_text, btn);
        }
        fd.style.display = "block";
        fd.disabled = false;
    }
}

function insert_new_rule_field(field_id) {
    const btn = document.getElementById(field_id).getElementsByClassName("add_rule_button")[0];
    const field = document.getElementById("user_has_metric");
    const clone = field.cloneNode(true);
    const parent = document.getElementById(field_id);
    clone.classList.add("new_sub_rule");
    clone.style.display = "block";
    clone.disabled = false;
    clone.querySelector("#inpt_value").value = null;
    // the "Delete" icon
    let ic1 = document.createElement("i");
    ic1.className = "fas fa-trash";
    ic1.title = "delete";
    clone.appendChild(ic1);
    parent.insertBefore(clone, btn);
    ic1.addEventListener('click', () => {
        if (confirm("Are you sure you want to remove this rule?"))
            parent.removeChild(clone);
    })
}



/** Generarea listei de achievement-uri pentru dropdownul de la reward type */
var url = url + "/achievement/domain/c89fcd3a1d3c49e793a54c74ff906131";
var achievement_list = document.getElementById("achievement_list");
var achievements = getFromApi(url, requestOptions);  //aici trebuie postToApi
achievements.then(response => {
    if (response.data.achievements.length > 0) {
        for (let i = 0; i < response.data.achievements.length; i++) {
            const option = document.createElement("option");
            option.value = response.data.achievements[i]["name"];
            const textNode = document.createTextNode(response.data.achievements[i]["name"]);
            option.appendChild(textNode);
            achievement_list.appendChild(option);
        }
    }
}
);

/** Generarea listei de rank-uri pentru dropdownul de la reward type */
var url = url + "/rank/domain/c89fcd3a1d3c49e793a54c74ff906131";
var rank_lists = document.getElementsByClassName("rank_list");
var ranks = getFromApi(url, requestOptions);
ranks.then(response => {
    if (response.data.ranks.length > 0) {
        for (let i = 0; i < response.data.ranks.length; i++) {
            for (const list of rank_lists) {
                const option = document.createElement("option");
                option.value = response.data.ranks[i]["name"];
                const textNode = document.createTextNode(response.data.ranks[i]["name"]);
                option.appendChild(textNode);
                list.appendChild(option);
            }
        }
    }
}
);

/** Generarea listei de event-uri pentru dropdownul de la rule */
var url = url + "/event/domain/c89fcd3a1d3c49e793a54c74ff906131";
var actions_list = document.getElementById("actions_list");
var actions = getFromApi(url, requestOptions);
actions.then(response => {
    if (response.data.events.length > 0) {
        for (let i = 0; i < response.data.events.length; i++) {
            const option = document.createElement("option");
            option.value = response.data.events[i]["name"];
            const textNode = document.createTextNode(response.data.events[i]["name"]);
            option.appendChild(textNode);
            actions_list.appendChild(option);
        }
    }
}
);


// Post-ing new entry
document.getElementById("AddNewRule").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // get the form data
    var val = {};
    data.delete("having_a_value");
    data.delete("having_the_name");
    /*data.forEach(function(v,key){
        val[key]=v;
    });*/
    val["name"] = data.get("rule_name");

    let reward = {};
    reward["type"] = data.get("reward_type");
    reward["name"] = data.get("value");
    val["reward"] = reward;
    val["match"] = data.get("Match");
    // get the <ul> entries and put them in an array
    var rules = [];
    var type = data.get("Match");
    const u = document.getElementsByClassName(type)[0].querySelectorAll(".new_sub_rule, .user_has_metric");
    for (let x = 0; x < u.length; x++) {
        let rule = {};
        rule["event"] = u[x].querySelector("#actions_list").value;
        rule["comparator"] = u[x].querySelector("#comparator_list").value;
        rule["value"] = u[x].querySelector("#inpt_value").value;
        rules.push(rule);
    }
    // append this to the result
    val["rules"] = rules;
    // stringify
    var json = JSON.stringify(val);
    // sending data to the server

    let requestOptions = {
        method: 'POST',
        body: json,
        redirect: 'follow'
    };
    fetch(postURL, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    // redirect to domains home page
    //window.location.href = "/admin/Domains/index.html";
});

const cnclBtn = document.getElementById("cancel_rule").onclick = function () {
    /// informatiile nu se trimit nicaieri
    location.href = "/admin/CurrentDomain/Rules/index.html" + "?domain=" + getParamFromUrl("domain");
};