const sensor = require('ds18b20-raspi');
// console.log(`${tempC} degC`);

const express = require('express');
const app = express();
const port = 3000;

//setup database connection
const mysql = require('mysql');
var con = mysql.createConnection({
    host: "172.20.10.3",
    user: "root",
    password: "",
    database: "iot-project",
  });

  con.connect(function(error){
    if(error) throw error;
    console.log("Connected!");
  })


app.post('/currentTemp', (req, res)=>{
    const tempC = sensor.readSimpleC();

        var sql = `INSERT INTO temperature (temp) VALUES (${tempC})`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted: id-" + result[1]);
          
        
      });
    res.status(200).send({"tempNow": tempC});
    res.end();
});

app.listen(port, console.log('server is running!!!'));