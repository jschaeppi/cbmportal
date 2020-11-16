const errorHandler = (err, req, res, next) => {
    console.log(err.name);
    console.log(err.message);
    if (req.headers.host === 'admin.cbmportal.com:5000') {
        if (err.name === 'JsonWebTokenError') {
            res.render('main', {msg: 'Please login to access this resource.'})
        }
        else if (err.message === 'Cannot read property \'password\' of null') {
            res.render('main', {msg: 'Bad Credentials'})
        } 
    } else if (err.name === 'TokenExpiredError') {
        res.status(401).json({ msg: 'Your login has expired, please login again'})
    } else if(err.name === 'JsonWebTokenError') {
        res.status(401).json({ msg: 'Please login to access this resource.'});
    } else if (err.message === 'Cannot read property \'password\' of null') {
        res.status(400).json({ msg: 'Bad Credentials'});
    } else if(err.name === 'TypeError') {
        res.status(400).json({ msg: 'Please enter all the information and resubmit form please.'})  
    } else if (err.name === "ReferenceError") {
        res.status(400).json({ msg: 'Your submission ran into an issue and didn\'t submit.  Please reach out to IT for assistance.'});
    } else {
        res.status(500).json({ msg: 'Server Error'});
    }
    
}

module.exports = errorHandler;