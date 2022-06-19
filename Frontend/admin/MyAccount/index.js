$(function () {
  $("#nav").load("../sidebar/sidebar.html");
});
/*sidebar included*/



authGet("/user/self", requestOptions);



async function updateProfile() {
  try {
    let response = await fetch(url + "user/profile/" + loggedInUser(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "type": 1,
        "email": EmailInput,
        "password": PasswordInput
      })
    })
    let data = await response.json();

    return data;
  } catch (err) {
    return "Error on registering, error type = " + err;
  }
}


async function update() {
  await getInputData();
  console.log(await updateProfile());
}
