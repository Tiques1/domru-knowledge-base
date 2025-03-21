class Instruction {
  /**
   * @constructor
   * @param {string} key
   * @param {Option[]} branches
   * @param {string[]} instructions
   */
  constructor(key, file) {
    this.key = key;
    this.file = file;
  }
}

class Option {
  /**
   * @constructor
   * @param {string} key
   * @param {Option[]} branches
   * @param {Instruction[]} instructions
   */
  constructor(key, branches, instructions) {
    this.key = key;
    this.branches = branches;
    this.instructions = instructions;
  }
}

class Main {
  // All these params is pathes
  constructor(
    firstOptions,
    secondaryOptions,
    sourceHTMLInstructions,
    sourceImages
  ) {
    this.firstOptions = firstOptions;
    this.secondaryOptions = secondaryOptions;
    this.sourceHTMLInstructions = sourceHTMLInstructions;
    this.sourceImages = sourceImages;
    this.baseOptions = [];
    this.makeBaseOptions();
  }

  makeBaseOptions() {
    fetch(this.firstOptions)
      .then((responce) => responce.text())
      .then((text) => {
        var json = JSON.parse(text);
        Object.keys(json).forEach(function (key) {
          var options = json[key]["Варианты"];
          var instructions = json[key]["Инструкции"];
          var opt = new Option(key, options, instructions);
          this.baseOptions.append(opt);
        });
      });
  }
}

var main = new Main(
  "problems.json",
  "diagnostics/diagnostics.json",
  "diagnostics/instructions"
);
