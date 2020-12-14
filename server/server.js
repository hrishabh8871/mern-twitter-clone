import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import multer from 'multer'
import path from 'path'
const mongoConnectionUrl = 'mongodb+srv://admin:nHNo7F3sos0aAyRW@cluster0.rhxhk.mongodb.net/twitter-clone?retryWrites=true&w=majority'


import Router from './Routes/routers'

// app config
const app = express();
app.use(express.urlencoded({
    extended: true
  }))
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Access-Control-Allow-Headers', "*")
    next();
});

app.use('/', express.static(path.join(__dirname, '/public')));

// Multer
const storage = multer.diskStorage({
    destination: (req, res, callBack) => {
        callBack(null, 'public')
    },
    filename: (req, file, callBack) => {
        callBack(null, `image${file.originalname}`)
    }
})

var upload = multer({ storage: storage })

// db config
const connectDb = () => {
    try {
        mongoose.connect(mongoConnectionUrl, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
            console.log("Mongo db connected")            
        });                
    }
    catch (error) { 
        console.log("could not connect, Please wait conection retrying...");    
    }
}

connectDb();

// listen
app.listen(port, () => console.log(`Listening on localhost ${port}`))

// Routes
app.use(Router)

// Upload image
app.post('/upload', upload.single('file'), (req, res, next) => {
    const file = req.file    
    if(!file) {
        const error = new Error('Please upload file')
        res.status(400).send(error)
    }
    else {
        res.send(file)
    }
})

