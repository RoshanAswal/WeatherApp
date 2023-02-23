const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/",(req,res)=>{
    const city=req.body.city;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city},india&appid={apikey}&units=metric`;
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            res.send("Temperature is "+temp);
        });
    });
});

app.listen(3000);
