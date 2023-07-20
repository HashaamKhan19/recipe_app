const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/users");
const recipesRoute = require("./routes/recipes");

const app = express();

app.use(morgan("tiny"));

const corsConfig = {
  credentials: true,
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsConfig));
app.use(express.json());

// Routes //
app.use("/auth", userRoute);
app.use("/recipes", recipesRoute);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected.");
    app.listen(3000, () => {
      console.log("server started");
    });
  })
  .catch((err) => console.log(err));
