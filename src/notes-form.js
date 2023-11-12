export default function loadNotesForm() {
    const dialog = document.createElement('dialog');
    dialog.classList.add('notes-dialog');
    document.body.appendChild(dialog);

    const form = document.createElement('form');
    form.classList.add('notes-form');
    form.method = 'dialog';
    dialog.appendChild(form);

    const legend = document.createElement('legend');
    legend.classList.add('note-legend')
    form.appendChild(legend);

    const titleInput = document.createElement('input');
    titleInput.type = 'name';
    titleInput.id = 'note-title';
    titleInput.name = 'title';
    titleInput.maxLength = 20;
    titleInput.placeholder = 'Title';
    form.appendChild(titleInput);

    const detailsInput = document.createElement('textarea');
    detailsInput.name = 'details';
    detailsInput.cols = '30';
    detailsInput.rows = '5';
    detailsInput.maxLength = 250;
    detailsInput.placeholder = 'Details';
    detailsInput.id = 'note-content';
    form.appendChild(detailsInput);

    const saveButton = document.createElement('button');
    saveButton.id = 'save-note';
    saveButton.textContent = 'Save';
    form.appendChild(saveButton);
}