let toggled = false;

function playAudio(effect) {
  const slide = new Audio("./assets/slide.mp3");
  const click = new Audio("./assets/click.mp3");
  switch (effect) {
    case "slide":
      slide.play();
      break;
    case "click":
      click.play();
      break;
  }
}

function buttonClick() {
  playAudio("click");
}

function toggleSlider() {
  playAudio("slide");
  if (toggled === false) {
    toggled = true;
    document
      .getElementsByClassName("slider-round")[0]
      .classList.add("toggled-on");
    calc.disable(true);
  } else {
    toggled = false;
    document
      .getElementsByClassName("slider-round")[0]
      .classList.remove("toggled-on");
    calc.disable(false);
  }
}

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", () => playAudio("click"));
});

class Calculator {
  constructor() {
    this.number = [];
    this.equation = [];
    this.total = "";
    this.disabled = false;
  }
  createEquation(val) {
    if (this.disabled === true) {
      return;
    }
    if (this.total) {
      this.total = "";
      this.clear();
    }
    this?.number.push(val);

    document.getElementsByClassName("equation-para")[0].innerHTML =
      this.equation.join("") + this.number.join("");

    // this.display(this.equation.join("") + this.number.join(""));
  }
  addOperator(op) {
    if (this.disabled === true) {
      return;
    }

    if (this.total) {
      this.equation = [];
      this.number = [];
      this.equation.push(parseInt(this.total));
      this.total = "";
    }

    if (this.number.length > 0) {
      this.equation.push(parseInt(this.number.join("")));
      this.number = [];
    }

    // Replace operator if there is already one.

    const lastInArray = this.equation.slice(-1);
    if (
      lastInArray == "*" ||
      lastInArray == "/" ||
      lastInArray == "+" ||
      lastInArray == "-"
    ) {
      this.equation[this.equation.length - 1] = op;
      document.getElementsByClassName("equation-para")[0].innerHTML =
        this.equation.join("");
      return;
    }

    this.equation.push(op);

    document.getElementsByClassName("equation-para")[0].innerHTML =
      this.equation.join("");
  }
  disable(condition) {
    if (condition == true) {
      this.disabled = true;
      this.clear();
    } else {
      this.disabled = false;
    }
  }
  error() {
    this.clear();
    document.getElementsByClassName("equation-para")[0].innerHTML = "error";
  }

  display(info) {
    document.getElementsByClassName("equation-para")[0].innerHTML = info;
  }

  clear() {
    this.number = [];
    this.equation = [];
    // this.total = "";
    document.getElementsByClassName("equation-para")[0].innerHTML = "";
    document.getElementsByClassName("answer-para")[0].innerHTML = "";
  }
  subtract() {
    if (this.disabled === true) {
      return;
    }
    if (this.number.length > 0) {
      this.number.pop();
      document.getElementsByClassName("equation-para")[0].innerHTML =
        this.number.join("");
    } else {
      return;
    }
  }
  getTotal() {
    if (this.disabled === true) {
      return;
    }

    if (this.equation.length === 0 || this.number.length === 0) {
      this.error();
      return;
    }

    // To prevent trailing operator
    if (!this.number) {
      this.error();
      return;
    }

    this.equation.push(parseInt(this.number.join("")));

    while (this.equation.some((e) => e === "*" || e === "/")) {
      for (let i = 0; i < this.equation.length; i++) {
        if (this.equation[i] === "*") {
          let multiplied = this.equation[i - 1] * this.equation[i + 1];
          this.equation.splice(i - 1, 3, multiplied);
        } else if (this.equation[i] === "/") {
          let divided = this.equation[i - 1] / this.equation[i + 1];
          this.equation.splice(i - 1, 3, divided);
        }
      }
    }

    while (this.equation.some((e) => e === "+" || e === "-")) {
      for (let i = 0; i < this.equation.length; i++) {
        if (this.equation[i] === "+") {
          let added = this.equation[i - 1] + this.equation[i + 1];
          this.equation.splice(i - 1, 3, added);
        } else if (this.equation[i] === "-") {
          let subtracted = this.equation[i - 1] - this.equation[i + 1];
          this.equation.splice(i - 1, 3, subtracted);
        }
      }
    }
    this.total = this.equation;
    document.getElementsByClassName("answer-para")[0].innerHTML =
      "= " + this.total;
  }
}
const calc = new Calculator();
