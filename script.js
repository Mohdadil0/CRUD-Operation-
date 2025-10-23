document.addEventListener("DOMContentLoaded", loadUsers);

const userForm = document.getElementById("userForm");
const userTable = document.getElementById("userTable");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const userIdInput = document.getElementById("userId");
const submitBtn = document.getElementById("submitBtn");

userForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const id = userIdInput.value;

  if (id) {
    updateUser(id, name, email);
  } else {
    addUser(name, email);
  }
  userForm.reset();
  userIdInput.value = "";
  submitBtn.textContent = "Add User";
});

function loadUsers() {
  const users = getUsers();
  renderTable(users);
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function setUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function addUser(name, email) {
  const users = getUsers();
  users.push({ id: Date.now().toString(), name, email });
  setUsers(users);
  renderTable(users);
}

function updateUser(id, name, email) {
  let users = getUsers();
  users = users.map(u => u.id === id ? { id, name, email } : u);
  setUsers(users);
  renderTable(users);
}

function deleteUser(id) {
  let users = getUsers();
  users = users.filter(u => u.id !== id);
  setUsers(users);
  renderTable(users);
}

function editUser(id) {
  const users = getUsers();
  const user = users.find(u => u.id === id);
  nameInput.value = user.name;
  emailInput.value = user.email;
  userIdInput.value = user.id;
  submitBtn.textContent = "Update User";
}

function renderTable(users) {
  userTable.innerHTML = users.map(user => `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editUser('${user.id}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.id}')">Delete</button>
      </td>
    </tr>
  `).join("");
}

// Expose functions for inline onclick
window.editUser = editUser;
window.deleteUser = deleteUser;
