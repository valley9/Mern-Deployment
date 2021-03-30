const express = require('express');
const app = express();
const cors = require('cors')
const port = 8000;
// const io = require('socket.io')(server.js, { cors: true });

app.use(cors());
app.use(express.json());

require('./server/config/mongoose.config')
require('./server/routes/pet.routes')(app)



app.listen(port, () => console.log(`Listening on port: ${port}`));



