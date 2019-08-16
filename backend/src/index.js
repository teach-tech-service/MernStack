import express from "express";
import mongodbConnection from "./config/db";
import userRoutes from "./routes/user/user";
import postRoutes from "./routes/post";
import commentRoutes from "./routes/comment";
import mailer from "./config/mailer";
import dotenv from "dotenv/config";
import redisClient from "./config/redis";

const PORT = process.env.PORT || 5000,
  app = express();

mongodbConnection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/user", userRoutes());
app.use("/api/post", postRoutes());
app.use("/api/comment", commentRoutes());

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});

export default app;
