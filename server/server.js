const port = 8001;
const express = require("express");
const app = express();
const cors = require("cors");
const bookRoutes = require("./routes/book.routes");
const userRoutes = require("./routes/user.routes");

app.use(express.json(), express.urlencoded({ extended: true }));

// app.use(cors({ //cors is going to allow different ports to send requests to our API
//     origin: "*"
// }));
// const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// ROUTES AND CONFIG AFTER MAKING FILES
require("./config/mongoose.config");

// bookRoutes(app);
app.use("/api/book", bookRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => console.log(`🎉Party on port: ${port}`));
