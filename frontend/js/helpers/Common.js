//common functions that can be used in different cases

export const postMethod = (endpoint, data) => {
  switch (endpoint) {
    case "accounts":
      const newAccount = data;
      $.ajax({
        type: "POST",
        url: `http://localhost:3000/${endpoint}`,
        data: JSON.stringify({ newAccount }),
        dataType: "json",
        contentType: "application/json",
      });
      break;

    case "transaction":
      const newTransaction = data;
      $.ajax({
        type: "POST",
        url: `http://localhost:3000/${endpoint}`,
        data: JSON.stringify({ newTransaction }),
        dataType: "json",
        contentType: "application/json",
      });
      break;

    case "categories":
      const newCategory = data;
      $.ajax({
        type: "POST",
        url: `http://localhost:3000/${endpoint}`,
        data: JSON.stringify({ newCategory }),
        dataType: "json",
        contentType: "application/json",
      });
      break;
  }
};

export const addNewAccount = (text) => {
  let array = [];
  $.get("http://localhost:3000/accounts").done((data) => {
    data.forEach((element) => {
      array.push(element.username);
    });

    if (array.includes(text.val())) {
      alert("Username already exists! Please choose a different username.");
    } else {
      const newAccount = new Account(text.val());
      postMethod("accounts", newAccount);
      text.val("");
    }
  });
};

export const updateAccounts = (accountSel, fromSel, toSel, filterSel, accountSummary) => {

  let accountsArr = [];

  var dataPromise = $.get("http://localhost:3000/accounts");

  dataPromise.done((data)=>{

    //Updating Selectors
    accountSel.html("<option selected>Choose...</option>");
    fromSel.html("<option selected>Choose...</option>");
    toSel.html("<option selected>Choose...</option>");
    filterSel.html("<option selected>Choose...</option>");
    accountSummary.html("");
  
          
    //Creating accounts array with account class objects
    Object.values(data).forEach((element) => {
      const account = new Account(element.username, element.transactions, element.id);
      accountsArr.push(account);
    });
  
    //Updating values of selectors, and adding accounts to accounts summary
    accountsArr.forEach((element) => {
  
      accountSel.append($("<option></option>").text(element.username));
      fromSel.append($("<option></option>").text(element.username));
      toSel.append($("<option></option>").text(element.username));
      filterSel.append($("<option></option>").text(element.username));
  
      let row = $("<tr></tr>");
      let cellUsername = $("<td></td>");
      let cellBalance = $("<td></td>");
      cellUsername.text(element.username);
      cellBalance.text(element.balance);
      row.append(cellUsername);
      row.append(cellBalance);
      accountSummary.append(row);
    });

  })

};

// export const getAccounts = async () =>{

//   let accountsArr = []

//   var dataPromise = $.get("http://localhost:3000/accounts");

//   dataPromise.done((data)=>{
    
//     Object.values(data).forEach((element)=>{
//       const account = new Account (element.username, element.transactions, element.id)
//       accountsArr.push(account)
//     })

//   })
  
//   return accountsArr
// }
export const getAccounts = async () => {
  const data = await $.get('http://localhost:3000/accounts');
  return data.map((element) => {
    return new Account(element.username, element.transactions, element.id);
  });
};

export const handleNewTransaction = () => {
  let radioValue;

  radioValue = $(".transactions:checked").val();

  switch (radioValue) {
    case "deposit":
      $("#to-div").addClass("d-none");
      $("#from-div").addClass("d-none");
      $("#account-div").removeClass('d-none')
      break;

    case "withdraw":
      $("#to-div").addClass("d-none");
      $("#from-div").addClass("d-none");
      $("#account-div").removeClass('d-none')
      break;

    case "transfer":
      $("#to-div").removeClass("d-none");
      $("#from-div").removeClass("d-none");
      $("#account-div").addClass('d-none')
      break;
  }
};

export const handleAddTransaction = async (description, amount, accountSelect, fromSelect, toSelect, type) =>{
  const accountsArr = await getAccounts()
  let accountId
  let accountIdFrom = null
  let accountIdTo = null

  // setTimeout(() => {
    //Setting the correct ID's for transactions
    accountsArr.forEach((account) =>{
      if(accountSelect.val() == account.username){
        accountId = account.id
        console.log('Account id is ', accountId)
      }
      if(fromSelect.val() == account.username && fromSelect.val() != "Choose..."){
        accountIdFrom = account.id
        console.log('Account id from is ', accountIdFrom)
      }
      if(toSelect.val() == account.username && toSelect.val() != "Choose..."){
        accountIdTo = account.id
        console.log('Account id to is ', accountIdTo)
      }
    })

    // let newTransaction = new Transaction (amount.val(),)
    let newTransaction = {accountId: accountId, accountIdFrom: accountIdFrom, accountIdTo: accountIdTo, account: accountSelect.val(), amount: amount.val(), from: fromSelect.val(), to: toSelect.val(), description: description.val(), type: type.val()}

    if(newTransaction.account == 'Choose...') newTransaction.account = 'N/A'
    if(newTransaction.from == 'Choose...') newTransaction.from = 'N/A'
    if(newTransaction.to == 'Choose...') newTransaction.to = 'N/A'

    postMethod('transaction', newTransaction)

    
    console.log(accountsArr)
  // }, 150);
}


export const transactionValidation = async (account, from, to, amount, type, category) =>{

  let accountsArr = await getAccounts()
  let accountBalanceArr = []
  let balance
  let balanceFrom
  let balanceTo

    accountsArr.forEach((element)=>{
      accountBalanceArr.push({account: element.username, balance: element.balance})
    })

    accountBalanceArr.forEach(element =>{
      if(account.val() == element.account){
        balance = element.balance
      }
      if(from.val() == element.account) balanceFrom = element.balance
      if(to.val() == element.account) balanceTo = element.balance
    })
    
    console.log(accountsArr)
    console.log(balance, ' balance of account (transfer or withdraw)')  
    console.log(balanceFrom, ' is the balance from') 
    console.log(balanceTo, ' is the balance to')
    
  switch (type.val()){
    case 'deposit':
      if (account.val() != 'Chooose...' && category.val()!= 'Choose...' &&  parseInt(amount.val()) > 0){
        return Promise.resolve(true) 
      } else alert('Invalid operation!')
      break
    case 'withdraw':
      if(account.val() != 'Choose...'&& category.val() != 'Choose...' && parseInt(amount.val()) > 0 && balance >= parseInt(amount.val())){
        return Promise.resolve(true)
      } else alert ('Invalid operation!')
      break
    case 'transfer':
      if(from.val() != to.val() && category.val()!= 'Choose...' && parseInt(amount.val()) > 0 && balanceFrom >= parseInt(amount.val()))  {        
        return Promise.resolve(true) 
      } else alert('Invalid Operation!')
      break
  }

}