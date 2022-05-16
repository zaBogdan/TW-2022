exports.getUser = async (req, res,next) => {
    console.log('get: ', req.body, req.params)
    let data = 10;
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            data = 10000;
            resolve();
        }, 1000);
        
    }) 
        // next('Failed to fuck')
    return res.status(200).json({
        success: true,
        message: 'Hello World',
        data
    });
}