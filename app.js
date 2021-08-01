


const express=require('express');
const request=require('request');
const https = require("https");





const app=express();

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  var firstName=req.body.fname;
  var lastName=req.body.sname;
  var email=req.body.email;
  var data={
     members: [
       {
         email_address:email,
         status:"subscribed",
         merge_fields: {
           FNAME: firstName,
           LNAME: lastName
         }
       }
     ]
  };
  const jsondata= JSON.stringify(data);
   const url="https://us6.api.mailchimp.com/3.0/lists/b8ad7cb02c"
   const options={
     method:"POST",
     auth:"shristi:9df065df0bc2bd8e7c78d0fa195b3248-us6"
    
   }
   const request=https.request(url,options,function(response){
    
     if(response.statusCode === 200){
       res.sendFile(__dirname + "/success.html");
     }else{
       res.sendFile(__dirname + "/failure.html");
      }
     


     response.on("data",function(data){
       console.log(JSON.parse(data));
     });
    });
    
   request.write(jsondata)
   request.end();

});


app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
});

//9df065df0bc2bd8e7c78d0fa195b3248-us6 api key
//b8ad7cb02c list id