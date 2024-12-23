require('dotenv').config();
require('express-async-errors');

const express = require('express')
const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI
const connectDB = require('./database/connect');
const NotFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authRouter = require('./routes/user');
const TaskRouter = require('./routes/task')
const authMiddleware = require('./middleware/authMiddleware')

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use( '/api/v1/auth', authRouter)
app.use('/api/v1/task',authMiddleware , TaskRouter)

app.use(errorHandlerMiddleware);
app.use(NotFoundMiddleware)
const start = async()=>{
    try {

        await connectDB(MONGO_URI);
        app.listen(PORT , console.log(`The app is listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();