//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//event listeners
todoButton.addEventListener('click',addTodo);

//functions
function addTodo(event){

	//prevent form from submitting and refrshing
	event.preventDefault();

	//todoDiv
	const todoDiv = document.createElement('div');
	todoDiv.classList.add("todo");

	//create li
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);

	//check mark btn
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);

	//check trash btn
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);

	//append todoList
	todoList.appendChild(todoDiv);
	//clear input value
	todoInput.value = "";
}