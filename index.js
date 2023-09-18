
//.............................Start Submit Form Function......................................

document.querySelector('#ewallet-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const type = document.querySelector('.add__type').value;
  const desc = document.querySelector('.add__description').value;
  const value = document.querySelector('.add__value').value;


  if (desc && value) {
    addItems(type, desc, value);
    resetForm();
  } else {
    alert('please enter the value')
  }


});



// Add item in UI when it will submit form
function addItems(type, desc, value) {

  const time = getFormattedTime();

  const newHtml = `
  
  <div class="item">

    <div class="item-description-time">
      <div class="item-description">
        <p>${desc}</p>
      </div>
      <div class="item-time">
        <p>${time}</p>
      </div>
    </div>

    <div class="item-amount ${type == '+' ? 'income-amount' : 'expense-amount'}">
      <p>${type}$${value}</p>
    </div>

  </div>
  
  `
  const collection = document.querySelector('.collection');
  collection.insertAdjacentHTML('afterbegin', newHtml);

  addItemsToLS(desc, time, type, value);


  showTotalIncome()
  showTotalExpense()

}
//.............................End Submit Form Function......................................





//.............................Start Reset Form Function ......................................
function resetForm() {
  document.querySelector('.add__type').value = '+';
  document.querySelector('.add__description').value = '';
  document.querySelector('.add__value').value = '';

}

//.............................End Reset Form Function ......................................





//.............................Start Get Formatted Time Function ......................................

function getFormattedTime() {
  const now = new Date().toLocaleTimeString('en-us', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const date = now.split(',')[0].split(' ');
  const time = now.split(',')[1];
  const formattedTime = `${date[1]} ${date[0]} ${time}`;

  return formattedTime;
}
//.............................End Get Formatted Time ......................................






//.............................Start Store data into LocalStorage......................................


function getItemsFromLS() {
  let items = localStorage.getItem('items');
  if (items) {
    items = JSON.parse(items);
  } else {
    items = [];
  }
  return items;
}


function addItemsToLS(desc, time, type, value) {
  let items = getItemsFromLS();
  items.push({ desc, time, type, value })

  localStorage.setItem('items', JSON.stringify(items));

}
//.............................End Store data into LocalStorage......................................





//.............................Start Show data from LocalStorage.....................................

showItems();

function showItems() {
  let items = getItemsFromLS();
  const collection = document.querySelector('.collection');

  for (let item of items) {
    const newHtml = `
  
  <div class="item">

    <div class="item-description-time">
      <div class="item-description">
        <p>${item.desc}</p>
      </div>
      <div class="item-time">
        <p>${item.time}</p>
      </div>
    </div>

    <div class="item-amount ${item.type == '+' ? 'income-amount' : 'expense-amount'}">
      <p>${item.type}$${item.value}</p>
    </div>

  </div>
  
  `
    collection.insertAdjacentHTML('afterbegin', newHtml);
  }

}

//.............................End Show data from LocalStorage......................................





//.............................Start Calculate total Incomes and Expenses Function......................................

showTotalIncome();

function showTotalIncome() {
  let items = getItemsFromLS();
  let totalIncome = 0;

  for (let item of items) {
    if (item.type === '+') {
      totalIncome += parseInt(item.value);
    }
  }

  document.querySelector('.income__amount p').innerText = `$${totalIncome}`;

}




showTotalExpense();

function showTotalExpense() {
  let items = getItemsFromLS();
  let totalExpenses = 0;
  for (let item of items) {
    if (item.type === '-') {
      totalExpenses += parseInt(item.value);
    }
  }


  document.querySelector('.expense__amount p').innerText = `$${totalExpenses}`;

}

//.............................End Calculate total Incomes and Expenses Function......................................




