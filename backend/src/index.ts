import express from "express";

const app = express();
app.use((req, res) => {
    console.log("Request received");
    res.send('Hello world')
})
app.listen(3000, 'localhost', () => {
    console.log("Server is running");
})