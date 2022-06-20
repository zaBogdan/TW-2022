$(function () {
  $("#nav").load("/admin/sidebar/sidebarCurrentDomain.html");
});

function getParamFromUrl(parameter) {
  let search = window.location.search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(parameter);
}

const collection = document.getElementsByClassName("id_param");

for (const line of collection) {
  let base = line.href.slice(0, line.href.lastIndexOf("/?") + 1);
  let id = getParamFromUrl("domain");
  line.href = base + "?domain=" + id;
}

const hideAll = (class_name) => {
  const fields = document.querySelectorAll(class_name);
  fields.forEach((f) => {
    f.style.display = "none";
    f.disabled = true;
  });
};

const showAppropriate = () => {
  let result = document.getElementById("select_reward_type").value;
  hideAll(".dynamic_reward_type");
  if (result == "0") {
    hideAll(".dynamic_reward_type");
  } else if (result == "Score") {
    let fd = document.getElementById("reward_score");
    fd.style.display = "block";
    fd.disabled = false;
  } else if (result == "Achievements") {
    let fd = document.getElementById("reward_achievement");
    fd.style.display = "block";
    fd.disabled = false;
  } else if (result == "RankUp") {
    let fd = document.getElementById("reward_rank-up");
    fd.style.display = "block";
    fd.disabled = false;
  } else if (result == "RankDown") {
    let fd = document.getElementById("reward_rank-down");
    fd.style.display = "block";
    fd.disabled = false;
  }
};

const showRuleParams = () => {
  let result = document.getElementById("select_rule_type").value;
  hideAll(".dynamic_rule_type");
  if (result == "0") {
    hideAll(".dynamic_rule_type");
  } else if (result == "has_metric") {
    let fd = document.getElementById("user_has_metric");
    fd.style.display = "block";
    fd.disabled = false;
  } else if (result == "all") {
    const btn = document
      .getElementById("all_rules")
      .getElementsByClassName("add_rule_button")[0];
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
  } else if (result == "any") {
    const btn = document
      .getElementById("any_rule")
      .getElementsByClassName("add_rule_button")[0];
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
};

const addNewRuleFiled = (field_id) => {
  const btn = document
    .getElementById(field_id)
    .getElementsByClassName("add_rule_button")[0];
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
  ic1.addEventListener("click", () => {
    if (confirm("Are you sure you want to remove this rule?"))
      parent.removeChild(clone);
  });
};

const path = "/achievement/domain/" + getParamFromUrl("domain");
const achievement_list = document.getElementById("achievement_list");
const achievements = authGet(path, requestOptions);
achievements.then((response) => {
  for (const achievement of response.data.achievements) {
    const option = document.createElement("option");
    option.value = achievement["name"];
    const textNode = document.createTextNode(achievement["name"]);
    option.appendChild(textNode);
    achievement_list.appendChild(option);
  }
  const path = "/rank/domain/" + getParamFromUrl("domain");
  const rank_lists = document.getElementsByClassName("rank_list");
  const ranks = authGet(path, requestOptions);
  ranks.then((response) => {
    for (const rank of response.data.ranks) {
      for (const list of rank_lists) {
        const option = document.createElement("option");
        option.value = rank["name"];
        const textNode = document.createTextNode(rank["name"]);
        option.appendChild(textNode);
        list.appendChild(option);
      }
    }
    const path = "/event/domain/" + getParamFromUrl("domain");
    const actions_list = document.getElementById("actions_list");
    const actions = authGet(path, requestOptions);
    actions.then((response) => {
      for (const event of response.data.events) {
        const option = document.createElement("option");
        option.value = event["name"];
        const textNode = document.createTextNode(event["name"]);
        option.appendChild(textNode);
        actions_list.appendChild(option);
      }
    });
  });
});

document.getElementById("AddNewRule").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const val = {};
  data.delete("having_a_value");
  data.delete("having_the_name");
  val.name = data.get("rule_name");

  let reward = {};
  reward.type = data.get("reward_type");
  if (["RankUp", "Achievements", "RankDown"].indexOf(reward["type"]) !== -1) {
    reward.name = data.get("value");
    delete reward.score
} else {
    delete reward.name
    reward.score = data.get("value");
  }
  val.reward = reward;
  val.match = data.get("Match");
  if (val["match"] == "has_metric") val.match = "all";
  // get the <ul> entries and put them in an array
  const rules = [];
  const type = data.get("Match");
  const u = document
    .getElementsByClassName(type)[0]
    .querySelectorAll(".new_sub_rule, .user_has_metric");

  for (const el of u) {
    let rule = {};
    rule.event = el.querySelector("#actions_list").value;
    rule.comparator = el.querySelector("#comparator_list").value;
    rule.value = el.querySelector("#inpt_value").value;
    rules.push(rule);
  }
  val.rules = rules;
  const json = JSON.stringify(val);
  authPost("/rule/domain/" + getParamFromUrl("domain"), json).then(
    (response) => {
      window.location.href =
        "/admin/CurrentDomain/Rules/index.html" +
        "/?domain=" +
        getParamFromUrl("domain");
    }
  );
});

const cnclBtn = (document.getElementById("cancel_rule").onclick = function () {
  location.href =
    "/admin/CurrentDomain/Rules/index.html" +
    "?domain=" +
    getParamFromUrl("domain");
});
