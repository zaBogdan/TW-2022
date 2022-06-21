const { debug } = require("shared").utils.logging;
const evaluateExp = (left, op, right) => {
  switch (op) {
    case "eq":
      return left.data.length === right;
    case "neq":
      return left.data.length !== right;
    case "lte":
      return left.data.length <= right;
    case "gte":
      return left.data.length >= right;
    case "lt":
      return left.data.length < right;
    case "gt":
      return left.data.length > right;
    // here we can easily add more operators, that can be also time based
    case "time.gte":
    default:
      return false;
  }
};

const evaluateRule = async (rule, user) => {
  const type = rule.match === "all" ? "&&" : "||";

  for (const r of rule.rule) {
    let result = false;
    if (user.events[r.event] !== undefined) {
      result = evaluateExp(user.events[r.event], r.comparator, r.value);
    }

    if (result === false && type === "&&") {
      debug(`[-] Rule '${rule.name}' failed`);
      return false;
    }

    if (result === true && type === "||") {
      debug(`[+] Rule '${rule.name}' passed`);
      return true;
    }
  }
  if (type === "&&") {
    debug(`[+] Rule '${rule.name}' passed`);
    return true;
  }
  debug(`[+] Rule '${rule.name}' failed`);
  return false;
};
exports.execute = async (message) => {
  for (const rule of message.rules) {
    const success = await evaluateRule(rule, message.listener);
    if (success === false) continue;

    if (rule.reward.type === "Score") {
      message.listener.score += rule.reward.score;
    } else if (rule.reward.type === 'Achievements') {
      if (!message.listener.achievements.includes(rule.reward.objectId)) {
        message.listener.achievements.push(rule.reward.objectId);
        if(rule.reward.score) {
          message.listener.score += rule.reward.score;
        }
      }
    } else if (rule.reward.type.startsWith('Rank')) {
      message.listener.rank = rule.reward.objectId;
      if (rule.reward.type === "RankUp") {
        message.listener.latestMessage = 'Congratulations! You have reached the next rank!';
        if(rule.reward.score) {
          message.listener.score += rule.reward.score;
        }
      } else {
        message.listener.latestMessage = 'Unfortunately you have demoted to previous rank!';
        if(rule.reward.score) {
          message.listener.score -= rule.reward.score;
        }
      }
    }
  }
  return message;
};
