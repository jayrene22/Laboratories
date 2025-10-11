const API_URL = "http://localhost:8080/users/admin/todos";

const todoList = document.getElementById("todoList");
const form = document.getElementById("todoForm");
const input = document.getElementById("description");

async function fetchTodos() {
    const response = await fetch(API_URL);
    const todos = await response.json();

    todoList.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.className = todo.done ? "done" : "";

        const span = document.createElement("span");
        span.textContent = todo.description;

        const date = document.createElement("small");
        const formattedDate = new Date(todo.createdAt).toLocaleString();
        date.textContent = formattedDate;

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = todo.done ? "Undo" : "Done";
        toggleBtn.onclick = () => toggleTodo(todo);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTodo(todo);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTodo(todo.id);

        li.append(span, date, toggleBtn, editBtn, deleteBtn);
        todoList.appendChild(li);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const description = input.value.trim();
    if (!description) return;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, done: false })
    });

    input.value = "";
    fetchTodos();
});

async function toggleTodo(todo) {
    await fetch(`${API_URL}/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...todo, done: !todo.done })
    });
    fetchTodos();
}

async function editTodo(todo) {
    const newDesc = prompt("Edit task:", todo.description);
    if (newDesc !== null && newDesc.trim() !== "") {
        await fetch(`${API_URL}/${todo.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...todo, description: newDesc })
        });
        fetchTodos();
    }
}

async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTodos();
}

fetchTodos();

