function convertToMontlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

export function generateReturnsArray(
  startingAmount = 0,
  monthlyContribution = 0,
  timeAmount = 0,
  timePeriod = "monthly",
  returnRate = 0,
  returnPeriod = "monthly",
  taxRate = 0
) {
  if (timeAmount <= 0 || startingAmount <= 0) {
    throw new Error(
      "Investimento inicial e prazo devem ser preenchidos com valores maiores do que 0."
    );
  }
  // returnRate = 10;
  // taxRate = 10;
  if (returnRate < 0 || taxRate < 0 || monthlyContribution < 0) {
    throw new Error(
      "Aportes adicionais, Rentabilidade e Impostos sobre lucro não podem ser menores do que 0."
    );
  }
  const decimalReturnRate = 1 + returnRate / 100;

  const finalReturnRate =
    returnPeriod === "monthly"
      ? decimalReturnRate
      : convertToMontlyReturnRate(decimalReturnRate);

  const finalTimeAmount =
    timePeriod === "monthly" ? timeAmount : timeAmount * 12;

  const finalTaxRate = taxRate / 100;

  const referenceInvestimentObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: startingAmount,
    deductedTax: 0,
  };

  const returnsArray = [referenceInvestimentObject];

  for (let time = 1; time <= finalTimeAmount; time++) {
    const interestReturns =
      returnsArray[time - 1].totalAmount * (finalReturnRate * 1 - finalTaxRate);

    const totalAmount = interestReturns + monthlyContribution;
    const investedAmount = startingAmount + monthlyContribution * time;
    const totalInterestReturns = totalAmount - investedAmount;
    const deductedTax = finalReturnRate * finalTaxRate;

    returnsArray.push({
      investedAmount,
      interestReturns,
      totalInterestReturns,
      month: time,
      totalAmount,
      deductedTax,
    });
  }
  return returnsArray;
}
