import "./src/style.css";
import { generateReturnsArray } from "./src/investimentGoals.js";
import { Chart } from "chart.js/auto";
import { createTable } from "./src/table.js";

const form = document.getElementById("investment-form");
const clearButton = document.getElementById("clear-button");
const finalMoneyChart = document.getElementById("final-money-distribution");
const progressionChart = document.getElementById("progression");
let doughnutChartReference = {};
let progressionChartReference = {};

const columnsArray = [
  { columnLabel: "Mês", acessor: "month" },
  {
    columnLabel: "Total investido",
    acessor: "investedAmount",
    format: (numberInfo) => formatLocaleString(numberInfo),
  },
  {
    columnLabel: "Rendimento mensal",
    acessor: "interestReturns",
    format: (numberInfo) => formatLocaleString(numberInfo),
  },
  {
    columnLabel: "Rendimento total",
    acessor: "totalInterestReturns",
    format: (numberInfo) => formatLocaleString(numberInfo),
  },
  {
    columnLabel: "Quantia total",
    acessor: "totalAmount",
    format: (numberInfo) => formatLocaleString(numberInfo),
  },
];

function formatCurrency(value) {
  return value.toFixed(2);
}

function formatLocaleString(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderProgression(e) {
  toggleResults("show");
  clearTable();
  scroll("reset");

  e.preventDefault();
  resetCharts();

  if (document.querySelectorAll(".error").length > 0) {
    return;
  }
  const startingAmount = Number(
    document.getElementById("starting-amount").value.replace(",", ".")
  );
  const additionalContribution = Number(
    document.getElementById("additional-contribution").value
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(
    document.getElementById("return-rate").value.replace(",", ".")
  );
  const returnRatePeriod = document.getElementById("return-rate-period").value;
  const taxRate = Number(
    document.getElementById("tax-rate").value.replace(",", ".")
  );

  const returnsArray = generateReturnsArray(
    startingAmount,
    additionalContribution,
    timeAmount,
    timeAmountPeriod,
    returnRate,
    returnRatePeriod,
    taxRate
  );

  const finalInvestmentObject = returnsArray[returnsArray.length - 1];

  doughnutChartReference = new Chart(finalMoneyChart, {
    type: "doughnut",
    data: {
      labels: ["Total investido", "Rendimento", "Imposto"],
      datasets: [
        {
          data: [
            formatCurrency(finalInvestmentObject.investedAmount),
            formatCurrency(finalInvestmentObject.deductedInterestReturns),
            formatCurrency(finalInvestmentObject.taxValue),
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  progressionChartReference = new Chart(progressionChart, {
    type: "bar",
    data: {
      labels: returnsArray.map((investmentObject) => investmentObject.month),
      datasets: [
        {
          label: "Total investido",
          data: returnsArray.map((investmentObject) =>
            formatCurrency(investmentObject.investedAmount)
          ),
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "Retorno do Investimento",
          data: returnsArray.map((investmentObject) =>
            formatCurrency(investmentObject.interestReturns)
          ),
          backgroundColor: "rgb(54, 162, 235)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });

  createTable(columnsArray, returnsArray, "results-table");
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function resetCharts() {
  if (
    !isObjectEmpty(doughnutChartReference) &&
    !isObjectEmpty(progressionChartReference)
  ) {
    doughnutChartReference.destroy();
    progressionChartReference.destroy();
  }
}

function clearForm() {
  const errorMessages = document.querySelectorAll("p.error-message");
  const errorClassList = document.querySelectorAll(".error");

  errorMessages.forEach((msg) => msg.remove());

  errorClassList.forEach((element) => element.classList.remove("error"));

  form.reset();

  resetCharts();
}

function clearTable() {
  const tableElement = document.getElementById("results-table");
  tableElement.innerHTML = "";
}

function clearResults() {
  clearForm();
  clearTable();
  toggleResults("hide");
}

function scroll(direction) {
  const mainElement = document.querySelector("main");
  const carouselElement = document.getElementById("carousel-container");
  const previousButton = document.getElementById("slide-arrow-previous");
  const nextButton = document.getElementById("slide-arrow-next");

  if (direction === "right") {
    carouselElement.scrollLeft += mainElement.clientWidth;
    nextButton.classList.add("hidden");
    previousButton.classList.remove("hidden");
  } else if (direction === "left") {
    carouselElement.scrollLeft -= mainElement.clientWidth;
    nextButton.classList.remove("hidden");
    previousButton.classList.add("hidden");
  } else if (direction === "reset") {
    carouselElement.scrollLeft -= 999999;
    nextButton.classList.remove("hidden");
    previousButton.classList.add("hidden");
  }
}

function toggleResults(att) {
  const resultContainer = document.getElementById("result-container");
  const resultPlaceholder = document.getElementById("result-placeholder");

  if (att === "show") {
    resultContainer.classList.remove("hidden");
    resultPlaceholder.classList.add("hidden");
  } else if (att === "hide") {
    resultContainer.classList.add("hidden");
    resultPlaceholder.classList.remove("hidden");
  } else {
    resultContainer.classList.toggle("hidden");
    resultPlaceholder.classList.toggle("hidden");
  }
}

function validateInput(e) {
  if (e.target === "") {
    return;
  }
  const parentElement = e.target.parentElement;
  const grandParentElement = e.target.parentElement.parentElement;
  const inputValue = e.target.value.replace(",", ".");

  if (
    (isNaN(inputValue) || Number(inputValue) <= 0) &&
    !parentElement.classList.contains("error")
  ) {
    const errorTextElement = document.createElement("p");
    errorTextElement.innerText = "Insira um valor numérico e maior que zero";
    errorTextElement.classList.add(
      "text-red-700",
      "error-message",
      "text-shadow-2xs",
      "text-shadow-slate-300",
      "font-semibold"
    );

    parentElement.classList.add("error");
    grandParentElement.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains("error") &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove("error");
    grandParentElement.querySelector("p.error-message").remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("id")) {
    formElement.addEventListener("blur", validateInput);
  }
}

const mainElement = document.querySelector("main");
const carouselElement = document.getElementById("carousel-container");
const previousButton = document.getElementById("slide-arrow-previous");
const nextButton = document.getElementById("slide-arrow-next");

nextButton.addEventListener("click", () => {
  scroll("right");
});

previousButton.addEventListener("click", () => {
  scroll("left");
});

form.addEventListener("submit", renderProgression);
clearButton.addEventListener("click", clearResults);
