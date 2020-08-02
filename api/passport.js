const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../src/Model/usersModel');
express = require('express');
router = express.Router();

module.exports = function(passport) {
        passport.use(
            
            new LocalStrategy((username, password, done) => {
                User.findOne({ username: username }, err => {
                    if (err) {
                        console.log(err);
                    }
                })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        
                        if(isMatch) {
                            
                            return done(null, user);
                        } else {
                            console.log(username, password);
                            return done(null, false, {message: 'Password Incorrect'})
                        }
                    })
                })
                .catch( err => console.log(error));
                
                
            }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user.id);
            console.log(user.userFirst);
          });
          
          passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
              done(err, user);
            });
          });
        }