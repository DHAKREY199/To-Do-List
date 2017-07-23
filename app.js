var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    methodOverride = require("method-override");
    
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
    
mongoose.connect("mongodb://dhakrey:ghanta@ds143181.mlab.com:43181/todolist");
var todolist = new mongoose.Schema({
    task : String
});
var List = mongoose.model("List", todolist);
// var notebook = new List({task : "Buy Black and Blue pens"});
// notebook.save(function(err ,list){
//     if(err)
//     console.log("Something Wrong");
//     else {
//         console.log("We saved item in todolist");
//         console.log(list);
//     }
// });



app.get("/", function (req, res) {
        List.find({} , function(err, items){
            if(err){
                console.log("Somethig went Wrong");
            } else {
                res.render("index",{items : items});
            }
        });
});
app.post("/add", function(req, res) {
    var item = req.body.item;
    //console.log(item);
    
    List.create({task : item}, function(err, items){
          if(err){
              console.log("Something Wrong");
          } else {
              res.redirect("/");
              
          }
    });
});

app.delete("/:id" , function(req , res){
    List.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("server has started");
});