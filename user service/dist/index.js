import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const connectDb = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            dbName: "tunewave"
        });
        console.log("MongoDB connected");
    }
    catch (error) {
        console.log(error);
    }
};
const app = express();
app.get("/", (req, res) => {
    res.send("Server is working");
});
const port = process.env.PORT || 5000;
app.listen(5000, () => {
    console.log(`Server is running on port ${port}`);
    connectDb();
});
//# sourceMappingURL=index.js.map