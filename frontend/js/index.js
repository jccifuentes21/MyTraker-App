import {
  addNewAccount,
  handleAddTransaction,
  handleNewTransaction,
  updateAccounts,
} from "./helpers/Common.js";

import {
  handleCategories,
  setCategories,
  showCategoriesInput,
} from "./helpers/Category.js";

$(() => {
  //Start coding here!
  const newAccountForm = $("#newAccount-form");
  const newAccountText = $("#newAccount");
  const accountSelect = $("#accountSelect");
  const fromSelect = $("#fromSelect");
  const toSelect = $("#toSelect");
  const filterSelect = $("#filterSelect");
  const accountSummary = $("#account-summary");
  const categoryForm = $("#category-form");
  const categorySelector = $("#category-selector");
  const transactionForm = $('#transaction-form')
  const transactionAmount = $('#trans-amount')
  const transactionDescription = $('#trans-description')
  let transactionType
  updateAccounts(accountSelect, fromSelect, toSelect, filterSelect, accountSummary);
  setCategories();
  
  newAccountForm.submit((e) => {
    e.preventDefault();
    addNewAccount(newAccountText);
    
    setTimeout(() => {
      updateAccounts( accountSelect, fromSelect, toSelect, filterSelect, accountSummary);
    }, 100);
    
  });
  
  $(".transactions").change(() => {
    transactionType = $('.transactions:checked')
    handleNewTransaction();
  });

  categorySelector.change(() => {
    showCategoriesInput();
  });

  categoryForm.submit((e) => {
    e.preventDefault();
    handleCategories();

    setTimeout(() => {
      setCategories();
      showCategoriesInput();
    }, 150);
  });

  transactionForm.submit((e)=>{
    e.preventDefault();

    handleAddTransaction(transactionDescription, transactionAmount, accountSelect, fromSelect, toSelect,transactionType)

    setTimeout(() => {
      
      updateAccounts( accountSelect, fromSelect, toSelect, filterSelect, accountSummary);
    }, 200);
    
  })

});
