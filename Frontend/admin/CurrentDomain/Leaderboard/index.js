// functie pentru extragerea unui parametru din URL
function getParamFromUrl(parameter) {
  let search = window.location.search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(parameter);
}
// se extrage din URL id-ul unic al unui domeniu, a.i sa se poata construi corect URL-ul pentru API
let website_id = getParamFromUrl("domain");



$(function () {
  $("#nav").load("../../sidebar/sidebarCurrentDomain.html");
});
/*sidebar included*/



function getParamFromUrl(parameter) {
  let search = window.location.search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(parameter);
}


async function show() {
  let id = getParamFromUrl("domain");
  const list = document.getElementById('mylist');

  let mess = await authGet("/domain/users/leaderboard/" + id, requestOptions);

  console.log(mess.data.domainUsers.length);
  for (let i = 0; i < mess.data.domainUsers.length; i++) {

    const entry = document.createElement('li');
    entry.appendChild(document.createTextNode(mess.data.domainUsers[i].activeDomain));
    list.appendChild(entry);
  }

}




show();