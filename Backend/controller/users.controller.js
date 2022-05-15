exports.getUser = (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Hello World'
    });
}