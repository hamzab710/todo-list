export default function loadForm() {
    const dialog = document.createElement('dialog');
    dialog.classList.add('task-dialog');
    document.body.appendChild(dialog);

    const form = document.createElement('form');
    form.classList.add('task-form');
    form.method = 'dialog';
    dialog.appendChild(form);

    const legend = document.createElement('legend');
    form.appendChild(legend);

    const titleHolder = document.createElement('div');
    titleHolder.id = 'title-holder';
    form.appendChild(titleHolder);

    const titleInput = document.createElement('input');
    titleInput.type = 'name';
    titleInput.id = 'title';
    titleInput.name = 'title';
    titleInput.placeholder = 'Title: Go to the Gym';
    titleInput.maxLength = 25;
    titleHolder.appendChild(titleInput);

    const detailsInput = document.createElement('textarea');
    detailsInput.name = 'details';
    detailsInput.cols = '30';
    detailsInput.rows = '5';
    detailsInput.placeholder = 'Details: Push day';
    detailsInput.id = 'details';
    detailsInput.maxLength = 250;
    form.appendChild(detailsInput);

    const dateHolder = document.createElement('div');
    dateHolder.id = 'date-holder'
    form.appendChild(dateHolder);

    const dateLabel = document.createElement('label');
    dateLabel.for = 'date';
    dateLabel.textContent = 'Due Date';
    dateHolder.appendChild(dateLabel);

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'date';
    dateInput.name = 'date';
    dateInput.placeholder = 'date: Go to the Gym';
    dateHolder.appendChild(dateInput);

    const radioHolder = document.createElement('div');
    radioHolder.id = 'radio-holder';
    form.appendChild(radioHolder);

    const radioHeader = document.createElement('p');
    radioHeader.textContent = 'Priority';
    radioHolder.appendChild(radioHeader);

    const radioContainer = document.createElement('div');
    radioHolder.appendChild(radioContainer);

    const lowInput = document.createElement('input');
    lowInput.type = 'radio';
    lowInput.name = 'priority'
    lowInput.id = 'low';
    lowInput.name = 'low';
    lowInput.value = 'Low';
    radioContainer.appendChild(lowInput);

    const lowLabel = document.createElement('label');
    lowLabel.for = 'low';
    lowLabel.textContent = 'Low';
    radioContainer.appendChild(lowLabel);

    const mediumInput = document.createElement('input');
    mediumInput.type = 'radio';
    mediumInput.name = 'priority'
    mediumInput.id = 'medium';
    mediumInput.name = 'medium';
    mediumInput.value = 'Medium';
    radioContainer.appendChild(mediumInput);

    const mediumLabel = document.createElement('label');
    mediumLabel.for = 'medium';
    mediumLabel.textContent = 'Medium';
    radioContainer.appendChild(mediumLabel);

    const highInput = document.createElement('input');
    highInput.type = 'radio';
    highInput.name = 'priority'
    highInput.id = 'high';
    highInput.name = 'high';
    highInput.value = 'High';
    radioContainer.appendChild(highInput);

    const highLabel = document.createElement('label');
    highLabel.for = 'high';
    highLabel.textContent = 'High';
    radioContainer.appendChild(highLabel);

    const selectHolder = document.createElement('div');
    selectHolder.id = 'select-holder';
    form.appendChild(selectHolder);

    const typeInput = document.createElement('select');
    typeInput.id = 'type';
    typeInput.name = 'type';
    selectHolder.appendChild(typeInput);

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Category';
    placeholder.disabled = true;
    placeholder.selected = true;
    typeInput.appendChild(placeholder);

    const household = document.createElement('option');
    household.value = 'Household';
    household.textContent = 'Household'
    typeInput.appendChild(household);

    const education = document.createElement('option');
    education.value = 'Education';
    education.textContent = 'Education'
    typeInput.appendChild(education);

    const health = document.createElement('option');
    health.value = 'Health and fitness';
    health.textContent = 'Health and fitness'
    typeInput.appendChild(health);

    const social = document.createElement('option');
    social.value = 'Social commitments';
    social.textContent = 'Social commitments'
    typeInput.appendChild(social);

    const travel = document.createElement('option');
    travel.value = 'Travel';
    travel.textContent = 'Travel'
    typeInput.appendChild(travel);

    const hobbies = document.createElement('option');
    hobbies.value = 'Hobbies and interests';
    hobbies.textContent = 'Hobbies and interests';
    typeInput.appendChild(hobbies);

    const financial = document.createElement('option');
    financial.value = 'Financial';
    financial.textContent = 'Financial'
    typeInput.appendChild(financial);

    const other = document.createElement('option');
    other.value = 'Other';
    other.textContent = 'Other'
    typeInput.appendChild(other);

    const saveButton = document.createElement('button');
    saveButton.id = 'save';
    saveButton.textContent = 'Save';
    form.appendChild(saveButton);
}