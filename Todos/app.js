import express from "express";

const app = express();

app.use(express.json());

import userRouter from "./Routers/user_routes.js";

app.use("/api/v1/users", userRouter);

app.listen(8000, () => {
    console.log("Server is running on PORT 8000")
})