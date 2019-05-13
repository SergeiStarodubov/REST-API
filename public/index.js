const getUsers = () => {
  fetch("/api/users").
    then((response) => response.json()).
    then((response) => {
      let table = document.querySelector("tbody");
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

getUsers();