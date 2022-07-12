import {
  addNewAccount,
  handleAddTransaction,
  handleNewTransaction,
  updateAccounts,
  transactionValidation,
  getAccounts,
  addToTransactionTable
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
  let transactionType = $('.transactions:checked')
  const transactionData = $('#transaction-data')
  
  updateAccounts(accountSelect, fromSelect, toSelect, filterSelect, accountSummary);
  setCategories();
  addToTransactionTable(transactionData)
  
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
    }, 200);
  });

  transactionForm.submit((e)=>{
    e.preventDefault();
    const validation = transactionValidation(accountSelect, fromSelect, toSelect, transactionAmount, transactionType, categorySelector)

    validation.then((validationResult)=>{

      if (validationResult == true){
        handleAddTransaction(transactionDescription, transactionAmount, accountSelect, fromSelect, toSelect, transactionType, categorySelector)
        
        setTimeout(() => {
          updateAccounts( accountSelect, fromSelect, toSelect, filterSelect, accountSummary);      
          transactionForm.trigger('reset')
          categoryForm.trigger('reset')
          handleNewTransaction();
          addToTransactionTable(transactionData);

        }, 100);
      }

    })
  })

  

});
