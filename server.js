const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose')

const server = require('http').createServer(app);
const io = require("socket.io")(server);

const vendor = require('./routes/vendor');
const snack = require('./routes/snack');
const customer = require('./routes/customer');
const order = require('./routes/order');

app.use(cors());

/** URL for our live website: 
 *  https://lesillage.herokuapp.com
 */

//adding for texting whether the heroku is conntected 
app.get('/', (req, res) => {
    res.status(200)
    res.write('<html style="text-align:center;"><h3> If you can see this message </h3></html>')
    res.write('<html style="text-align:center;"><h3> that means you connect successfully </h3></html>')
    res.write('<html style="text-align:center;"><h1> LE Sillage </h1></html>')
    res.write('<html><h2> Welcome to our vendor cafe! </h2></html>')

    res.write('<html><ul></html>')
    res.write('<html><p font-size: 20px;> <a href="/menu">Check out our menu = )</a> </p></html>')
    res.write('<html style="text-align:center;"><h4> Do Not click the menu, it is not work yet </h4></html>')
    res.end('<html></ul></html>')
})



app.use(bodyParser.json());

io.of("/api/spcket").on("connection", (socket) => {
    console.log("socket.io: User connected: ", socket.id);
    socket.on("disconnect", () => {
        console.log("socket.io: User disconnected: ", socket.id);
    });
});

const db = require('./dtbase/keys').mongoURL;
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Yay! MongoDB Has Connected..."))
    .catch((err) => console.log(err));

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Setting change streams");
    const orderChangeStream = connection.collection("orders").watch();

    orderChangeStream.on("change", (change) => {
        switch (change.operationType) {
            case "insert":
                console.log("insertion detected at backend");
                const order = {
                    _id: change.fullDocument._id,
                    customer: change.fullDocument.customer,
                    vendor: change.fullDocument.vendor,
                    snacks: change.fullDocument.snacks,
                    createAt: change.fullDocument.createAt
                };
                io.of("/api/socket").emit("newOrder", order);
                break;
            case "update":
                console.log("update detected at backend");
                io.of("/api/socket").emit("updateOrder", change.documentKey._id);
                break;
            
            case "delete":
                console.log("deletion detected at backend");
                io.of("/api/socket").emit("deleteOrder", change.documentKey._id);
                break;
        }
    })
})

// add the route for three sections
app.use('/vendor', vendor);
app.use('/snack', snack);
app.use('/customer', customer);
app.use('/order', order);



// url listen..
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})