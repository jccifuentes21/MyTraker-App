import { postMethod } from "./Common.js";

export const showCategoriesInput = () =>{
  const categorySelector = $("#category-selector");
  const categoryInput = $("#add-cat-input");
  const categoryBtn = $("#add-cat-btn");
  
  if (categorySelector.val() == "Add new...") {
    categoryBtn.removeClass("d-none");
    categoryInput.removeClass("d-none");
    console.log(categorySelector.val());
  } else {
    categoryBtn.addClass("d-none");
    categoryInput.addClass("d-none");
  }
}

export const handleCategories = () => {
  let categoriesArr = [];
  const categoryInput = $("#add-cat-input");

  $.get("http://localhost:3000/categories").done((data)=>{
    data.forEach((element) => {
      categoriesArr.push(element.name);
    });

    if (categoriesArr.includes(categoryInput.val())) {
      alert("This category already exists!");
    } else {
      postMethod("categories", categoryInput.val());
      categoryInput.val("");
    }
  });

};

export const setCategories = () => {
  let categories = [];
  const categorySelector = $("#category-selector");

  categorySelector.html("<option selected>Choose...</option>");

  $.get("http://localhost:3000/categories").done((data)=>{
    data.forEach((element) => {
      categories.push(element.name);
    });

    categories.forEach((category) => {
      let option = $("<option></option");
      categorySelector.append(option.text(category));
    });
    categorySelector.append("<option>Add new...</option>");
  });

};
