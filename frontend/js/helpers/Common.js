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
  $.get("http://localhost:3000/accounts", (data) => {
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

  let accountsRaw = [];
  let accountsArr = [];

  $.get("http://localhost:3000/accounts", (data) => {
    accountsRaw = data;
  });

  setTimeout(() => {
    //Updating Selectors
    accountSel.html("<option selected>Choose...</option>");
    fromSel.html("<option selected>Choose...</option>");
    toSel.html("<option selected>Choose...</option>");
    filterSel.html("<option selected>Choose...</option>");
    accountSummary.html("");

          
    //Creating accounts array with account class objects
    Object.values(accountsRaw).forEach((element) => {
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

  }, 100);

  // return accountsArr;
};

export const getAccounts = () =>{
  let accountsRaw = []
  let accountsArr = []

  $.get("http://localhost:3000/accounts", (data) => {
    accountsRaw = data;
  });

  setTimeout(() => {
    Object.values(accountsRaw).forEach((element)=>{
      const account = new Account (element.username, element.transaction, element.id)
      accountsArr.push(account)
    })
  }, 150);

  return accountsArr
}

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

export const handleAddTransaction = (description, amount, accountSelect, fromSelect, toSelect, type) =>{
  const accountsArr = getAccounts()
  let accountId
  let accountIdFrom = null
  let accountIdTo = null

  setTimeout(() => {
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

    postMethod('transaction', newTransaction)
    
    console.log(accountsArr)
  }, 150);
}
