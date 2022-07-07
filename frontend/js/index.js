import {
  addNewAccount,
  handleNewTransaction,
  updateAccounts
} from "./helpers/Common.js";

import {handleCategories, setCategories, showCategoriesInput} from "./helpers/Category.js"

$(() => {
  //Start coding here!
  const newAccountForm = $("#newAccount-form");
  const newAccountText = $("#newAccount");
  const accountSelect = $("#accountSelect");
  const fromSelect = $("#fromSelect");
  const toSelect = $("#toSelect");
  const filterSelect = $("#filterSelect");
  const accountSummary = $('#account-summary')
  const categoryForm = $('#category-form')
  const categorySelector = $("#category-selector");


  updateAccounts(accountSelect, fromSelect, toSelect, filterSelect, accountSummary);
  setCategories();

  newAccountForm.submit((e) => {
    e.preventDefault();
    addNewAccount(newAccountText);

    setTimeout(() => {
      updateAccounts(accountSelect, fromSelect, toSelect, filterSelect, accountSummary);
    }, 100);

  });

  $(".transactions").change(() => {
    handleNewTransaction()
  });

  categorySelector.change(() => {
    showCategoriesInput();
  });
  
  categoryForm.submit((e)=>{
    e.preventDefault();
    handleCategories()
    
    setTimeout(() => {
      setCategories()
      showCategoriesInput()
    }, 150);


  })




  




  

});
