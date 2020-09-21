const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
const session = require('express-session');
const compression = require('compression');
const PORT = process.env.PORT || 5000;
const exhbs = require('express-handlebars');
const config = require('config');
const MongoStore = require('connect-mongo')(session);
let Store = require('./src/Model/Stores');
const db = require('./src/config/db');

//app.use(cors())
app.use(cors({
    origin: ['https://portal.cbmportal.com','https://portal.cbmportal.com:5000', 'https://127.0.0.1:3000', 'http://localhost:3000'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
  }));
  
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(path.join(__dirname, "")));
app.use(morgan('dev'));
app.set('views', path.join(__dirname, '/admin/views'));
app.engine('.hbs', exhbs({extname: '.hbs', defaultLayout: 'index'}))
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
const storeRouter = require('./api/updateStores');
const storesRouter = require('./api/stores');
const targetorderRouter = require('./api/targetOrder');
const adminRouter = require('./admin/admin');



//Express Routers
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
app.use('/api/updateStores', storeRouter);
app.use('/api/stores', storesRouter);
app.use('/api/targetOrder', targetorderRouter);
app.use('/admin', adminRouter);



app.get('/admin/storelist', cors(), (req, res) => {
    res.render('home');
    });

app.get('*', (req, res) => {
    res.send('This page doesn\'t exist!');
    console.log(req.ip);
})

https.createServer({
    key: fs.readFileSync('/home/cbmportal/ssl/keys/d2ce1_b69ad_18b51e73ceacc6ccec9d03816fb819c6.key'),
    cert: fs.readFileSync('/home/cbmportal/ssl/certs/cbmportal_com_d2ce1_b69ad_1608144134_f2955ea7065284ccf35f8e8cd5624c2d.crt'),
    passphrase: '1857BuerkleRdCBM'
},
 app).listen(PORT, '0.0.0.0',() => {
    console.log(`Server is running on ${PORT}`);
})
/*app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server is running on ${PORT}`);
});*/