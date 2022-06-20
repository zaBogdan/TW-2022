$(function () {
  $("#nav").load("../sidebar/sidebar.html");
});
/*sidebar included*/



async function getInputData() {
  window.firstNameInput = document.getElementById("firstName").value;
  window.lastNameInput = document.getElementById("lastName").value;
  window.usernameInput = document.getElementById("userName").value;
  window.dateOfBirthInput = document.getElementById("dateOfBirth").value;
}


var body = JSON.stringify({
  "type": 1,
  "firstName": firstNameInput,
  "lastName": lastNameInput,
  "username": usernameInput,
  "dateOfBirth": dateOfBirthInput,
  //"email": emailInput  //TODO?
})


async function update() {    //update dar de fapt e post.. 
  await getInputData();
  authPost("user/profile/", body);
}


// authGet("/user/self", requestOptions); //whoAmI  //TObeAddedToURL

//TODO delete account ?