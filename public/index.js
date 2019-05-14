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
        table.appendChild(tr);
      });
    });
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

getUsers();
