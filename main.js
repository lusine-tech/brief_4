import {
  personList
} from "./data.js";

console.log(personList);
//window.location.remove("users");
let personFromStorage = getFromStorage("users") || saveToStorage(personList);
// console.log(...personList);
let dynamicData = [...personFromStorage];

initList();

function initList() {
  let wrapper = document.querySelector(".wrapper");
  personFromStorage.forEach(function (data) {
    wrapper.innerHTML += `<div class="block">
    <img src="./img/cv_icon.png" alt="" >
    <div class="box"><a href="#bioPage?id=${data.id}" >${data.firstName} ${data.lastName}</a></div>
</div>`;
  });
}

let wrapper = document.querySelector(".wrapper");
wrapper.innerHTML += `<div class="block">
<img src="./img/cv_icon.png" alt="" >
<div class="box"><a href="#add-new">+Add New</a></div>
</div>`;

window.addEventListener("hashchange", function () {
  console.log("The has changed");
  console.log(window.location.hash);
  let block = document.querySelector(".block");
  let personalPage = document.querySelector(".personal-page");
  let wrapper = document.querySelector(".wrapper");
  let addNew = document.querySelector(".add-new");

  if (window.location.hash.includes("bioPage")) {
    wrapper.classList.add("hidden");
    personalPage.classList.remove("hidden");
    //vercnel hash id , personList[id]
    let hash = window.location.hash.split("=");
    let id = hash[1];
    const userObj = getUserById(id);
    addUserData(userObj);
  } else if (window.location.hash.includes("add-new")) {
    wrapper.classList.add("hidden");
    personalPage.classList.add("hidden");
    addNew.classList.remove("hidden");
  } else {
    block.classList.remove("hidden");
    personalPage.classList.add("hidden");
  }

});

function getUserById(id) {
  const personObj = personFromStorage.find(function (person) {
    return person.id == id;
  });
  return personObj;
}

document.querySelector(".add-new-user").addEventListener("click", function () {
  alert("clicked");
  let name = document.getElementById("name-field").value;
  let lastName = document.getElementById("lastName-field").value;
  let email = document.getElementById("email").value;
  let id = "id_" + new Date().valueOf();
  let newUser = {
    id: id,
    firstName: name,
    lastName: lastName,
    email: email,
  };


  console.log("newUser==", newUser);
  personFromStorage.push(newUser);
  console.log("personFromStorage=", personFromStorage);
  saveToStorage(personFromStorage);
  window.location.replace("./index.html");
});

function addUserData(programmer) {
  document.querySelector(".name").innerHTML = programmer.firstName;
  document.querySelector(".surname").innerHTML = programmer.lastName;
  document.querySelector(".email").innerHTML = "email:" + programmer.email;
  document.querySelector(".profession").innerHTML = programmer.profession;
}

function saveToStorage(data) {
  let stringifiedData = JSON.stringify(data);
  window.localStorage.setItem("users", stringifiedData);
  return data;
}

function getFromStorage(users) {
  let dataFromStorage = window.localStorage.getItem(users);
  if (dataFromStorage) {
    return JSON.parse(dataFromStorage);
  }
  return false;
}