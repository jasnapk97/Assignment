const express =require('express');
const bodyParser=require('body-parser');
const cors=require('cors')
const app=express();
const mysql=require('mysql');
const connection=mysql.createConnection({
    host:'localhost',
    user:'user123',
    password:'jasna@1234',
    database:'crudoperation'
});
connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('database connected');
});
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post("/api/insert",function(req,res){
const id=req.body.id
const name=req.body.name
const place=req.body.place
const address=req.body.address

    const sqlinsert="INSERT INTO test (id,name,place,address) VALUES (?,?,?,?);"
    connection.query(sqlinsert,[id,name,place,address],(err,result)=>{
        if (err) {
            console.log(err);
          } else {
            res.send("Values Inserted");
            console.log(result)
          }
    
        
        
    })
  
});
app.get("/api/get/",function(req,res){
    const sqlselect="SELECT * FROM test";
    connection.query(sqlselect,(err,result)=>{
        //console.log(result);
        res.send(result)
    })
})

// app.delete('/api/delete/:id',function(res,req){
//     const id=req.params.id;
//     const sqldelete="DELETE  FROM test WHERE id = ?";
//     connection.query(sqldelete,name,(err,result)=>{
//        if(err) 
//        console.log(err);
        
//     });

// });


app.delete("/api/delete/:name", (req, res) => {
    const name = req.params.name;
    console.log("deleted data")
    connection.query("DELETE FROM test WHERE name = ?", name, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
app.put("/api/update",(req,res)=>{
    const id=req.body.id;
  
    const address=req.body.address;


    connection.query("UPDATE test SET  address = ? WHERE id = ? ",[address,id],(err,result)=>{
        if (err) {
            console.log(err);
           
          } else {
            res.send(result);
            console.log("updatedddd")
          }
    });



});
// app.get("/",function(req,res){
//     const sqlinsert="INSERT INTO test (id,name,place,address) VALUES ('4','ammu','knr','sreenilyam');"
//     connection.query(sqlinsert,(err,result)=>{
//         res.send("welcome  ")
//         console.log("data inserted")
        
//     })
  
// });
app.listen(4000,()=>{
    console.log("server running in port 4000");
});