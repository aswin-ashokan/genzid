import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect('mongodb+srv://genzid:genzid01@cluster0.moe1old.mongodb.net/')
        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log('MongoDB connected Successfully');
        })
        connection.on('error', (err)=>{
            console.log('Cant establish mongodb connection' + err);
            process.exit();
        })
        
    } catch (error) {
        console.log("Something goes wrong")
        console.log(error);
    }
}