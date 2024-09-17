const express = require('express')
const app = express();
import router from "./routes";


require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const port = process.env.PORT;


app.use(router)
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});