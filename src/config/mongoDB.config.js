import mongoose from 'mongoose'
import ENVIRONMENT from './environment.config.js'
/* 
mongodb://localhost:27017/UTN_TN_SEPTIEMBRE_SLACK
*/

async function connectMongoDB() {
    try{
        await mongoose.connect(ENVIRONMENT.MONGO_DB_CONNECTION_STRING, {
       /*      useNewUrlParser: true, 
            useUnifiedTopology: true,  */
            timeoutMS: 60000, //60s
            socketTimeoutMS: 60000 //60s
        })
        console.log('Conexion con MongoDB fue exitosa')
    }
    catch(error){
        console.error('La conexion con MongoDB fallo')
        console.log(error)
    }
}


export default connectMongoDB