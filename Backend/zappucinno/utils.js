global.debug = (str, ...args) => {
    if(process.env.__ZAPPUCINNO_DEBUG__ === undefined)
        return;
    console.log(str, ...args);  
}
