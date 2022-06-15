exports.forwardToDomainUsersService = async (req, res,next) => {
    return res.status(200).json({
        success: true,
        message: 'forwardToDomainUsersService',
    });
}
