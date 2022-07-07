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

    case "transactions":
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

export const updateAccounts = (
  accountSel,
  fromSel,
  toSel,
  filterSel,
  accountSummary
) => {
  let usernames = [];
  let accounts = [];
  let accountsArr = [];
  $.get("http://localhost:3000/accounts", (data) => {
    accounts = data;
    data.forEach((element) => {
      usernames.push(element.username);
    });
  });

  setTimeout(() => {
    //Updating Selectors
    accountSel.html("<option selected>Choose...</option>");
    fromSel.html("<option selected>Choose...</option>");
    toSel.html("<option selected>Choose...</option>");
    filterSel.html("<option selected>Choose...</option>");
    usernames.forEach((element) => {
      accountSel.append($("<option></option>").text(element));
      fromSel.append($("<option></option>").text(element));
      toSel.append($("<option></option>").text(element));
      filterSel.append($("<option></option>").text(element));
    });

    //Updating Account Summary
    Object.values(accounts).forEach((element) => {
      const account = new Account(element.username, element.transactions);
      accountsArr.push(account);
    });

    accountSummary.html("");
    accountsArr.forEach((element) => {
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

export const handleNewTransaction = () => {
  let radioValue;

  radioValue = $(".transactions:checked").val();

  switch (radioValue) {
    case "deposit":
      $("#to-div").addClass("d-none");
      $("#from-div").addClass("d-none");
      break;

    case "withdraw":
      $("#to-div").addClass("d-none");
      $("#from-div").addClass("d-none");
      break;

    case "transfer":
      $("#to-div").removeClass("d-none");
      $("#from-div").removeClass("d-none");
      break;
  }
};
