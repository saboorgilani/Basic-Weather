const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.location;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=f78cffa043708fbd2ee3e24abef367c5&units="+unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const ico = weatherData.weather[0].icon;
            const imageur = "http://openweathermap.org/img/wn/" + ico + "@2x.png";
            res.send("<h1>The temperature in "+query+" is " + temp + " degrees celcius</h1><p><h3>The weather is currently "+desc+"</h3><p><img src=" + imageur + ">");
        });
    });
})

app.listen(3000, function () {
    console.log("Server Running at 3000 port");
}); 
