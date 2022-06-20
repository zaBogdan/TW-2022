$(function () {
  $("#nav").load("../sidebar/sidebar.html");
});
/*sidebar included*/



async function getInputData() {
  window.firstNameInput = document.getElementById("firstName").value;
  window.lastNameInput = document.getElementById("lastName").value;
  window.usernameInput = document.getElementById("username").value;
  window.dateOfBirthInput = document.getElementById("dateOfBirth").value;


  window.body = JSON.stringify({
    "firstName": firstNameInput,
    "lastName": lastNameInput,
    "username": usernameInput,
    "dateOfBirth": dateOfBirthInput,
  })
}




async function post() {    //update dar de fapt e post.. 
  await getInputData();
  await authPost("user/profile/", body);
}


// authGet("/user/self", requestOptions); //whoAmI  //TObeAddedToURL

//TODO delete account ?