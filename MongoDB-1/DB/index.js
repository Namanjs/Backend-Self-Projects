import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MongoDB}/MongoDB-1`);
        console.log("\nMongoDB coneected !! DB Host: ", connectionInstance.connection.host);
    } catch (error) {
        console.log("MongoDB Connection failed: ", error);
        process.exit(1); // throws error
    }
}

export default connectDB