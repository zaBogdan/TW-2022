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

function hideAll(class_name) {
  const fields = document.querySelectorAll(class_name);
  fields.forEach((f) => {
    f.style.display = "none";
    f.disabled = true;
  });
}

function showAppropriate() {
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
}

function showRuleParams() {
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
}

function addNewRuleFiled(field_id) {
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
}

/** Generarea listei de achievement-uri pentru dropdownul de la reward type */
const path = "/achievement/domain/" + getParamFromUrl("domain");
const achievement_list = document.getElementById("achievement_list");
const achievements = authGet(path, requestOptions);
achievements.then((response) => {
  if (response.data.achievements.length > 0) {
    for (let i = 0; i < response.data.achievements.length; i++) {
      const option = document.createElement("option");
      option.value = response.data.achievements[i]["name"];
      const textNode = document.createTextNode(
        response.data.achievements[i]["name"]
      );
      option.appendChild(textNode);
      achievement_list.appendChild(option);
    }
  }
  /** Generarea listei de rank-uri pentru dropdownul de la reward type */
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
    /** Generarea listei de event-uri pentru dropdownul de la rule */
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
      ///
      const ruleInfo = authGet(
        "/rule/" + getParamFromUrl("rule"),
        requestOptions
      );
      ruleInfo.then((response) => {
        document.getElementById("rule_name").value = response.data.rule["name"];
        document.getElementById("select_reward_type").value =
          response.data.rule["reward"]["type"];
        showAppropriate();
        if (response.data.rule["reward"]["type"] == "Score") {
          document.getElementById("reward_score_v").value =
            response.data.rule["reward"]["score"];
        } else if (response.data.rule["reward"]["type"] == "Achievements") {
          document.getElementById("achievement_list").value =
            response.data.rule["reward"]["name"];
        } else if (response.data.rule["reward"]["type"] == "RankUp") {
          document.getElementById("rank_up_choice").value =
            response.data.rule["reward"]["name"];
        } else {
          document.getElementById("rank_down_choice").value =
            response.data.rule["reward"]["name"];
        }

        if (response.data.rule["match"] == "all") {
          document.getElementById("select_rule_type").value = "all";
          showRuleParams();
          for (const rule of response.data.rule.rule) {
            const btn = document
              .getElementById("all_rules")
              .getElementsByClassName("add_rule_button")[0];
            const field = document.getElementById("user_has_metric");
            const clone = field.cloneNode(true);
            const parent = document.getElementById("all_rules");
            clone.classList.add("new_sub_rule");
            clone.style.display = "block";
            clone.disabled = false;
            clone.querySelector("#inpt_value").value = rule["value"];
            clone.querySelector("#actions_list").value = rule["event"];
            clone.querySelector("#comparator_list").value = rule["comparator"];
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
          }
        } else {
          document.getElementById("select_rule_type").value = "any";
          showRuleParams();
          for (const rule of response.data.rule.rule) {
            const btn = document
              .getElementById("any_rule")
              .getElementsByClassName("add_rule_button")[0];
            const field = document.getElementById("user_has_metric");
            const clone = field.cloneNode(true);
            const parent = document.getElementById("any_rule");
            clone.classList.add("new_sub_rule");
            clone.style.display = "block";
            clone.disabled = false;
            clone.querySelector("#inpt_value").value = rule["value"];
            clone.querySelector("#actions_list").value = rule["event"];
            clone.querySelector("#comparator_list").value = rule["comparator"];
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
          }
        }
        /////
      });
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
    delete reward.score;
  } else {
    delete reward.name;
    reward.score = data.get("value");
  }
  val.reward = reward;
  val.match = data.get("Match");
  if (val.match == "has_metric") val.match = "all";
  const rules = [];
  const type = data.get("Match");
  const u = document
    .getElementsByClassName(type)[0]
    .querySelectorAll(".new_sub_rule, .user_has_metric");

  for(const el of u) {
    let rule = {};
    rule.event = el.querySelector("#actions_list").value;
    rule.comparator = el.querySelector("#comparator_list").value;
    rule.value = el.querySelector("#inpt_value").value;
    rules.push(rule);
  }
  val.rules = rules;
  const json = JSON.stringify(val);
  authPut("/rule/" + getParamFromUrl("rule"), json).then((response) => {
    window.location.href = "/admin/CurrentDomain/Rules/index.html"+"/?domain=" + getParamFromUrl("domain");
  });
});

const cnclBtn = (document.getElementById("cancel_rule").onclick = function () {
  location.href =
    "/admin/CurrentDomain/Rules/index.html" +
    "?domain=" +
    getParamFromUrl("domain");
});
