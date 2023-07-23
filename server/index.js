const server = require('express');
const app = server();
const body_parser = require('body-parser')
require('dotenv').config();
const PORT = process.env.PORT
const helmet = require('helmet')
app.use(helmet());
app.use(server.json());
app.use(body_parser.json());
app.use("/user", require('./Routes/user'))
require('./auth/conn')
app.get('/', (req, res) => {
    res.send("Working");
})


app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})