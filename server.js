const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const cors = require('cors');
const compression = require('compression');
const session = require('express-session');
const cookieSession = require('cookie-session');
const passport = require('passport')
const MongoStore = require('connect-mongo')(session);
const PORT = process.env.PORT || 5000;
const whitelist = ['http://127.0.0.1:3000', 'http://portal.cbmportal.com', 'http://portal.cbmportal.com:3000', 'http://portal.cbmportal.com:5000', 'http://97.116.79.210'];
const corsOptions = {
    origin: function(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  }
app.use(cors(corsOptions))
require('./api/passport')(passport);

const db = require('./src/config/db');
const bonusRouter = require('./api/bonus');
const repairRouter = require('./api/repair');
const uniformRouter = require('./api/uniform');
const hotelRouter = require('./api/hotel');
const propaneRouter = require('./api/propane');
const dustmopRouter = require('./api/dustmop');
const backpayRouter = require('./api/backpay');
const mileageRouter = require('./api/mileage');
const perdiemRouter = require('./api/perDiem');
const wtRouter = require('./api/WT');
const timeadjustRouter = require('./api/timeAdjustment');
const ptoRouter = require('./api/pto');
const quitRouter = require('./api/quit');
const otherRouter = require('./api/other');
const nsfdRouter = require('./api/nsfd');
const ncnsRouter = require('./api/ncns');
const newhireRouter = require('./api/newhire');
const userRouter = require('./api/users');
app.use(compression());
//app.use(cors());
//app.use(cookieParser('cbm'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "../..")));
app.use(express.static("public"));
/*app.use(cookieSession({
  name: 'cbmCookie',
  keys: ['cbm1', 'cbm2']
}))*/
app.use(session({
    secret: 'cbm',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db}),
    cookie: {maxAge: 3600000, sameSite: 'lax', secure: false, path: '/', domain: 'http://127.0.0.1:3000'},
  }))

  app.use(passport.initialize());
  app.use(passport.session());
app.use(morgan('dev'));
app.use('/api/bonus', bonusRouter);
app.use('/api/repair', repairRouter);
app.use('/api/uniform', uniformRouter);
app.use('/api/hotel', hotelRouter);
app.use('/api/propane', propaneRouter);
app.use('/api/dustmop', dustmopRouter);
app.use('/api/backpay', backpayRouter);
app.use('/api/mileage', mileageRouter);
app.use('/api/perDiem', perdiemRouter);
app.use('/api/WT', wtRouter);
app.use('/api/timeAdjustment', timeadjustRouter);
app.use('/api/pto', ptoRouter);
app.use('/api/quit', quitRouter);
app.use('/api/other', otherRouter);
app.use('/api/nsfd', nsfdRouter);
app.use('/api/ncns', ncnsRouter);
app.use('/api/newhire', newhireRouter);
app.use('/api/users', userRouter);




app.get('/', cors(), (req, res) => {
       
    });


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});