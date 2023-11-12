export default function loadNotes() {
    const addButton = document.getElementById('create-task');
    const noteDialog = document.querySelector('.notes-dialog');
    const legend = document.querySelector('.note-legend');
    const form = document.querySelector('.notes-form');
    const container = document.getElementById('container');
    
    let myNotes = [];
    
    addToLocalStorage();
    
    function Note(title, content) {
        this.title = title,
        this.content = content,
        this.id = Math.floor(Math.random()*100000)
    }
    
    addButton.addEventListener('click', () => {
        if (addButton.textContent == 'Add note') {
            legend.textContent = 'New note';
            noteDialog.showModal();
        }
    });
    
    form.addEventListener('submit', (event) => {
        if (legend.textContent == 'New note') {
            event.preventDefault();
            const titleInput = document.getElementById('note-title');
            const contentInput = document.getElementById('note-content');
        
            const newNote = new Note(`${titleInput.value}`, `${contentInput.value}`);
            myNotes.push(newNote);
            saveAndRenderNotes();
            noteDialog.close();

            titleInput.value = '';
            contentInput.value = '';
        }
    });
    
    document.addEventListener('click', function (event) {
        if (event.target === noteDialog) {
            noteDialog.close();
        }
    });
    
    function NoteContainer(note) {
        this.element = document.createElement('div');
        this.element.id = 'note-container';
        this.element.dataset.id = note.id;

        this.image = document.createElement('img');
        this.image.src = 'images/note.png';
        this.image.id = 'note-image';
        this.element.appendChild(this.image);

        this.image.addEventListener('click',(event) => {
            if (event.target === this.image) {
                openModal(note);
            }
        });
    
        this.title = document.createElement('h2');
        this.title.classList.add('note-title');
        this.title.textContent = note.title;
        this.element.appendChild(this.title);
    
        this.content = document.createElement('p');
        this.content.classList.add('note-content');
        this.content.textContent = note.content;
        this.element.appendChild(this.content);
    
        this.editButton = document.createElement('button');
        this.editButton.classList.add('edit-button');
        this.editButton.textContent = 'Edit';
        this.element.appendChild(this.editButton);
    
        let currentlyEditedNote = null;
    
        this.editButton.addEventListener('click', () => {
            currentlyEditedNote = note;
            legend.textContent = 'Edit Note';
            noteDialog.showModal();
            form.addEventListener('submit', (e) => {
                if (currentlyEditedNote) {
                    e.preventDefault();
                    const titleInput = document.getElementById('note-title');
                    const contentInput = document.getElementById('note-content');
    
                    const title = titleInput.value;
                    const details = contentInput.value;
    
                    currentlyEditedNote.title = title;
                    currentlyEditedNote.details = details;
    
                    saveAndRenderNotes();
                    noteDialog.close();
                    currentlyEditedNote = null;

                    titleInput.value = '';
                    contentInput.value = '';
                }
            })
        })
    
        this.deleteButton = document.createElement('button');
        this.deleteButton.classList.add('delete-button');
        this.deleteButton.textContent = 'Delete';
        this.element.appendChild(this.deleteButton);
    
        this.deleteButton.addEventListener('click', () => {
            let index = myNotes.findIndex((n) => n.id === note.id);
            myNotes.splice(index, 1);
            saveAndRenderNotes();
        })
    }
    
    function renderNotes() {
        container.innerHTML = '';
        for (let i = 0; i < myNotes.length; i++) {
            const newNote = myNotes[i];
            const newNoteContainer = new NoteContainer(newNote);
            container.appendChild(newNoteContainer.element);
        }
    }
    
    function saveAndRenderNotes() {
        localStorage.setItem('notes', JSON.stringify(myNotes));
        renderNotes();
    }
    
    function addToLocalStorage() {
        myNotes = JSON.parse(localStorage.getItem('notes')) || [];
        saveAndRenderNotes();
    }

    function openModal(note) {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'note-modal-container';
        document.body.appendChild(modalContainer);

        const modal = document.createElement('div');
        modal.id = 'note-modal';
        modalContainer.appendChild(modal);
    
        const modalTitle = document.createElement('h2');
        modalTitle.classList.add('note-modal-title');
        modalTitle.textContent = note.title;
        modal.appendChild(modalTitle);
    
        const modalDetails = document.createElement('p');
        modalDetails.classList.add('note-modal-details');
        modalDetails.textContent = note.content;
        modal.appendChild(modalDetails);
    
        document.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                closeModal()
            }
        })
    }

    function closeModal() {
        const modalContainer = document.getElementById('note-modal-container');
        document.body.removeChild(modalContainer);
    }
}