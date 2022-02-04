import React, { useState } from "react";
import PrincipalGraph from "./PrincipalGraph/PrincipalGraph";
import InterestPrincipalGraph from "./InterestPrincipalGraph/InterestPrincipalGraph";

const formatDate = (date) => {
  return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
}

const Borrow = () => {
  // const { calculateRepayment } = useCalculateRepayment();
  const [principal, setPrincipal] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [years, setYears] = useState('')
  const [repayment, setRepayment] = useState(0)
  const [interest, setInterest] = useState(0)
  const [months, setMonths] = useState(0)
  const [principalBalances, setPrincipalBalances] = useState([0])
  //
  const [interestPayments, setInterestPayments] = useState(null)
  const [principalPayments, setPrincipalPayments] = useState(null)

  const calculateRepayment = (principal, interestRate, years) => {
    var principal = parseFloat(principal)
    var termOfLoan = parseFloat(years)
    var annualInterestRate = parseFloat(interestRate)
  
    var percentageRate = annualInterestRate / 1200
    var lengthOfLoan = 12 * termOfLoan
    var monthlyPayment = (principal * percentageRate) / (1 - (Math.pow((1 + percentageRate) , lengthOfLoan * -1)))
      return monthlyPayment.toFixed(2)
  }

  const calculateInterest = (principal, interestRate) => {
    var principal = parseFloat(principal)
    var annualInterestRate = parseFloat(interestRate)
  
    var interestPayment = (annualInterestRate / 12) * principal
    return interestPayment.toFixed(2)
  }

  const calculateAmortization = async (principal, interestRate, years) => {
    var month = new Date()
    var day = month.getDate()
    var repayment = calculateRepayment(principal, interestRate/100, years)

    let monthList = []
    let principalBalanceList = []

    while (principal >= 1) {
      monthList.push(formatDate(month))
      principalBalanceList.push(principal)

      principal = (principal - repayment).toFixed(2)

      if (month.getMonth() == 11) {
        month = new Date(month.getFullYear() + 1, 0, 1);
      } else {
        month = new Date(month.getFullYear(), month.getMonth() + 1, day);
      }
    }

    setMonths(monthList)
    setRepayment(repayment)
    setPrincipalBalances(principalBalanceList)
  }

  const calculatePaydown = async (principal, interestRate, years) => {
    let repayment = calculateRepayment(principal, interestRate/100, years)
    let interest = calculateInterest(principal, interestRate/100)

    let interestPaymentList = []
    let principalPaymentList = []

    while (principal >= 1) {
      interestPaymentList.push(interest)
      principalPaymentList.push((repayment - interest).toFixed(2))

      principal = (principal - repayment).toFixed(2)

      interest = calculateInterest(principal, interestRate/100)
    }

    setInterestPayments(interestPaymentList)
    setPrincipalPayments(principalPaymentList)

    setRepayment(repayment)
    setInterest(interest)
  }

  return (
    <div className="DisplayContainer">

      <div style={{display: 'flex', flexDirection: 'column'}}>
        <h3>Calculate Repayment</h3>
        <div style={{display: 'grid', gridTemplateColumns: '0.33fr 0.33fr 0.34fr'}}>
          <input type="text" placeholder="Principal" onChange={(e) => setPrincipal(e.target.value)}/>
          <input type="text" placeholder="Interest Rate %" onChange={(e) => setInterestRate(e.target.value)}/>
          <input type="text" placeholder="Years" onChange={(e) => setYears(e.target.value)}/>
        </div>
        <button
          onClick={
            () => {
              calculateAmortization(principal, interestRate, years)
              calculatePaydown(principal, interestRate, years)
            }
          }
        >
          Calculate
        </button>
        <h3>Your Monthly Repayment: ${repayment}</h3>
      </div>

      <div className="GraphContainer">
        <PrincipalGraph
          months={months}
          principalBalances={principalBalances}
        />
      </div>

      <div className="GraphContainer">
        <InterestPrincipalGraph
          months={months}
          interestPayments={interestPayments}
          principalPayments={principalPayments}
        />
      </div>
    </div>
  )
}

export default Borrow;