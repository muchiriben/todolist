//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);
filterOption.addEventListener("click", filterTodo);

//functions
function addTodo(event) {
  //prevent form from submitting and refrshing
  event.preventDefault();

  //todoDiv
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //ADD TODO TO LOCAL STORAGE
  saveLocalTodos(todoInput.value);

  //check mark btn
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //check trash btn
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //append todoList
  todoList.appendChild(todoDiv);
  //clear input value
  todoInput.value = "";
}

function deletecheck(e) {
  const item = e.target;
  //delete todo

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //delete animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //checked mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//filter todo list
function filterTodo(e) {
  const todos = todoList.childNodes;

  for (let i = 1; i < todos.length; i++) {
    switch (e.target.value) {
      case "all":
        todos[i].style.display = "flex";
        break;
      case "completed":
        if (todos[i].classList.contains("completed")) {
          todos[i].style.display = "flex";
        } else {
          todos[i].style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todos[i].classList.contains("completed")) {
          todos[i].style.display = "flex";
        } else {
          todos[i].style.display = "none";
        }
        break;
    }
  }
}

//save to localStorage
function saveLocalTodos(todo) {
  //check existing todo
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //check existing todo
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  for (let i = 0; i < todos.length; i++) {
    //todoDiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todos[i];
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //check mark btn
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //check trash btn
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append todoList
    todoList.appendChild(todoDiv);
  }
}

function removeLocalTodos(todo) {
  let todos;
  //check for todos
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
