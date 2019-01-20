/** require dependencies */
const express = require("express");
const routes = require('./routes/');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const helmet = require('helmet');
const cloudinary = require('cloudinary');
const fawn = require("fawn");


const app = express()

const router = express.Router()
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/digiico"
console.log(url);

/** configure cloudinary */
cloudinary.config({
    cloud_name: 'chidumennamdi',
    api_key: '392481138676646',
    api_secret: '6vN978wHnfEr21pKrysWuu7_0UI'
})

/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        //useMongoClient: true
    })    
} catch (error) {
    
}
fawn.init(mongoose);
let port = 5001 || process.env.PORT

/** set up routes {API Endpoints} */
routes(router)

/** set up middlewares */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router)

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});