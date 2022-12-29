'use strict';

let database = [
    {'assingment' : 'Estudar JS', 'status' : ''}
]

const createItem = (assingment, status, index) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}>
        <div>${assingment}</div>
        <input type="button" value="X" data-index=${index}>
    `
    document.getElementById('todoList').appendChild(item);
}

const clearAssingments = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const attScreen = () => {
    clearAssingments();
    database.forEach((item, index) => createItem(item.assingment, item.status, index));
}

const insertItem = (event) => {
    const key = event.key;
    const text = event.target.value;
    if(key === 'Enter') {
        database.push({'assingment' : text, 'status' : ''})
        attScreen();
        event.target.value = '';
    }
}

const removeItem = (index) => {
    database.splice(index, 1);
    attScreen();
}

const clickItem = (event) => {
    const element = event.target;
    if(element.type === 'button') {
        const index = element.dataset.index;
        removeItem(index);
    }
}

document.getElementById('newItem').addEventListener('keypress', insertItem);
document.getElementById('todoList').addEventListener('click', clickItem);

attScreen();