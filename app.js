'use strict';

let database = [];

const getDatabase = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setDatabase = (database) => localStorage.setItem('todoList', JSON.stringify(database));

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
    const database = getDatabase();
    database.forEach((item, index) => createItem(item.assingment, item.status, index));
}

const insertItem = (event) => {
    const key = event.key;
    const text = event.target.value;
    if(key === 'Enter') {
        const database = getDatabase();
        database.push({'assingment' : text, 'status' : ''});
        setDatabase(database);
        attScreen();
        event.target.value = '';
    }
}

const removeItem = (index) => {
    const database = getDatabase();
    database.splice(index, 1);
    setDatabase(database);
    attScreen();
}

const attItem = (index) => {
    const database = getDatabase();
    database[index].status =  database[index].status === '' ? 'checked' : '';
    setDatabase(database);
    attScreen();
}

const clickItem = (event) => {
    const element = event.target;
    if(element.type === 'button') {
        const index = element.dataset.index;
        removeItem(index);
    } else if (element.type === 'checkbox') {
        const index = element.dataset.index;
        attItem(index);
    }
}

document.getElementById('newItem').addEventListener('keypress', insertItem);
document.getElementById('todoList').addEventListener('click', clickItem);

attScreen();