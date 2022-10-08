import bodyParser from "body-parser";
import express from "express";
import morganBody from "morgan-body";
import dotenv from "dotenv";
import router from "./routes/index"
dotenv.config()

const app = express();

morganBody(app);
app.use(bodyParser.json({ limit: '5mb', extended: true, type: 'application/json' }));
// router(app);
app.use(router)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.listen(process.env.PORT, () => console.log(process.env.SERVICE_NAME + " started on port " + process.env.PORT));