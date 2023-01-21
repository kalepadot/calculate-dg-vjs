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
    });
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
