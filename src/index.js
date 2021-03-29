const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const ledgerApi = require('./routes/ledger/index')
const port = process.env.PORT

const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json())

app.use(ledgerApi)

app.listen(port || 8000)