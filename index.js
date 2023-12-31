let sumOfDeposits = 0,
  sumOfWithdrawals = 0,
  balance = 0,
  savings = 0;
  input = document.getElementById('input');
const transactions = [];

function deposit(account) {
  const deposit = Number(input.value);

  if (deposit > 0) {
    if (account === 'balance') {
      balance += deposit;
      transactions.push({date: currentDate(), description: 'Deposit', amount: '$ ' + deposit, balance: '$ ' + balance, savings: '$ ' + savings});
      sumOfDeposits += deposit;
    } else if (account === 'savings' && balance >= deposit) {
      balance -= deposit;
      savings += deposit;
      transactions.push({date: currentDate(), description: 'Deposit To Savings', amount: '$ ' + deposit, balance: '$ ' + balance, savings: '$ ' + savings});
    } else if (account === 'savings' && balance > 0) {
      alert('Transaction Denied (Not enough money in your balance account.)');
    } else if (balance === 0) {
      alert('Transaction Denied (No money in the balance account.)');
    }
  
    render();
  } else {
    alert('Invalid input: The sum must be a number that is greater than 0.');
  }
}

function withdraw(account) {
  const withdrawal = Number(input.value);

  if (withdrawal > 0) {
    if (account === 'balance') {
      if (balance - withdrawal >= 0) {
        balance -= withdrawal;
        sumOfWithdrawals += withdrawal;
        transactions.push({date: currentDate(), description: 'Withdrawal', amount: '$ ' + withdrawal, balance: '$ ' + balance, savings: '$ ' + savings});
      } else if (balance > 0) {
        alert('Transaction Denied (Not enough money in your balance account.)');
      } else if (balance === 0) {
        alert('Transaction Denied (No money in the balance account.)');
      }
    } else if (account === 'savings') {
      if (savings - withdrawal >= 0) {
        savings -= withdrawal;
        balance += withdrawal;
        transactions.push({date: currentDate(), description: 'Withdrawal From Savings', amount: '$ ' + withdrawal, balance: '$ ' + balance, savings: '$ ' + savings});
      } else if (savings > 0) {
        alert('Transaction Denied (Not enough money in your savings account.)');
      } else if (savings === 0) {
        alert('Transaction Denied (No money in the savings account.)');
      }
    }
  
    render();
  } else {
    alert('Invalid input: The sum must be a number that is greater than 0.');
  }
}

function currentDate() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const date = new Date();
  const currentDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  const currentTime = `${date.toTimeString().split(' ')[0]}`;

  return `${currentDate} At ${currentTime}`;
}

function showPassword() {
  const inputAttribute = document.getElementById('password-input');

  inputAttribute.type === 'password' ? inputAttribute.type = 'text' : inputAttribute.type = 'password';
  document.getElementById('checkbox-text').innerHTML = inputAttribute.type === 'password' ? ' Show Password' : ' Hide Password';
}

function displaySecondDiv() {
  const continueButton = document.getElementById('continue-button'),
    firstDiv = document.getElementById('first-div'),
    secondDiv = document.getElementById('second-div');
    
  firstDiv.style.display = 'none';
  secondDiv.classList.remove('d-none');
}

function viewTransactions() {
  if (transactions.length !== 0) {
    const transactionstable = document.getElementById('transactions-table'),
    transactionsButton = document.getElementById('transactions-button');
  
    if (transactionstable.classList.contains('d-none')) {
      transactionstable.classList.remove('d-none');
      transactionsButton.innerText = 'Hide Transactions';
    } else {
      transactionstable.classList.add('d-none');
      transactionsButton.innerText = 'Show Transactions';
    }
  } else {
    alert('No Past Transactions.');
  }
}

function render() {
  const balanceElement = document.getElementById('balance'),
    savingsElement = document.getElementById('savings'),
    depositsSumElement = document.getElementById('sum-of-deposits'),
    withdrawalsSumElement = document.getElementById('sum-of-withdrawals');

    balanceElement.innerText = `$ ${balance}`;
    savingsElement.innerText = `$ ${savings}`;
    depositsSumElement.innerText = `$ ${sumOfDeposits}`;
    withdrawalsSumElement.innerText = `$ ${sumOfWithdrawals}`;
    
    renderTableBody();
}

function renderTableBody() {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  transactions.forEach( (transaction) => {
    const row = tableBody.insertRow(0);
    let i = 0;
    for (rowCellInfo in transaction) {
      const rowCell = row.insertCell(i);
      rowCell.innerHTML = `${transaction[rowCellInfo]}`;
      i++;
    }
  })
}

render();