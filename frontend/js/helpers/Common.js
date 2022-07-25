//common functions that can be used in different cases

export const domainURL = 'https://mytrakr-jc.herokuapp.com'

export const postMethod = (endpoint, data) => {
  switch (endpoint) {
    case "accounts":
      const newAccount = data;
      $.ajax({
        type: "POST",
        url: `${domainURL}/${endpoint}`,
        data: JSON.stringify({ newAccount }),
        dataType: "json",
        contentType: "application/json",
      });
      break;

    case "transaction":
      const newTransaction = data;
      $.ajax({
        type: "POST",
        url: `${domainURL}/${endpoint}`,
        data: JSON.stringify({ newTransaction }),
        dataType: "json",
        contentType: "application/json",
      });
      break;

    case "categories":
      const newCategory = data;
      $.ajax({
        type: "POST",
        url: `${domainURL}/${endpoint}`,
        data: JSON.stringify({ newCategory }),
        dataType: "json",
        contentType: "application/json",
      });
      break;
  }
};

export const addNewAccount = (text) => {
  let array = [];
  $.get("${domainURL}/accounts").done((data) => {
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

  let dataPromise = $.get("${domainURL}/accounts");

  dataPromise.done((data)=>{

    //Updating Selectors
    accountSel.html("<option selected>Choose...</option>");
    fromSel.html("<option selected>Choose...</option>");
    toSel.html("<option selected>Choose...</option>");
    filterSel.html("<option selected>All</option>");
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

export const getAccounts = async () => {
  const data = await $.get('${domainURL}/accounts');
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

export const handleAddTransaction = async (description, amount, accountSelect, fromSelect, toSelect, type, category) =>{
  const accountsArr = await getAccounts()
  let accountId
  let accountIdFrom = null
  let accountIdTo = null

    //Setting the correct ID's for transactions
    accountsArr.forEach((account) =>{
      if(accountSelect.val() == account.username && accountSelect.val() != 'Choose...'){
        accountId = account.id
      }
      if(fromSelect.val() == account.username && fromSelect.val() != "Choose..."){
        accountIdFrom = account.id
      }
      if(toSelect.val() == account.username && toSelect.val() != "Choose..."){
        accountIdTo = account.id
      }
    })

    

    let newTransaction = {accountId: accountId, accountIdFrom: accountIdFrom, accountIdTo: accountIdTo, account: accountSelect.val(), amount: amount.val(), from: fromSelect.val(), to: toSelect.val(), description: description.val(), type: type.val(), category:category.val()}

    if(newTransaction.account == 'Choose...') newTransaction.account = 'N/A'
    if(newTransaction.from == 'Choose...') newTransaction.from = 'N/A'
    if(newTransaction.to == 'Choose...') newTransaction.to = 'N/A'

    postMethod('transaction', newTransaction)

    
}

export const addToTransactionTable = (table) =>{

  let dataPromise = $.get("${domainURL}/transactions")

  dataPromise.done((transactionData) =>{
    table.html('')
    transactionData.forEach((arrayOfTransactions)=> {
      arrayOfTransactions.forEach((transaction)=>{
        let row = $("<tr></tr>")
        let idCell = $("<td></td>")
        let usernameCell = $("<td></td>")
        let typeCell = $("<td></td>")
        let categoryCell = $("<td></td>")
        let descriptionCell = $("<td></td>")
        let amountCell = $("<td></td>")
        let fromCell = $("<td></td>")
        let toCell = $("<td></td>")

        if(transaction.type == "transfer"){
          if(transaction.accountId == transaction.accountIdFrom){
            row.addClass(transaction.from)
            usernameCell.text(transaction.from)
            amountCell.text("-" + transaction.amount)
          } else {
            row.addClass(transaction.to)
            usernameCell.text(transaction.to)
            amountCell.text(transaction.amount)
          }
        } else {
          if(transaction.type == 'withdraw'){
            amountCell.text("-" + transaction.amount)
          } else amountCell.text(transaction.amount) 
          usernameCell.text(transaction.account)
          row.addClass(transaction.account)
        }


        idCell.text(transaction.id)
        typeCell.text(transaction.type)
        categoryCell.text(transaction.category)
        descriptionCell.text(transaction.description)
        fromCell.text(transaction.from)
        toCell.text(transaction.to)

        row.append(idCell)
        row.append(usernameCell)
        row.append(typeCell)
        row.append(categoryCell)
        row.append(descriptionCell)
        row.append(amountCell)
        row.append(fromCell)
        row.append(toCell)

        table.append(row)
      })
    })
    console.log(transactionData)
  })



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
    
    
  switch (type.val()){
    case 'deposit':
      if (account.val() != 'Chooose...' && category.val()!= 'Choose...' &&  parseInt(amount.val()) > 0){
        return Promise.resolve(true) 
      } else {
        if (account.val() == 'Choose...') alert ('Please choose an account!')
        if (category.val() == 'Choose...') alert ('Please choose a category!')
        if (parseInt(amount.val()) <= 0 || amount.val() == "") alert ('Please enter an amount greater than 0!')
      }
      break
    case 'withdraw':
      if(account.val() != 'Choose...'&& category.val() != 'Choose...' && parseInt(amount.val()) > 0 && balance >= parseInt(amount.val())){
        return Promise.resolve(true)
      } else {
        if (account.val() == 'Choose...') alert ('Please choose an account!')
        if (category.val() == 'Choose...') alert ('Please choose a category!')
        if (parseInt(amount.val()) <= 0 || amount.val() == "") alert ('Please enter an amount greater than 0!')
        if (balance < parseInt(amount.val())) alert ('Acccount does not have sufficient balance!')
      }
      break
    case 'transfer':
      if(from.val() != to.val() && category.val()!= 'Choose...' && parseInt(amount.val()) > 0 && balanceFrom >= parseInt(amount.val()))  {        
        return Promise.resolve(true) 
      } else {
        if (from.val() == to.val()) alert ('Accounts cannot be the same for transfer!')
        if (category.val() == 'Choose...') alert ('Please choose a category!')
        if (parseInt(amount.val()) <= 0 || amount.val() == "") alert ('Please enter an amount greater than 0!')
        if (balance < parseInt(amount.val())) alert ('Acccount does not have sufficient balance!')
      }
      break
  }

}

export const filterFunction = async (filterSelect) =>{
  const accounts = await getAccounts()
  let usernames = []

  accounts.forEach((account)=>{
    usernames.push(account.username)
  })

  usernames.forEach((username=>{
    if(filterSelect.val() == "All"){
      $("tr." + username).removeClass('d-none')
    } else if(filterSelect.val() != username){
      $("tr." + username).addClass("d-none")
    } else $("tr." + username).removeClass('d-none')
  }))

  console.log(usernames)
  // $(".")
  // console.log(filterSelect.val())
}

