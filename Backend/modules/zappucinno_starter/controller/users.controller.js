exports.getUser = async (req, res,next) => {
    let data = 10;
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            data = 10000;
            resolve();
        }, 100);
        
    }); 

    return res.status(200).json({
        success: true,
        message: 'Hello World',
        data
    });
}

exports.createUser = async (req, res, next) => {
    try {
        // const newUser = new req.db.User({
        //     username: 'zaBogdan',
        //     email: 'bzv@bd.ro',
        //     password: '123456',
        //     firstName: 'Bogdan',
        //     lastName: 'Zabara'
        // })
        // await newUser.save();
        return res.status(200).json({
            success: true,
            message: 'User created',
        });
        // next();
    } catch(e) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}