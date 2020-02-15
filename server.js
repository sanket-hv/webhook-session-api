const express=require("express")
const bodyParser = require("body-parser")
const app = express()
const MongoClient = require("./database/connection");
const WebHookModel = require("./database/WebHook.model")




app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

MongoClient().then(()=>{
    console.log("Database Connected");
})

//Get all webhooks
app.get("/api/webhook", (req, res)=> {
    
    WebHookModel
        .find()
        .then((wh)=> {

            res.json({
                flag: true,
                data: wh,
                message: "Successfully fetched"
            });
        })
        .catch(e=> {
            res.json({
                flag: false,
                data: null,
                message: e.message
            });
        })
})

//Create WebHook
app.post("/api/webhook",(req,res)=>{

    let body=req.body;

    WebHookModel
    .create(body)
    .then((wh)=>{

        res.json({
            flag:true,
            data:wh,
            message:"Successfully created"
        })
    })
    .catch(e=> {
        res.json({
            flag: false,
            data: null,
            message: e.message
        });
    })

})

//Update webhook
app.put("/api/webhook/:id", (req, res)=> {
    
    let body = req.body;

    WebHookModel
        .findByIdAndUpdate(req.params.id, body)
        .then((wh)=> {

            res.json({
                flag: true,
                data: wh,
                message: "Successfully updated"
            });
        })
        .catch(e=> {
            res.json({
                flag: false,
                data: null,
                message: e.message
            });
        })
})

//Delete Webhook
app.delete("/api/webhook/:id", (req, res)=> {

    WebHookModel.findByIdAndRemove(req.params.id, function(err, wh){
        if(err) {
            res.json({
                flag: false,
                data: null,
                message: err.message
            });
        } else {
            res.json({
                flag: true,
                data: wh,
                message: "Successfully deleted"
            });
        }
    });
})

app.get("/",(req,res)=>{
    res.send("Welcome to Handson Session");
})

app.listen(8000,()=>{
    console.log("Server started")
})