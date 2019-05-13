const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const fs = require("fs");

app.use(express.static(__dirname + "/public"));

app.get("/api/users", (req, res) => {
  const content = fs.readFileSync("users.json", "utf-8");
  const users = JSON.parse(content);
  res.send(users);
});

app.get("/api/users/:id", (req, res) => {
  const content = fs.readFileSync("users.json", "utf-8");
  const users = JSON.parse(content);
  const id = req.params.id;
  console.log(id);
  let name, age;
  users.forEach(person => {
    if (person.id === +id) {
      name = person.name;
      age = person.age
    }
  });
  if (name === undefined || age === undefined) res.status(404).send();
  const text = "you are looking for " + name + " " + age + " years old";
  res.send(text);
});

app.post("/api/users", jsonParser, (req, res) => {
  if(!req.body) res.status(400).send();
  const user = {
    name: req.body.name,
    age: req.body.age
  };

  let data = fs.readFileSync("users.json", "utf-8");
  let users = JSON.parse(data);
  let maxId = Math.max(...users.map((user) => {
    return user.id;
  }));
  user.id = ++id;
  users.push(user);
  data = JSON.stringify(users);
  fs.writeFileSync("users.json", data);
  res.send(data);
});

app.delete("/api/users/:id", function(req, res){
      
    let id = req.params.id;
    let data = fs.readFileSync("users.json", "utf8");
    let users = JSON.parse(data);
    let index = -1;
    // находим индекс пользователя в массиве
    for(let i=0; i<users.length; i++){
        if(users[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        let user = users.splice(index, 1)[0];
        let data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        // отправляем удаленного пользователя
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

app.put("/api/users", jsonParser, function(req, res){
      
  if(!req.body) return res.sendStatus(400);

  let userId = req.body.id;
  let userName = req.body.name;
  let userAge = req.body.age;
  let data = fs.readFileSync("users.json", "utf8");
  let users = JSON.parse(data);
  let user;
  for(let i = 0; i < users.length; i++){
      if(users[i].id == userId){
          user = users[i];
          break;
      }
  }

  if(user){
      user.age = userAge;
      user.name = userName;
      let data = JSON.stringify(users);
      fs.writeFileSync("users.json", data);
      res.send(user);
  }
  else{
      res.status(404).send(user);
  }
});

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000);