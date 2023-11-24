import app from "./app.js";
import connectDB from './config/connectDB.js'

// connect to database
connectDB();


app.listen(process.env.PORT, () => {
  console.log(` server is working on http://localhost:${process.env.PORT}`);
});
