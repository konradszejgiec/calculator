class Calculator {
  constructor(
    leftSideActionNumbers = [],
    rightSideActionNumbers = [],
    sign = [],
    operators = {
      math: ["+", "-", "/", "*"],
      equal: ["=", "Enter"],
      clear: ["C", "Delete", "Escape"],
      dot: ["."]
    },
    results = 0
  ) {
    this.calcDiv = document.querySelector(".panel");
    this.resultPanel = document.querySelector(".result");
    this.resultPanel.textContent = "0";
    this.leftSideActionNumbers = leftSideActionNumbers;
    this.rightSideActionNumbers = rightSideActionNumbers;
    this.sign = sign;
    this.operators = operators;
    this.results = results;
    this.calcDiv.addEventListener(
      "click",
      this.executeMathOperation.bind(this)
    );
    window.addEventListener("keydown", this.executeMathOperation.bind(this));
  }

  executeMathOperation(e) {
    //checking result for infinity and NaN
    if (this.results === Infinity || isNaN(this.results)) {
      this.results = 0;
      if (
        this.leftSideActionNumbers[0] == "Infinity" ||
        isNaN(this.leftSideActionNumbers[0])
      ) {
        this.reset();
      }
    }
    //checking type of event
    this.event = e.type === "keydown" ? e.key : e.target.textContent;
    //checking for string || number
    this.number =
      this.checkOperators(this.event, this.operators.math.concat(this.operators.clear, this.operators.equal, this.operators.dot)) ?
      this.event :
      Number(this.event);
    //checking target
    if ((isNaN(this.number) && typeof this.number !== "string") || e.target.className.includes("result")) return;
    //checking equality flag
    if (this.equalityFlag === false) {
      if (
        this.checkOperators(this.number, this.operators.math.concat(this.operators.equal, this.operators.clear))
      ) {
        this.rightSideActionNumbers = [];
        this.leftSideActionNumbers = [this.results];
        this.resultPanel.textContent = this.results;
      } else this.reset();
      this.equalityFlag = true;
    }
    //checking result
    if (
      this.leftSideActionNumbers.length === 0 &&
      this.rightSideActionNumbers.length === 0 &&
      this.sign.length === 0 &&
      this.results === 0
    ) {
      this.resultPanel.textContent = "";
    }
    //pushing to array and result panel
    this.resultPanel.textContent =
      this.resultPanel.textContent === "0" &&
      this.leftSideActionNumbers.length === 0 ?
      this.number :
      this.resultPanel.textContent + this.number;
    this.pushToArray();
    //checking for operation
    if (this.sign.length > 1) {
      if (this.rightSideActionNumbers.length === 0) {
        this.sign = [this.number];
        this.resultPanel.textContent =
          this.leftSideActionNumbers.join("") + this.number;
      } else {
        this.calc(this.equalityFlag, this.leftSideActionNumbers, this.rightSideActionNumbers, this.sign)
        this.leftSideActionNumbers = [this.results];
        this.rightSideActionNumbers = [];
        this.pushToArray();
        this.sign = [];
        this.sign = [this.event];
        this.resultPanel.textContent = this.checkingNanAndInfinity(this.results) ?
          "Nie dziel przez 0" :
          this.results + this.sign;
      }
    }
    //reset
    if (this.checkOperators(this.number, this.operators.clear)) {
      this.reset();
      this.results = 0;
    }
    //equality
    if (this.checkOperators(this.number, this.operators.equal)) {
      this.results =
        this.leftSideActionNumbers.length > 0 &&
        this.rightSideActionNumbers.length === 0 &&
        this.sign.length === 0 ?
        this.leftSideActionNumbers.join("") :
        Number(this.results).toFixed();

      if (this.rightSideActionNumbers.length === 0) {
        this.rightSideActionNumbers[0] =
          this.sign.includes("+") || this.sign.includes("-") ? [] : 1;
      }

      this.calc(this.equalityFlag, this.leftSideActionNumbers, this.rightSideActionNumbers, this.sign)
      this.reset();
      this.resultPanel.textContent = this.checkingNanAndInfinity(this.results) ?
        "Nie dziel przez 0" :
        this.results;
      this.leftSideActionNumbers = [this.results];
      this.equalityFlag = false;
    }
  }

  pushToArray() {
    if (
      this.sign.length === 0 &&
      !this.checkOperators(this.number, this.operators.math.concat(this.operators.equal))
    ) {
      this.leftSideActionNumbers.push(this.number);
    }
    if (
      this.sign.length === 1 &&
      !this.checkOperators(this.number, this.operators.math.concat(this.operators.equal))
    ) {
      this.rightSideActionNumbers.push(this.number);
    }
    if (this.checkOperators(this.number, this.operators.math)) {
      this.sign.push(this.number);
    }
  }

  calc(flag, lefSideNumbers, rightSideNumbers, sign) {
    flag = flag
    flag = true;
    const numbersLeft = lefSideNumbers.join("") * 1;
    const numbersRight = rightSideNumbers.join("") * 1;
    this.results = sign.includes("*") ?
      numbersLeft * numbersRight :
      sign.includes("+") ?
      numbersLeft + numbersRight :
      sign.includes("-") ?
      numbersLeft - numbersRight :
      sign.includes("/") ?
      numbersLeft / numbersRight :
      this.number.length > 0 ?
      lefSideNumbers.join("") :
      0;
  }

  reset() {
    this.resultPanel.textContent = "0";
    this.leftSideActionNumbers = [];
    this.rightSideActionNumbers = [];
    this.sign = [];
  }

  correct() {
    if (this.event === "Backspace") {}
  }

  checkOperators(text, operator) {
    operator = operator;
    return operator.includes(text);
  }

  checkingNanAndInfinity(variable) {
    return !isFinite(variable) || isNaN(variable);
  }
}

const newCalculator = new Calculator();
