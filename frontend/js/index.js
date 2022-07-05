import { addNewAccount, postMethod } from "./helpers/Common.js";

$(() => {
  //Start coding here!
  const newAccountForm = $("#newAccount-form");
  const newAccountText = $("#newAccount");
  
  let usernamesArr = [];
  $.get("http://localhost:3000/accounts", (data) => {
    usernamesArr = data
  });
  
  newAccountForm.click((e) => {
    e.preventDefault();
    
    addNewAccount(usernamesArr, newAccountText);
  });
});
