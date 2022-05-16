exports.getUser = (req, res) => {
    console.log('get: ', req.body, req.params)
    return res.status(200).json({
        success: true,
        message: 'Hello World'
    });
}