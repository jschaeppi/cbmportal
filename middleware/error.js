const errorHandler = (err, req, res, next) => {
    console.log(err.name);
    console.log(err.message);
    if (err.message === 'jwt must be provided') {
        res.status(400).json({ msg: 'Your login has expired, please login again'})
    } else if (err.message === 'Cannot read property \'password\' of null') {
        res.status(400).json({ msg: 'Bad Credentials'});
    } else if(err.name === 'TypeError') {
        res.status(400).json({ msg: 'Please enter all the information and resubmit form please.'})  
    } else {
        res.status(500).json({ msg: 'Server Error'});
    }
    
}

module.exports = errorHandler;