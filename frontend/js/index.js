import {
  addNewAccount,
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

  updateAccounts(accountSelect, fromSelect, toSelect, filterSelect);

  newAccountForm.submit((e) => {
    e.preventDefault();
    addNewAccount(newAccountText);

    setTimeout(() => {
      updateAccounts(accountSelect, fromSelect, toSelect, filterSelect);
    }, 100);
  });
});
