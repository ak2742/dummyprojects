const express = require('express');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, { cors: { origin: "*" } })
const dbconn = require('./dbconn');
require('dotenv').config()
const port = process.env.EXPRESS_PORT || 80

dbconn();
require('./socket/io')(io)

app.use(require('cors')());
app.use(require('sanitize').middleware);
app.use(express.urlencoded({ limit: '3mb', extended: true }));
app.use(express.json({ limit: '3mb' }));

app.use("/files", express.static('./files'))
app.use("/account", require("./endpoints/account"))
app.use("/auth", require("./endpoints/auth"))
app.use("/product", require("./endpoints/product"))
app.use("/cart", require("./endpoints/cart"))
app.use("/order", require("./endpoints/order"))
app.use("/admin", require("./admin"))               // for development only

server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
