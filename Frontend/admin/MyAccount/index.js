$(function () {
  $("#nav").load("../sidebar/sidebar.html");
});

(async () => {

  var response = await authGet("/user/self", requestOptions)
  if (response.success === false) {
    var update = document.getElementById("update");
    update.style.display = "none";
  } else {
    var create = document.getElementById("create");
    var username = document.getElementById("username");

    document.getElementsByName("firstName")[0].value = response.data.user.firstName;
    document.getElementsByName("lastName")[0].value = response.data.user.lastName;
    document.getElementsByName("dateOfBirth")[0].value = formatDate(Date(response.data.user.dateOfBirth));

    username.style.display = "none"; // hide create button
    create.style.display = "none";
  }
})();


function formatDate(date) {  // no simpler solution.. date formats :/
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}



const getInputData = async (create) => {
  window.firstNameInput = document.getElementById("firstName").value;
  window.lastNameInput = document.getElementById("lastName").value;
  if (create === true) {
    window.usernameInput = document.getElementById("username").value;
  }
  window.dateOfBirthInput = Date.parse(document.getElementById("dateOfBirth").value);

  if (create === true) {
    window.body = JSON.stringify({
      "firstName": window.firstNameInput,
      "lastName": window.lastNameInput,
      "username": window.usernameInput,
      "dateOfBirth": window.dateOfBirthInput,
    })
  }
  else {
    window.body = JSON.stringify({
      "firstName": window.firstNameInput,
      "lastName": window.lastNameInput,
      "dateOfBirth": window.dateOfBirthInput,
    })
  }

}

const update = async () => {
  await getInputData(false);
  var mess = await authPut("/user/self", window.body);
  alert(mess.message);
}

const create = async () => {
  await getInputData(true);
  var mess = await authPost("/user/profile", window.body);
  alert(mess.message);
}


/*logic is good .. i think */
const resetPassword = async () => {
  try {
    let response = await fetch(url + "/auth/change_password", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": "trydinnou@gmail.com"  // for testing 
      })
    })
    let data = await response.json();
    if (response.status != 200) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  } catch (err) {
    return "Error on resetting password, error type = " + err;
  }

}
