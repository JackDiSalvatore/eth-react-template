// Functions
const fs = require('fs')


function calculatePayment(principal, termOfLoan, annualInterestRate) {
  var principal = parseFloat(principal)
  var termOfLoan = parseFloat(termOfLoan)
  var annualInterestRate = parseFloat(annualInterestRate)

  var percentageRate = annualInterestRate / 1200
  var lengthOfLoan = 12 * termOfLoan
  var monthlyPayment = (principal * percentageRate) / (1 - (Math.pow((1 + percentageRate) , lengthOfLoan * -1)))

  return monthlyPayment.toFixed(2)
}


// Example

var principal = (100000.00).toFixed(2) // usd
var termOfLoan = 10 // years
var annualInterestRate = (0.05).toFixed(2) // percentage
var monthlyPayment = calculatePayment(principal, termOfLoan, annualInterestRate)

console.log('==============================================')
console.log('Example\n')
console.log('Princial ($): ' + principal)
console.log('Term of Loan (Years): ' + termOfLoan)
console.log('annualInterestRate (%): ' + annualInterestRate)
console.log('\n')
console.log('monthlyPayment: ' + monthlyPayment)
console.log('==============================================')

var month = 1
var year = 1

loan_amortization = []

while (principal >= 1) {
  let interest = (0.05 * principal).toFixed(2)

  var loan = {
    'Total Remaining': (parseInt(principal) + parseInt(interest)).toFixed(2),
    'Remaining Principal': principal.toString(),
    'Remaining Interest': interest,
    'Monthly Payment': monthlyPayment,
    'Monthly Principal': '?',
    'Monthly Interest': '?',
    'Year': year,
    'Month': month,
  }

  if (0 == (month % 12)) {
    //console.log('Year: ' + year)
    year = year + 1
  }

  principal = (principal - monthlyPayment).toFixed(2)
  month = month + 1

  //loan_amortization.push(JSON.stringify(loan))
  loan_amortization.push(loan)
}

//console.log(loan_amortization)

fs.writeFile('loan_output.json', JSON.stringify(loan_amortization), (err) => {
    // In case of a error throw err.
    if (err) throw err;
})
