import { differenceInCalendarDays } from 'date-fns'

export default function loadTasks() {
    const addButton = document.getElementById('create-task');
    addButton.textContent = 'Add task';

    const dialog = document.querySelector('.task-dialog');
    const legend = document.querySelector('legend');
    const form = document.querySelector('.task-form');
    const container = document.getElementById('container');

    addButton.textContent = 'Add task';
    
    let myTasks = [];
    
    addToLocalStorage();
    
    function Task(title, details, date, priority, type) {
        this.title = title,
        this.details = details,
        this.date = date,
        this.priority = priority,
        this.type = type,
        this.isDone = false,
        this.id = Math.floor(Math.random()*100000);
    }
    
    addButton.addEventListener('click', () => {
        if (addButton.textContent == 'Add task') {
            legend.textContent = 'New task';
            dialog.showModal();
        }
    })
    
    form.addEventListener('submit', (event) => {
        if (legend.textContent == 'New task') {
            event.preventDefault();
            const titleInput = document.getElementById('title');
            const detailsInput = document.getElementById('details');
            const dateInput = document.getElementById('date');
            const priorityInput = document.querySelector('input[type=radio]:checked');
            const typeInput = document.getElementById('type');
        
            const newTask = new Task(`${titleInput.value}`, `${detailsInput.value}`, `${dateInput.value}`,`${priorityInput.value}`,`${typeInput.value}`);
            myTasks.push(newTask);
            saveAndRenderTask();
            dialog.close();

            titleInput.value = '';;
            detailsInput.value = '';
            dateInput.value = '';
            if (priorityInput) {
                priorityInput.checked = false;
            }
            typeInput.value = '';
        }
    })
    
    document.addEventListener('click', function (event) {
        if (event.target === dialog) {
            dialog.close();
        }
    });
    
    function TaskContainer(task) {
        this.element = document.createElement('div');
        this.element.id = 'task-container';
        this.element.dataset.id = task.id;
    
        this.isDone = document.createElement('input');
        this.isDone.type = 'checkbox';
        this.isDone.classList.add('isDone');
        this.element.appendChild(this.isDone);
    
        this.isDone.addEventListener('click' , () => {
            if (this.isDone.checked) {
                task.isDone = true;
                this.element.classList.add('done-task')
            } else {
                task.isDone = false;
                this.element.classList.remove('done-task')
            }
        })
    
        this.title = document.createElement('h2');
        this.title.classList.add('title');
        this.title.textContent = task.title;
        this.element.appendChild(this.title);
    
        this.detailsButton = document.createElement('button');
        this.detailsButton.classList.add('details-button');
        this.detailsButton.textContent = 'Details';
        this.element.appendChild(this.detailsButton);
    
        this.detailsButton.addEventListener('click', () => {
            openModal(task)
        })
    
        this.date = document.createElement('p');
        this.date.classList.add('date');
        this.date.textContent = `${differenceInCalendarDays(new Date(task.date), new Date())} days left`;
        this.element.appendChild(this.date);
    
        this.priority = document.createElement('p');
        this.priority.classList.add('priority');
        this.priority.textContent = task.priority;
        this.element.appendChild(this.priority);
    
        this.type = document.createElement('p');
        this.type.classList.add('type');
        this.type.textContent = task.type;
        this.element.appendChild(this.type);
    
        this.iconContainer = document.createElement('div');
        this.iconContainer.classList.add('icon-container');
        this.element.appendChild(this.iconContainer);
    
        this.editIcon = document.createElement('img');
        this.editIcon.classList.add('edit-icon');
        this.editIcon.src = 'icons/edit.svg';
        this.iconContainer.appendChild(this.editIcon);
    
        let currentlyEditedTask = null;
    
        this.editIcon.addEventListener('click', () => {
            currentlyEditedTask = task;
            legend.textContent = 'Edit Task';
            dialog.showModal();
            form.addEventListener('submit', (e) => {
                if (currentlyEditedTask) {
                    e.preventDefault();
                    const titleInput = document.getElementById('title');
                    const detailsInput = document.getElementById('details');
                    const dateInput = document.getElementById('date');
                    const priorityInput = document.querySelector('input[type=radio]:checked');
                    const typeInput = document.getElementById('type');
    
                    const title = titleInput.value;
                    const details = detailsInput.value;
                    const date = dateInput.value;
                    const priority = priorityInput.value;
                    const type = typeInput.value;
    
                    currentlyEditedTask.title = title;
                    currentlyEditedTask.details = details;
                    currentlyEditedTask.date = date;
                    currentlyEditedTask.priority = priority;
                    currentlyEditedTask.type = type;
    
                    saveAndRenderTask();
                    dialog.close();
                    currentlyEditedTask = null;

                    titleInput.value = '';;
                    detailsInput.value = '';
                    dateInput.value = '';
                    if (priorityInput) {
                        priorityInput.checked = false;
                    }
                    typeInput.value = '';
    
                }
            })
        })
    
        this.deleteIcon = document.createElement('img');
        this.deleteIcon.classList.add('delete-icon');
        this.deleteIcon.src = 'icons/delete.svg';
        this.iconContainer.appendChild(this.deleteIcon);
    
        this.deleteIcon.addEventListener('click', () => {
            let index = myTasks.findIndex((t) => t.id === task.id);
            myTasks.splice(index, 1);
            saveAndRenderTask();
        })
    }
    
    function openModal(task) {
        // Create a modal container
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        document.body.appendChild(modalContainer);
    
        // Create the modal content
        const modal = document.createElement('div');
        modal.id = 'modal';
        modalContainer.appendChild(modal);
    
        const modalTitle = document.createElement('h2');
        modalTitle.classList.add('modal-title');
        modalTitle.textContent = task.title;
        modal.appendChild(modalTitle);
    
        const modalDetails = document.createElement('p');
        modalDetails.classList.add('modal-details');
        modalDetails.textContent = task.details;
        modal.appendChild(modalDetails);
    
        const modalDate = document.createElement('p');
        modalDate.classList.add('modal-date');
        modalDate.textContent = `${differenceInCalendarDays(new Date(task.date), new Date())} days left`;
        modal.appendChild(modalDate);
    
        const modalPriority = document.createElement('p');
        modalPriority.classList.add('modal-priority');
        modalPriority.textContent = `Priority: ${task.priority}`;
        modal.appendChild(modalPriority);
    
        const modalType = document.createElement('p');
        modalType.classList.add('modal-type');
        modalType.textContent = `Category: ${task.type}`;
        modal.appendChild(modalType);
    
        document.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                closeModal()
            }
        })
    }
    
    
    function closeModal() {
        const modalContainer = document.getElementById('modal-container');
        document.body.removeChild(modalContainer);
    }
    
    function renderTask() {
        container.innerHTML = '';
        for (let i = 0; i < myTasks.length; i++) {
            const newTask = myTasks[i];
            const newTaskContainer = new TaskContainer(newTask);
            container.appendChild(newTaskContainer.element);
        }
    }
    
    function saveAndRenderTask() {
        localStorage.setItem('tasks', JSON.stringify(myTasks));
        renderTask();
    }
    
    function addToLocalStorage() {
        myTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        saveAndRenderTask();
    }
    
    const tasksButton = document.getElementById('tasks')
    const houseButton = document.getElementById('household');
    const educationButton =document.getElementById('education');
    const healthButton = document.getElementById('health');
    const socialButton = document.getElementById('social');
    const travelButton = document.getElementById('travel');
    const hobbiesButton = document.getElementById('hobbies');
    const financialButton = document.getElementById('financial');
    const otherButton = document.getElementById('other');
    
    tasksButton.addEventListener('click', () => {
        renderTask()
    });
    houseButton.addEventListener('click', () => {
        filterTasks('Household');
    });
    educationButton.addEventListener('click', () => {
        filterTasks('Education');
    });
    healthButton.addEventListener('click', () => {
        filterTasks('Health and fitness');
    });
    socialButton.addEventListener('click', () => {
        filterTasks('Social commitments');
    });
    travelButton.addEventListener('click', () => {
        filterTasks('Travel');
    });
    hobbiesButton.addEventListener('click', () => {
        filterTasks('Hobbies and interests');
    });
    financialButton.addEventListener('click', () => {
        filterTasks('Financial');
    });
    otherButton.addEventListener('click', () => {
        filterTasks('Other');
    });
    
    function filterTasks(type) {
        container.style.display = 'flex';
        container.innerHTML = '';
        for (let i = 0; i < myTasks.length; i++) {
            const filteredTask = myTasks[i];
            if (filteredTask.type == type) {
                const filteredTaskContainer = new TaskContainer(filteredTask);
                container.appendChild(filteredTaskContainer.element);
            }
        }
    }
    
}