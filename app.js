const express = require('express')
const app = express();
const port = 3000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.status(200).json({msg: 'Hello this shaa!'})
})

app.get('/identitas/',require('./controller/response').identitas);
app.get('/identitas/:id',require('./controller/response').penilaian);
app.post('/kirimdata',require('./controller/response').kirimData );


app.get("/weather", require("./controller/response").weather);

app.post('/senddata',require('./controller/response').sendData );

app.get('/coba', function(req, res){

   res.sendFile(path.join(__dirname, '/coba.json'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
