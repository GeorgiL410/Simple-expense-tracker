let allExpenses = { Groceries: {}, Bills: {}, Restaurant: {}, Gaming: {}, Clothes: {}, Gifts: {}, Other: {} };

id('submit-btn').addEventListener('click', () => {
  let amount = Number(id('amount').value);
  let date = id('date').value;
  let category = id('Categories').value;
  // make sure all fields are populated, display alerts if they are 
  if (amount === '') {
    window.alert('You must select an amount!');
  } else if (date === '') {
    window.alert('You must select a date!');
  } else {
    //check if we already have a date and add the amount to it if we do
    if (allExpenses[category].hasOwnProperty(date)) {
      allExpenses[category][date] += amount;
    } else {
      allExpenses[category][date] = amount; //if not - add the date
    }
    // show the total expenses
    id('totalExpenses').innerHTML = 'Total expenses: BGN' + combineAll(allExpenses);
    // shows the last 31 days expenses
    id('last-month').innerHTML = 'Last 31 days expenses: BGN' + lastMonthCategories(allExpenses);
    //shows the last 31 days expenses split by category
    updateCategories(allExpenses);
  }
});

function lastMonthCategories(object) {
  let monthlyTotal = 0;
  //loop the categories and then the dates inside of them in order to filter the last 31 days
  for (let category in object) {
    for (let key in object[category]) {
      let date = new Date(key);
      let lastMonth = new Date();
      lastMonth.setDate(lastMonth.getDate() - 31);
      if (dateCompare(date, lastMonth)) {
        monthlyTotal += Number(object[category][key]);
      }
    }
  }
  return monthlyTotal;
}

function dateCompare(a, b) {
  if (a >= b) {
    return true;
  } else {
    return false;
  }
}

function combineAll(object) {
  let total = 0;
  for (let category in object) {
    let current = Object.values(object[category]).map(Number);
    current = current.reduce(function (a, b) {
      return a + b;
    }, 0)
    total += Number(current);
  }
  return total;
}

function updateCategories(object) {
  for (let category in object) {
    for (let key in object[category]) {
      let current = 0;
      let date = new Date(key);
      let yes = new Date();
      yes.setDate(yes.getDate() - 31);
      if (dateCompare(date, yes)) {
        current += Number(object[category][key]);
        id(category).innerHTML = `${category} - BGN ${current}`;
      }
    }
  }
}

function id(id) {
  return document.getElementById(id);
}