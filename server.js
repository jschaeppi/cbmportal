const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
const errorHandler = require('errorhandler');
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'build')));
-app.get('/', function (req, res) {
+app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 })
});
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(errorHandler());

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});