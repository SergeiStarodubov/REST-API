let editLinks;

const getUsers = () => {
  fetch("/api/users").
    then((response) => response.json()).
    then((response) => {
      let table = document.querySelector("tbody");
      table.innerHTML = "";
      response.forEach(person => {
        let tr = document.createElement("tr");
        tr.innerHTML = "";
        for (let key in person) {
          tr.innerHTML += `<td>${person[key]}</td>`;
        }
        tr.innerHTML +=  "<td style = 'text-align: center'><a href='#' class = 'edit'>Edit</a> | <a href='#' class = 'remove'>Remove</a></td>";
        table.appendChild(tr);
      });
    }).then(() => {
      editLinks = document.querySelectorAll(".edit");
      editLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          let currentTr = e.target.closest("tr");
          let form = document.forms['userForm'];
          form.elements["id"].value = currentTr.children[0].innerHTML;
          form.elements["name"].value = currentTr.children[1].innerHTML;
          form.elements["age"].value = currentTr.children[2].innerHTML;
        });  
      })
    })
};

const getUser = (id) => {
  fetch("/api/users/" + id).
    then((res) => res.json()).
    then((res) => {
      let form = document.forms["userForm"];
      form.elements["id"].value = res.id;
      form.elements["name"].value = res.name;
      form.elements["age"].value = res.age;
    }).catch((error) => console.log(error));
};

const createUser = (name, age) => {
  fetch("/api/users", {
    method: "post",
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      name: name, 
      age: age
    })
  }).then(() => {
    getUsers();
  })
  .catch((err) => console.log(err));
}

const editUser = (id, name, age) => {
  fetch("/api/users", {
    method: "put",
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      id: id,
      name: name, 
      age: age
    })
  }).then(() => {
    getUsers();
  })
}

getUsers();

document.forms["userForm"].addEventListener("submit", function (e) {
  e.preventDefault();
  const id = this.elements["id"].value;
  const name = this.elements["name"].value;
  const age = this.elements["age"].value;
  if (id == 0)
      createUser(name, age);
  else
      editUser(id, name, age);
});

document.querySelector("#reset").addEventListener("click",(e) => {
  let form = document.forms["userForm"];
  form.elements["id"].value = 0;
  form.elements["name"].value = "";
  form.elements["age"].value = "";
});