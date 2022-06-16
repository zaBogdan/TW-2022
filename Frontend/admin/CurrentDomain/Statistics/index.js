// functie pentru extragerea unui parametru din URL
function getParamFromUrl(parameter){
  let search = window.location.search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(parameter);
}
// se extrage din URL id-ul unic al unui domeniu, a.i sa se poata construi corect URL-ul pentru API
let website_id = getParamFromUrl("domain");



$(function(){
    $("#nav").load("../../sidebar/sidebarCurrentDomain.html"); 
  });

/*sidebar included*/