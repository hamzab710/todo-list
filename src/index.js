import loadNotes from './notes-page.js'
import loadTasks from './task-page.js'
import loadNotesForm from './notes-form.js';
import loadForm from './form-loader.js';

const tasksButton = document.getElementById('tasks');
const notesButton = document.getElementById('notes');
const container = document.querySelector('#container');

function init() {
    const addButton = document.getElementById('create-task');
    addButton.textContent = 'Add task';
    container.style.display = 'flex';
    loadForm();
    loadNotesForm();
    loadTasks();
}

notesButton.addEventListener('click', () => {
    container.textContent = '';
    container.style.display = 'grid';
    const addButton = document.getElementById('create-task');
    addButton.textContent = 'Add note';
    if (addButton.textContent = 'Add note') {
        loadNotes();
    }
});
tasksButton.addEventListener('click', () => {
    container.textContent = '';
    container.style.display = 'flex';
    const addButton = document.getElementById('create-task');
    addButton.textContent = 'Add task';
    if (addButton.textContent = 'Add task') {
        loadTasks();
    }
});

init();