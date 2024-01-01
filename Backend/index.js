const express = require("express");
require("dotenv").config();
const { connection } = require("./configs/db");
const { userRouter } = require("./Router/register");
const {listRouter}=require("./Router/task")

const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("Task board home page")
})
app.use("/", userRouter);



app.use("/",listRouter);
//connect to the server:-
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(`Cannot connect to DB: ${err}`);
  }
  console.log(`Server is running on http://localhost:${process.env.port}`);
});