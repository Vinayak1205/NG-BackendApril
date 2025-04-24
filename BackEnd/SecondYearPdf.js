const express = require('express')
const myDb = require('./MongoDb')
const router = express.Router()

router.post("/SelectedBranchPdf",async(req,resp)=>{

    var Sem = req.body.Sem
    var Branch = req.body.Branch
    

    var result

    if(Branch === "CSE"){
        Collection = myDb.collection("CSE")
        result = await Collection.find({ Sem: Sem }).sort({SubjectNumber:1}).toArray();
    }
    else
    if(Branch === "ISE"){
        Collection = myDb.collection("ISE")
        result = await Collection.find({Sem: Sem }).sort({SubjectNumber:1}).toArray();
    }
    else
    if(Branch === "ECE"){
        Collection = myDb.collection("ECE")
        result = await Collection.find({Sem: Sem }).sort({SubjectNumber:1}).toArray();
    }
    else
    if(Branch === "ETE"){
        Collection = myDb.collection("ETE")
        result = await Collection.find ({Sem: Sem }).sort({SubjectNumber:1}).toArray();
    }


    console.log(result)
    resp.send(result)
})

module.exports = router