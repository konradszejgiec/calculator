class Calculator {
  constructor(
    leftSideActionNumbers = [],
    rightSideActionNumbers = [],
    sign = [],
    clearKey = [],
    operators = {
      math: ["+", "-", "/", "*"],
      equal: ["=", "Enter"],
      clear: ["C", "Delete", "Escape"],
      dot: ["."],
      clearLastNumber: ["Backspace"]
    },
    results = 0
  ) {
    this.calcDiv = document.querySelector(".panel");
    this.resultPanel = document.querySelector(".result");
    this.resultPanel.textContent = "0";
    this.leftSideActionNumbers = leftSideActionNumbers;
    this.rightSideActionNumbers = rightSideActionNumbers;
    this.sign = sign;
    this.clearKey = clearKey;
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
    if (this.results === Infinity || isNaN(this.results) || this.event === "Backspace") {
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
      this.checkOperators(this.event, this.operators.math.concat(this.operators.clear, this.operators.equal, this.operators.dot, this.operators.clearLastNumber)) ?
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
    //checking result from math operation for display in result panel 
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
    //checking continuity math operation
    if (this.sign.length > 1) {
      if (this.rightSideActionNumbers.length === 0) {
        this.sign = [this.number];
        this.resultPanel.textContent =
          this.leftSideActionNumbers.join("") + this.number;
      } else {
        this.sign.pop();
        this.calc(this.equalityFlag, this.leftSideActionNumbers, this.rightSideActionNumbers, this.sign)
        this.leftSideActionNumbers = [this.results];
        this.rightSideActionNumbers = [];
        this.pushToArray();
        this.sign = [this.event];
        this.resultPanel.textContent = this.checkingNanAndInfinity(this.results) ?
          "Cannot be divided by zero" :
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
        "Cannot be divided by zero" :
        this.results;
      this.leftSideActionNumbers = [this.results];
      this.equalityFlag = false;
    }

    if (this.event === "Backspace") {
      this.correct(this.leftSideActionNumbers, this.rightSideActionNumbers, this.sign);
    }
  }

  pushToArray() {
    if (
      this.sign.length === 0 &&
      !this.checkOperators(this.number, this.operators.math.concat(this.operators.equal, this.operators.clearLastNumber))
    ) {
      this.leftSideActionNumbers.push(this.number);
    }
    if (
      this.sign.length === 1 &&
      !this.checkOperators(this.number, this.operators.math.concat(this.operators.equal, this.operators.clearLastNumber))
    ) {
      this.rightSideActionNumbers.push(this.number);
    }
    if (this.checkOperators(this.number, this.operators.math, this.operators.clearLastNumber)) {
      this.sign.push(this.number);
    }

    if (this.checkOperators(this.number, this.operators.clearLastNumber)) {
      this.clearKey.push(this.number);
    }
  }

  calc(flag, leftSideNumbers, rightSideNumbers, sign) {
    flag = flag
    flag = true;
    const numbersLeft = leftSideNumbers.join("") * 1;
    const numbersRight = rightSideNumbers.join("") * 1;
    this.results = sign.includes("*") ?
      numbersLeft * numbersRight :
      sign.includes("+") ?
      numbersLeft + numbersRight :
      sign.includes("-") ?
      numbersLeft - numbersRight :
      sign.includes("/") ?
      numbersLeft / numbersRight :
      leftSideNumbers.length > 0 ?
      leftSideNumbers.join("") :
      0;
  }

  reset() {
    this.resultPanel.textContent = "0";
    this.leftSideActionNumbers = [];
    this.rightSideActionNumbers = [];
    this.sign = [];
    this.clearKey = [];
  }

  correct(leftSideNumbers, rightSideNumbers, sign) {
    if (leftSideNumbers.length > 0 && rightSideNumbers.length === 0) {
      leftSideNumbers.pop();
      this.resultPanel.textContent = leftSideNumbers.join("");
    }
    if (rightSideNumbers.length > 0) {
      rightSideNumbers.pop();
      this.resultPanel.textContent = leftSideNumbers.join("") + sign + rightSideNumbers.join("");
    }
    if (leftSideNumbers.length === 0) {
      this.resultPanel.textContent = "0"
    }
  }

  checkOperators(inputText, operator) {
    operator = operator;
    return operator.includes(inputText);
  }

  checkingNanAndInfinity(variable) {
    return !isFinite(variable) || isNaN(variable);
  }
}

const newCalculator = new Calculator();
