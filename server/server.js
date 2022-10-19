import config from './../config/config';
import app from './express';
const mongoose = require('mongoose');

mongoose.connect(config.mongoUri, {
    useNewUrlParser: true
})
.then(() => console.log('Database Connected'))
.catch(err => console.log(err));

app.listen(config.port, (err) => {
    if(err) {
        console.log(err)
    }
    console.log(`Serving on Port: ${config.port}`)
})