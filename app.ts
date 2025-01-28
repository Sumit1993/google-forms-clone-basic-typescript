import { Form } from "./index";

function init(): void {
    const formsKey = 'forms'
    const formsData = localStorage.getItem(formsKey);
    const forms = JSON.parse(formsData || '[]') as Form[];
    const cardRow = document.getElementById('card-row') as HTMLElement;
    forms.forEach(form => {
        const cardColumn = document.createElement('div');
        cardColumn.className = 'column';
        cardColumn.innerHTML = `
            <div class="card">
                <button class="edit-form-button" onclick="location.href='form/edit-form.html?id=${form.id}'">
                    <i class="fa fa-edit"></i>
                </button>
                <p>${form.title}</p>
            </div>
        `;
        cardRow.appendChild(cardColumn);
    })
}

init();