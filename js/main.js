const initApp = () => {
  const currentValueElm = document.querySelector(".currentValue");
  const previousValueElm = document.querySelector(".previousValue");
  let itemArray = [];
  const equationArray = [];
  let newNumberFlag = false;

  const inputButtons = document.querySelectorAll(".number");
  inputButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const newInput = event.target.textContent;
      if (newNumberFlag) {
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", initApp);
