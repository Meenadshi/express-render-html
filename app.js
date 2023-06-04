// const express = require("express")
// const app = express()
// const {people} = require("./data")
// const bodyParser = require('body-parser')
// app.use(bodyParser.json())
// app.use(bodyParser.express.urlencoded({extended:true}))

// app.use(express.static('public'))

// app.set("view engine","ejs")

// app.get("/", (req,res) => {
//     res.render("index")
// })

// app.get('/api/people',(req,res) => {
//     res.status(200).json({status: true, data:people})
// })

// app.post('/api/people',(req,res) => {
//     const name = request.body
//     //console.log(name)
//     if (!name){
//         response.status(401).send("Provide the name")
//     }
//     response.status(200).json({status: true, person: name})
// })

// app.put('/api/people/:id', (req,res) => {
//     const {id} = request.params.id
//     const {name} = request.body
//     const person = people.find((person) => person.id === Number(id))
//     if(!person){
//         response.status(401).json({status:false,message:"No user found with given id: ${id}"})
//     }
// })

// app.delete('/api/people/id', (req,res) => {
//     const deletePerson = people.find((person)  => person.id === Number(request.params.id))
//     if(!deletePerson){
//         return response
//             .status(404)
//             .json({success: false, msg: 'no person with id ${request.params.id}'})
//     }
//     const newPeople = people.filter(
//         (person) => {person.id === Number(request.params.id)}
//         )
//     return response.status(200).json({success: true ,data: newPeople})
// })

// app.listen(3500)
const express =require('express')
const { People } = require('./api')
const app=express()
const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))


app.get('/api/people',(req,res)=>{
 res.status(200).json({status:true,data:People})
})

// app.post('/api/people',(req,res)=>{
  
//     // People.push({name:req.body.name},{id:(People.length)})
//     const {name}=req.body
//     res.status(200).json({status:true,data:name})
  
// })


app.post('/api/people',(req,res)=>{
  // const {name}=req.body
  People.push({id:(People.length+1),name:req.body.name})
  res.status(200).json({staus:true,data:People})
})

// app.put('api/people/:id',(req,res)=>{
//   const person=People.find((person)=>{
//     person.id===Number(req.params.id)
//   })
//   if(!person){
//     res.status(404).send("User Not Found")
//   }
//   else{
//     console.log(req.body);

//   }
  
// })

app.put('/api/people/:id',(req,res)=>{
const id=req.params.id
  const Person=People.find((person)=>person.id===Number(id))
  if(!Person){
    res.status(404).send("User Not Found")
  }
 People.map((person)=>{
    if(person.id===Number(id)){
      person.name=req.body.name
    }
  })
  res.status(200).json({status:true,data:People}) 
  
})

app.delete('/api/people/:id',(req,res)=>{
  const id=req.params.id;
  if(id>People.length){
    res.status(404).json({status:false,message:"User Not Found"})
    
  }
  
  People.splice((id-1),1);
  res.status(200).json({status:true,data:People})
    
  })
 

app.listen(3500);
