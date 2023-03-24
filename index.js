const express = require("express");
const app =  express();
app.use(express.json());
let arr =[];
app.get("/GET/v1/events",(req,res)=>{
    try{
        res.json({
            statuscode:201,
           arr
        })
    }catch(e){
      res.json({
        statuscode:404,
        error:e.message
      })
    }
    
})

app.get("/GET/v1/events/:id",async(req,res)=>{
    try{
        let id = parseInt(req.params.id);
        let event = await arr.filter((event)=>{
             return event._id===id
        })
        res.json({
            statuscode:201,
           event
        })
    }
    catch(e){
       res.json({
        statuscode:404,
        message:"there is no event with that id"
       })
    }
})

app.delete("/DELETE/v1/events/:id",async(req,res)=>{
    try{
        let id = parseInt(req.params.id);
        let event = await arr.filter((event)=>{
             return event._id!==id
        })
         arr = event;
        res.json({
            statuscode:204,
            message:"event deleted succesfully",
           arr
        })
    }
    catch(e){
       res.json({
        statuscode:204,
        message:e.message
       })
    }
})



app.post("/POST/v1/events",async(req,res)=>{
    try{
        let id = Date.now()
        let {title,description,location,startime,endtime} = req.body;
        if(title===""||description===""||location===""||startime===""||endtime===""){
            res.json({
                statuscode:400,
                error:"validation error"
            })
        }else{
            await arr.push({...req.body,_id:id});
            res.json({
                statuscode:201
            });
        }
    }catch(e){
      res.json({
        status:"failed",
        message:e.message
      })
    }
})


app.listen(5000,()=>{console.log("server is up at 5000")});