// Authorization: Bearer //token

const url = "https://tw-api.pground.io";


async function getInputData() {
  window.EmailInput = document.getElementById("email").value;
  window.PasswordInput = document.getElementById("password").value;
}


async function login() {
  try {
    let response = await fetch(url + "/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": EmailInput,
        "password": PasswordInput
      })
    })
    let data = await response.json();

    if (response.status === 200) {
      console.log(data.message);
      localStorage.setItem("accessToken", data.data.tokens.accessToken);
      localStorage.setItem("refreshToken", data.data.tokens.refreshToken);
      window.location.replace("admin/Dashboard/index.html");
    }
    else {
      console.log(data.message);
    }

    return data;
  } catch (err) {
    return "Error on loggin, error type = " + err;
  }
}


async function register() {
  try {
    let response = await fetch(url + "/auth/register", {
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



async function authenticate() {
  await getInputData();
  console.log(await login());
  console.log(localStorage)
}





async function authRegister() {
  await getInputData();
  console.log(await register());
}












