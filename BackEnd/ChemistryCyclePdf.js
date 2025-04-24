const express = require('express')
const myDb = require('./MongoDb')
const router = express.Router()

router.post("/GetAllModules",async(req,resp)=>{

    var Cluster = req.body.Category
    var MathsSem = req.body.Sem
    console.log(Cluster)
    const PhysicsCycleCollection = myDb.collection("ChemistryCycle")

    var EnglishCourse
    if(MathsSem == "1CS" || MathsSem == "1EC" || MathsSem == "1ME")
        EnglishCourse="1"
    else
    if(MathsSem == "2CS" || MathsSem == "2EC" || MathsSem == "2ME")
        EnglishCourse="2"

    var result
    if(Cluster != "")
        result = await PhysicsCycleCollection.find({Category:{ $in: [Cluster,"Common", "OneCredit",MathsSem,"ESC","ETC",EnglishCourse] }}).sort({SubjectNumber:1}).toArray()
    else
    if(EnglishCourse == 1)
        result = await PhysicsCycleCollection.find({Category:{ $in: ["CS","EC","ME","Common", "OneCredit","1CS","1EC","1ME","ESC","ETC",EnglishCourse] }}).sort({SubjectNumber:1}).toArray()
    else
    if(EnglishCourse == 2)
        result = await PhysicsCycleCollection.find({Category:{ $in: ["CS","EC","ME","Common", "OneCredit","2CS","2EC","2ME","ESC","ETC",EnglishCourse] }}).sort({SubjectNumber:1}).toArray()
    

    console.log(result)
    resp.send(result)
})

module.exports = router