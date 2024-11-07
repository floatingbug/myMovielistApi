require("dotenv").config();
const {store} = require("./src/store/store.js");
const {createApi} = require("./src/createApi");
const api = createApi({store});
const http = require("http");
const server = http.createServer(api);

server.listen(process.env.PORT);
