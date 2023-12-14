import mongoose from "mongoose";


export const connectDB = async () => {
    let isConnected = false;
    mongoose.set("strictQuery", true);


    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'dewebcity',
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);

    }

}