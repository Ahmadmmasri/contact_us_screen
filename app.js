//jshint esversion:6
const express=require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");
const app= express();
const { dirname } = require("path");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});

app.post("/failure",(req,res)=>{
    res.redirect("/")
});

app.post("/",(req,res)=>{
    var firstName =req.body.Fname;
    var secondName =req.body.Sname;
    var lastName =req.body.Lname;
    console.log(firstName,secondName,lastName);

    var data={
        members:[
            {
                email_address: lastName,
                status: 'subscribed',
                merge_fields:   {FNAME:firstName,LNAME:secondName}
            }
        ]
    };

    var jsonData= JSON.stringify(data);
    const url= "https://us1.api.mailchimp.com/3.0/lists/your list key";
    const options={
        method:"POST",
        auth: "Ahmad95: enter your key "
    }
    const request=https.request(url,options,(response)=>{
        if(response.statusCode === 200)
            res.sendFile(__dirname+"/success.html");
        else
            res.sendFile(__dirname+"/failure.html");

        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })

    });
    request.write(jsonData);
    request.end();
});

app.listen(3000,(req,res)=>{
    console.log("server works well on 3000");
})


// Api Key
// f7646a0f4c9d565e8d9acb580d499c6d-us1

//List id
//5c8944507c