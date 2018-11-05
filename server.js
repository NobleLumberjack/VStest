var express = require ("express")
var webpack = require("webpack")
var webpackDevMiddleware = require("webpack-dev-middleware")
var webpackHotMiddleware = require("webpack-hot-middleware")
var config = require("./webpack.config")
var http = require("http")
const socketServer =require("socket.io")

var app = new express();

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

var server = http.createServer(app);
var io = socketServer(server);

server.listen(3000,()=> {console.log("Server running on localhost:3000")})
const connections = [];
io.on("connection", (socket) => {
    connections.push(socket)
    socket.emit("init", false)
    socket.on("msg", (data) => {
        socket.broadcast.emit("msg", data)
    })
})