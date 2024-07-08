
const express = require("express")
const http = require('http')
const socketIo = require("socket.io")
const path = require("path")

const app = express()

const server = http.createServer(app)

const io = socketIo(server)

app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, "public")));


io.on("connection", (socket) => {
    console.log("Connected")
    // console.log(socket.id)


    socket.on("send-location", (data) => {

        io.emit("recive-location", { id: socket.id, ...data })

    })

    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id)
    })

})

app.get("/", (req, res) => {

    res.render("index")
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => {
    console.log(`> Express app running at ${PORT}`)
})
