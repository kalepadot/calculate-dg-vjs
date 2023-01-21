const initApp = () => {
  const currentValueElem = document.querySelector(".currentValue");
  const previousValueElem = document.querySelector(".previousValue");
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
};

document.addEventListener("DOMContentLoaded", initApp);
