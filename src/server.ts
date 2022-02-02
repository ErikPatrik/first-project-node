import express from "express";

const app = express();

app.get("/", (request, response) => {
    return response.json({
        message: "Olá gente",
    });
});

app.listen(3333, () => {
    console.log("Server started! Port: 3333!");
});
