const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const dbConfig = require('./config/mongodb.config.js')
const Customer = require('./models/customer.js')

const cors = require('cors')
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url)
    .then(()=>{
        console.log("Connected")
    }).catch(err=>{
        console.log('Canot Connect to MongoDB')
        process.exit();
    })

app.use(cors())
require('./routes/customer.route.js')(app);

const server = app.listen(process.env.POTR || 3000, ()=>{
    console.log("Run")
})

// const server = app.listen(3000, () =>{
//     let port = server.address().port
//     console.log('Run at htpp://localhost:%s',port)
// })

function initCustomer(){
    let data = [
        {
            CustomerId: 1001,
            FullName: "Thanabodin",
            Address: "Bangkok"
        },
        {
            CustomerId: 1002,
            FullName: "Jae",
            Address: "UK"
        },
        {
            CustomerId: 1003,
            FullName: "Manup",
            Address: "USA"
        }
    ]
    for(let i=0; i<data.length; i++){
        const c = new Customer(data[i]);
        c.save()
    }
    console.log("สร้างข้อมูล Customer สำเร็จแล้ว")
}