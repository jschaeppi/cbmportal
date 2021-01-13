const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
require('dotenv').config({path: '../config/.env'});
require('./../src/config/db');
const errorHandler = require('./../middleware/error');
const bodyParser = require('body-parser');
const translator = require('translate');
const morgan = require('morgan')
const cors = require('cors');
//const session = require('express-session');
const compression = require('compression');
const PORT = 5001;
const exhbs = require('express-handlebars');
//const MongoStore = require('connect-mongo')(session);
process.traceDeprecation = true;
translator.engine = 'google';
translator.key = process.env.translateAPI;


app.use(cors({
    origin: ['https://portal.cbmportal.com','https://portal.cbmportal.com:5001', 'https://127.0.0.1:3000', 'http://localhost:3000'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
  }));
  
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(path.join(__dirname, "")));
app.use(morgan('dev'));

app.set('views', path.join(__dirname, '../admin/views'));
app.engine('.hbs', exhbs({extname: '.hbs', helpers: require('../admin/helpers/hbs_helpers'), defaultLayout: 'index'}));
app.set('view engine', '.hbs');

app.set('trust proxy', 1) // trust first proxy
/*app.use(session({
    name: 'cbmCook',
    secret: config.get('sessionSecret'),
    cookie: {
        httpOnly: true,
        maxAge: 360000,
        secure: false,
        sameSite: 'none',
    },
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({ 
        mongooseConnection: db,
        stringify: true,
    }),
}))*/


//Declare Routing variables
const bonusRouter = require('./testapi/bonus');
const repairRouter = require('./testapi/repair');
const uniformRouter = require('./testapi/uniform');
const hotelRouter = require('./testapi/hotel');
const propaneRouter = require('./testapi/propane');
const dustmopRouter = require('./testapi/dustmop');
const backpayRouter = require('./testapi/backpay');
const mileageRouter = require('./testapi/mileage');
const perdiemRouter = require('./testapi/perDiem');
const wtRouter = require('./testapi/WT');
const timeadjustRouter = require('./testapi/timeAdjustment');
const ptoRouter = require('./testapi/pto');
const quitRouter = require('./testapi/quit');
const termRouter = require('./testapi/term');
const nsfdRouter = require('./testapi/nsfd');
const ncnsRouter = require('./testapi/ncns');
const newhireRouter = require('./testapi/newhire');
const userRouter = require('./testapi/users');
const storeRouter = require('./testapi/updateStores');
const storesRouter = require('./testapi/stores');
const targetorderRouter = require('./testapi/targetOrder');
const adminRouter = require('./../admin/admin');
const psListRouter = require('./../admin/routes/psListRoute');
const portalUserRouter = require('./../admin/routes/portalRoute');
const storeListRouter = require('./../admin/routes/storeRoute');



//Express Routers
app.use('/testserv/testapi/bonus', bonusRouter);
app.use('/testserv/testapi/repair', repairRouter);
app.use('/testserv/testapi/uniform', uniformRouter);
app.use('/testserv/testapi/hotel', hotelRouter);
app.use('/testserv/testapi/propane', propaneRouter);
app.use('/testserv/testapi/dustmop', dustmopRouter);
app.use('/testserv/testapi/backpay', backpayRouter);
app.use('/testserv/testapi/mileage', mileageRouter);
app.use('/testserv/testapi/perDiem', perdiemRouter);
app.use('/testserv/testapi/WT', wtRouter);
app.use('/testserv/testapi/timeAdjustment', timeadjustRouter);
app.use('/testserv/testapi/pto', ptoRouter);
app.use('/testserv/testapi/quit', quitRouter);
app.use('/testserv/testapi/term', termRouter);
app.use('/testserv/testapi/nsfd', nsfdRouter);
app.use('/testserv/testapi/ncns', ncnsRouter);
app.use('/testserv/testapi/newhire', newhireRouter);
app.use('/testserv/testapi/users', userRouter);
app.use('/testserv/testapi/updateStores', storeRouter);
app.use('/testserv/testapi/stores', storesRouter);
app.use('/testserv/testapi/targetOrder', targetorderRouter);
app.use('/admin', adminRouter);
app.use('/admin/dashboard/psList', psListRouter);
app.use('/admin/dashboard/portalUsers', portalUserRouter);
app.use('/admin/dashboard/stores', storeListRouter);
app.use(errorHandler);


app.get('/admin/storelist', cors(), (req, res) => {
    res.render('home');
    });

app.get('*', (req, res) => {
    res.send('This page doesn\'t exist!');
    console.log(req.ip);
})

https.createServer({
    key: fs.readFileSync(process.env['nodeSSLKey']),
    cert: fs.readFileSync(process.env['nodeSSLCert']),
    passphrase: process.env['nodePassphrase'],
},
 app).listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
})