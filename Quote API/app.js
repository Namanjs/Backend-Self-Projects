import express from "express";

const app = express();

app.use(express.json());

app.get("/quote", async (req, res) => {
    try {
        let response = await fetch("http://api.quotable.io/random");
        let quote_obj = await response.json();
        res.json(quote_obj.content);
    } catch (error) {
        throw new Error("Some error occured");
    }
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
