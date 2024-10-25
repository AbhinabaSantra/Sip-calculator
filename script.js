//Variables and Element initialization
const Button = document.querySelectorAll(".enterButton");
const amountInput = document.querySelectorAll(".amountInput");
const timeInput = document.querySelectorAll(".timeInput");
const rateInput = document.querySelectorAll(".rateInput");
const amountInvestedPara = document.querySelectorAll(".amountInvested");
const amountFinalPara = document.querySelectorAll(".amountFinal");

//This block determines and switch between Monthly SIP and LumpSum.
document.querySelectorAll("li").forEach((listItem) => {
  listItem.addEventListener("click", () => {
    const liInnerText = listItem.innerHTML;
    pageRenderer(liInnerText);
  });
});

//This renders the page updates the CSS accordingly
function pageRenderer(LI) {
  if (LI === "Monthly SIP") {
    document.querySelector(".LumpSum").style.display = "none";
    document.querySelector(".monthlySIP").style.display = "flex";
    //prettier-ignore
    document.querySelector(".monthlyLI").style.backgroundColor ="rgb(152, 26, 43)";
    document.querySelector(".monthlyLI").style.color = "white";
    document.querySelector(".LumpSumLI").style.backgroundColor = "white";
    document.querySelector(".LumpSumLI").style.color = "rgb(152, 26, 43)";
  } else {
    document.querySelector(".LumpSum").style.display = "flex";
    document.querySelector(".monthlySIP").style.display = "none";
    document.querySelector(".monthlyLI").style.backgroundColor = "white";
    document.querySelector(".monthlyLI").style.color = "rgb(152, 26, 43)";
    //prettier-ignore
    document.querySelector(".LumpSumLI").style.backgroundColor ="rgb(152, 26, 43)";
    document.querySelector(".LumpSumLI").style.color = "white";
  }
}

amountCalculator("SIPButton");
amountCalculator("LumpSumButton");

//Determines which button is clicked and calculates accordingly
Button.forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.classList[1];
    amountCalculator(type);
  });
});

function amountCalculator(type) {
  if (type === "SIPButton") {
    const invest = amountInput[0].value;
    const time = timeInput[0].value;
    const rate = rateInput[0].value;
    const value1 = rate / 100 / 12;
    const value2 = 1 + value1;
    let mon = 12;
    let final_amount;
    let invest_amount;
    for (var k = 1; k <= time; k++) {
      let value4 = Math.pow(value2, mon + 1);
      let amount1 = value4 - 1;
      let amount2 = amount1 / value1;
      final_amount = invest * amount2 - invest;
      final_amount = Math.round(final_amount);
      invest_amount = invest * mon;
      mon += 12;
    }
    amountInvestedPara[0].innerHTML = formatNumberIndian(invest_amount);
    amountFinalPara[0].innerHTML = formatNumberIndian(final_amount);
  } else {
    const invest = amountInput[1].value;
    const time = timeInput[1].value;
    const rate = rateInput[1].value;
    const value1 = rate / 100;
    const value2 = 1 + value1;
    const amount1 = Math.pow(value2, time);
    final_amount = invest * amount1;
    final_amount = Math.round(final_amount);
    invest_amount = invest;
    amountInvestedPara[1].innerHTML = formatNumberIndian(invest_amount);
    amountFinalPara[1].innerHTML = formatNumberIndian(final_amount);
  }
}

function formatNumberIndian(number) {
  let numStr = number.toString();
  let lastThree = numStr.slice(-3); // Get the last three digits
  let otherNumbers = numStr.slice(0, -3); // Get the rest of the number

  // Add a comma after every two digits for the part before the last three digits
  if (otherNumbers !== "") {
    otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  }

  return otherNumbers + (otherNumbers !== "" ? "," : "") + lastThree;
}
