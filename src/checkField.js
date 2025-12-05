import predicate from "predicate";
import { isObject } from "./utils";

import { AND, NOT, OR } from "./constants";

const doCheckField = (fieldVal, rule) => {
  if (isObject(rule)) {
    return Object.keys(rule).every(p => {
      let subRule = rule[p];
      if (p === OR || p === AND) {
        if (Array.isArray(subRule)) {
          if (p === OR) {
            return subRule.some(rule => doCheckField(fieldVal, rule));
          } else {
            return subRule.every(rule => doCheckField(fieldVal, rule));
          }
        } else {
          return false;
        }
      } else if (p === NOT) {
        return !doCheckField(fieldVal, subRule);
      } else if (predicate[p]) {
        // The 'matches' predicate expects (regex, value) instead of (value, regex)
        if (p === "matches") {
          return predicate[p](subRule, fieldVal);
        }
        return predicate[p](fieldVal, subRule);
      } else {
        return false;
      }
    });
  } else {
    return predicate[rule](fieldVal);
  }
};

export default function checkField(fieldVal, rule) {
  return doCheckField(fieldVal, rule);
}
