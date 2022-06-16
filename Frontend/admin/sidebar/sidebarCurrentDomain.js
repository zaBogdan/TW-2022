// functie pentru extragerea unui parametru din URL
function getParamFromUrl(parameter){
    let search = window.location.search;
    const urlParams = new URLSearchParams(search);
    return urlParams.get(parameter);
  }
  // se extrage din URL id-ul unic al unui domeniu, a.i sa se poata construi corect URL-ul pentru API
  let website_id_0 = getParamFromUrl("domain");
 
  // get all href's and add the id to the name
const hrefs = document.getElementsByClassName("id_param");
for (let i = 0; i < hrefs.length; i++) {
  hrefs[i].href += ("?domain="+website_id_0);
}
  