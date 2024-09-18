const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
import router from "./routes";


require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

app.use(bodyParser.json());

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:5173'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions)); // Use the cors middleware with your options

const port = process.env.PORT;


app.use(router)
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});