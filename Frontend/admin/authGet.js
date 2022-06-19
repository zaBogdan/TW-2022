
const url = "https://tw-api.pground.io";

async function refreshToken() {
    try {
        let response = await fetch(url + "/auth/refresh", {
            method: 'GET',
        })
        let data = await response.json();

        if (response.status === 200) {
            localStorage.setItem("accessToken", data.data.tokens.accessToken);
            localStorage.setItem("refreshToken", data.data.tokens.refreshToken);
        }
        else {    // != 200 .. n-are dreptul la alt refreshToken
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.replace(url + "/login.html");   //probabil de modificat redirectul
        }
        console.log(localStorage);

    } catch (err) {
        return "Error on /auth/refresh, error type = " + err;
    }
}

var requestOptions = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('refreshToken')}`    // aici trebuie verificat daca exista sau nu tokenul cu ? :  
    },
    method: 'GET',
}

async function authGet(path, requestOptions) {
    try {
        let response = await fetch(url + path, requestOptions)

        let data = await response.json();
        if (response.status === 403) {  //forbidden
            refreshToken();
        }
        console.log(data); //testing
        return data;
    }
    catch (error) {
        console.error("Could not fetch from API! : " + error);
    }
}






