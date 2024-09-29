const cors = require('cors');
const express = require('express');
const app = express();
const routes = require('./routes/routes')
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes)


app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
