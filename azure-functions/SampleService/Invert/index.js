const createTrigger = require("./service-trigger");

class Inverter {
  async run(request, context) {
    let choice = "success";
    let output = {};

    const input = request.input;
    for (const [key, val] of Object.entries(input)) {
      output[key] = val.split("").reverse().join("");
    }

    context.log("Successful inversion!");

    return {
      choice,
      output,
    };
  }
}

module.exports = createTrigger(new Inverter());
