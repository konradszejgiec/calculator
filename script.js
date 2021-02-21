class Calculator {
	constructor(numbers = [], numbers1 = [], sign = []) {
		this.panel = document.querySelector(".panel");
		this.result = document.querySelector(".result");
		this.result.textContent = "0";
		this.numbers = numbers;
		this.numbers1 = numbers1;
		this.sign = sign;
		this.results = 0;
		this.panel.addEventListener("click", this.addNumber.bind(this));
		window.addEventListener("keydown", this.addNumber.bind(this));
	}

	addNumber(e) {
		//checking result for infinity and NaN	
		if (this.results === Infinity || isNaN(this.results)) {
			this.results = 0;
			if ((this.numbers[0] == "Infinity") || isNaN(this.numbers[0])) {
				this.reset();
			}
		}
		//checking type of event
		this.event = e.type === "keydown" ? e.key : e.target.textContent;
		//checking number 
		if ((e.target.textContent === "+" || e.target.textContent === "-" || e.target.textContent === "/" || e.target.textContent === "*" || e.target.textContent === "." || e.target.textContent === "C" || e.target.textContent === "=") || (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*" || e.key === "." || e.key === "Delete" || e.key === "Escape" || e.key === "Enter")) {
			this.number = this.event;
		} else this.number = Number(this.event);
		//checking target	
		if (isNaN(this.number) && typeof (this.number) !== "string") return;
		//checking equality flag 
		if (this.equalityFlag === false) {
			if (this.number === "+" || this.number === "-" || this.number === "/" || this.number === "*" || this.number === "Enter" || this.number === "Delete" || this.number === "Escape") {
				this.numbers1 = [];
				this.numbers = [this.results];
				this.result.textContent = this.results;
			} else this.reset()
			this.equalityFlag = true;
		}
		//checking result 
		if (this.numbers.length === 0 && this.numbers1.length === 0 && this.sign.length === 0 && this.results === 0) {
			this.result.textContent = "";
		}
		//pushing to array and result panel 
		if (this.result.textContent === "0" && this.numbers.length === 0) {
			this.result.textContent = this.number;
		} else this.result.textContent += this.number
		this.pushToArray();
		//checking operation 
		if (this.sign.length > 1) {
			if (this.numbers1.length === 0) {
				this.sign = [this.number];
				this.result.textContent = this.numbers.join("") + this.number;
			} else {
				this.equalality();
				this.numbers = [this.results];
				this.numbers1 = [];
				this.pushToArray();
				this.sign = [];
				this.sign = [this.event];
				this.result.textContent = (!isFinite(this.results)) ? "Nie dziel przez 0" : this.results + this.sign;
			}
		}
		//reset 
		if (this.number === "C" || this.number === "Delete" || this.number === "Escape") {
			this.reset();
			this.results = 0;
		}
		//equality 
		if (this.number === "=" || this.number === "Enter") {
			if (this.numbers.length > 0 && this.numbers1.length === 0 && this.sign.length === 0) {
				this.results = this.numbers.join("");

				if (this.results >= 0) {
					this.results = Number(this.results).toFixed();
				}
			}

			if (this.numbers1.length === 0) {
				this.numbers1[0] = (this.sign[0] == "+" || this.sign[0] == "-") ? [] : 1;
			}

			this.equalality();
			this.reset();
			this.result.textContent = (!isFinite(this.results) || isNaN(this.results)) ? "Nie dziel przez 0" : this.results;
			this.numbers = [this.results];
			this.equalityFlag = false;
		}
		//console.log(this.numbers);
		//console.log(this.numbers1);
		//console.log(this.sign);
		//console.log(this.results);
	}

	pushToArray() {
		if (this.sign.length === 0 && this.number !== "+" && this.number !== "-" && this.number !== "*" && this.number !== "/" && this.number !== "=" && this.number !== "Enter") {
			this.numbers.push(this.number);
		}
		if (this.sign.length === 1 && this.number !== "+" && this.number !== "-" && this.number !== "*" && this.number !== "/" && this.number !== "=" && this.number !== "Enter") {
			this.numbers1.push(this.number);
		}
		if (this.number === "+" || this.number === "-" || this.number === "*" || this.number === "/") {
			this.sign.push(this.number);
		}
	}

	equalality() {
		this.equalityFlag = true;
		this.numbersOne = this.numbers.join("") * 1;
		this.numbersTwo = this.numbers1.join("") * 1;
		//console.log(numbers, typeof numbersOne); 
		if (this.sign[0] === "*") {
			this.results = this.numbersOne * this.numbersTwo;
		}
		if (this.sign[0] === "+") {
			this.results = this.numbersOne + this.numbersTwo;
		}
		if (this.sign[0] === "-") {
			this.results = this.numbersOne - this.numbersTwo;
		}
		if (this.sign[0] === "/") {
			this.results = this.numbersOne / this.numbersTwo;
		}
	}

	reset() {
		this.result.textContent = "0";
		this.numbers = [];
		this.numbers1 = [];
		this.sign = [];
	}

	correct() {
		if (this.event === "Backspace") {

		}
	}
}

const newCalculator = new Calculator();