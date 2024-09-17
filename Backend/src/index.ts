const express =require('express')
const app = express();
import router from "./routes";
const port = 5000;


app.use(router)
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});