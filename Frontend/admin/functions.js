export async function getFromApi(url){
    try{
     let x = await fetch(url).then(response => response.json());
     return x;
    }
    catch(error){
      console.error("Could not fetch from API!");
    }
    
  }