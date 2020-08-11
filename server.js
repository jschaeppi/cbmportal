const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
const compression = require('compression');
const PORT = process.env.PORT || 5000;
const exhbs = require('express-handlebars');
const authCheck = require('./api/authCheck');
let Store = require('./src/Model/Stores');

app.use(cors())
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "../..")));
app.use(morgan('dev'));
app.engine('.hbs', exhbs({extname: '.hbs'}))
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

//Declare Routing variables
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
const storeRouter = require('./api/updateStores');
const storesRouter = require('./api/stores');

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


app.get('/admin', cors(), (req, res) => {
       res.render('home');
    });

app.get('/admin/storelist', [authCheck, cors()], (req, res) => {
    res.render('home');
    });


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});