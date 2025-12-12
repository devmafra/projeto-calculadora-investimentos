import "./src/style.css";
import { generateReturnsArray } from "./src/investimentGoals.js";

const form = document.getElementById("investment-form");
const clearButton = document.getElementById("clear-button");

function renderProgression(e) {
  e.preventDefault();
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

  console.log(returnsArray);
}

function clearForm() {
  // Seleciona todos os elementos p com a classe .error-message
  // No caso eu adicionei a todos os elementos p que contém erro a classe "error-message" para melhor controle
  const errorMessages = document.querySelectorAll("p.error-message");
  // Seleciona todos os elementos que contém a classe .error
  const errorClassList = document.querySelectorAll(".error");

  // Varre toda a lista de elementos capturados pelo querySelectorAll e aplica o .remove()
  errorMessages.forEach((msg) => msg.remove());
  // Varre toda a lista de elementos capturados pelo querySelectorAll e remove a classe "error"
  errorClassList.forEach((element) => element.classList.remove("error"));

  // Reseta todos os inputs do formulário
  form.reset();
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
    errorTextElement.classList.add("text-red-500", "error-message");

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

form.addEventListener("submit", renderProgression);
clearButton.addEventListener("click", clearForm);
