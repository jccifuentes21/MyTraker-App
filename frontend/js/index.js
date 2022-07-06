import {
  addNewAccount,
  handleNewTransaction,
  updateAccounts
} from "./helpers/Common.js";

$(() => {
  //Start coding here!

  const newAccountForm = $("#newAccount-form");
  const newAccountText = $("#newAccount");
  const accountSelect = $("#accountSelect");
  const fromSelect = $("#fromSelect");
  const toSelect = $("#toSelect");
  const filterSelect = $("#filterSelect");
  const accountSummary = $('#account-summary')
  const depositRadio = $('#deposit')
  const withdrawRadio = $('#withdraw')
  const transferRadio = $('#transfer')

  updateAccounts(accountSelect, fromSelect, toSelect, filterSelect, accountSummary);

  newAccountForm.submit((e) => {
    e.preventDefault();
    addNewAccount(newAccountText);

    setTimeout(() => {
      updateAccounts(accountSelect, fromSelect, toSelect, filterSelect, accountSummary);
    }, 100);

  });

  handleNewTransaction(depositRadio, transferRadio, withdrawRadio)

  

});
