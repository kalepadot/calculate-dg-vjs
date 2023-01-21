const initApp = () => {
  const currentValueElem = document.querySelector(".currentvalue");
  const previousValueElem = document.querySelector(".previousvalue");
  let itemArray = [];
  const equationArray = [];
  let newNumberFlag = false;

  const inputButtons = document.querySelectorAll(".number");
  inputButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const newInput = event.target.textContent;
      if (newNumberFlag) {
        currentValueElem.value = newInput;
        newNumberFlag = false;
      } else {
        currentValueElem.value =
          currentValueElem.value == 0
            ? newInput
            : `${currentValueElem.value}${newInput}`;
      }
    });
  });

  const opButtons = document.querySelectorAll(".operator");
  opButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      //equal sign showing
      if (newNumberFlag) {
        previousValueElem.textContent = "";
        itemArray = [];
      }

      const newOperator = event.target.textContent;
      const currentVal = currentValueElem.value;

      //need number first
      if (!itemArray.length && currentVal == 0) return;

      //begin new equation
      if (!itemArray.length) {
        itemArray.push(currentVal, newOperator);
        previousValueElem.textContent = `${currentVal}
        ${newOperator}`;
        return (newNumberFlag = true);
      }

      //complete an equation
      if (itemArray.length) {
        itemArray.push(currentVal); //3rd element

        const equationObj = {
          num1: parseFloat(itemArray[0]),
          num2: parseFloat(currentVal),
          op: itemArray[1],
        };

        equationArray.push(equationObj);
        const equationString = `${equationObj["num1"]}
        ${equationObj["op"]}
        ${equationObj["num2"]}`;

        const newValue = calculate(equationString, currentValueElem);

        previousValueElem.textContent = `${newValue} ${newOperator}`;

        // start new equation
        itemArray = [newValue, newOperator];
        newNumberFlag = true;
        console.log(equationArray);
      }
    });
  });

  const equalsButton = document.querySelector(".equals");
  equalsButton.addEventListener("click", () => {
    const currentVal = currentValueElem.value;
    let equationObj;
    //pressing equals repeatedly
    if (!itemArray.length && equationArray.length) {
      const lastEquation = equationArray[equationArray.length - 1];
      equationObj = {
        num1: parseFloat(currentVal),
        num2: lastEquation.num2,
        op: lastEquation.op,
      };
    }
  });

  const clearButtons = document.querySelectorAll(".clear, .clearEntry");
  clearButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      currentValueElem.value = 0;
      if (event.target.classList.contains("clear")) {
        previousValueElem.textContent = "";
        itemArray = [];
      }
    });
  });

  const deleteButton = document.querySelector(".delete");
  deleteButton.addEventListener("click", () => {
    currentValueElem.value = currentValueElem.value.slice(0, -1);
  });

  const signChangeButton = document.querySelector(".signChange");
  signChangeButton.addEventListener("click", () => {
    currentValueElem.value = parseFloat(currentValueElem.value) * -1;
  });
};

document.addEventListener("DOMContentLoaded", initApp);

const calculate = (equation, currentValueElem) => {
  const regex = /(^[*/=])|(\s)/g;
  equation.replace(regex, "");
  const divByZero = /(\/0)/.test(equation);
  if (divByZero) return (currentValueElem.value = 0);
  return (currentValueElem.value = eval(equation));
};
