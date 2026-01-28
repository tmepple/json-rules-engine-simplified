const Engine = require("./lib/index.js").default;

let rules = [
  {
    conditions: {
      firstName: "empty"
    },
    event: {
      type: "remove",
      params: {
        field: "password"
      }
    }
  }
];

/**
 * Setup a new engine
 */
let engine = new Engine(rules);

let formData = {
  lastName: "Smit"
};

// Run the engine to evaluate
engine.run(formData).then(events => {
  // run() returns remove event
  events.map(event => console.log(event.type));
});
