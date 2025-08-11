import express from "express";
import dotenv from "dotenv";

const app = express();

app.use(express.json());

const port  = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

