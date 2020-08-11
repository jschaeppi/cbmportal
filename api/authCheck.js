module.exports = async function verifyUser(req, res) {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({issue: 'Not Authorized'})
    }
    try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    const { exp } = decoded;
    if (Date.now() >= exp * 1000) {
        res.status(401).json({msg: 'Unathorized Access'});
      } else {
    let user = await User.findOne({ _id: decoded.user.id })
    .select('-password');
    res.json({decoded, user});
        } 
    }
    catch(err) {
        console.log(err.name);
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({ msg: 'Not Authorized, please login' })
        } else {
        res.json({issue: 'Server Error'});
        }
    }
}