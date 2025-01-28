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
                    <i class="fa fa-edit fa-lg"></i>
                </button>
                <p class="text-overflow-hidden">${form.title}</p>
                <div style="display: flex; flex-direction: column;">
                    <button class="form-option-buttons" onclick="location.href='form/edit-form.html?id=${form.id}'">
                        Copy form URL
                    </button>                
                    <button class="form-option-buttons" onclick="location.href='form/response-review-form.html?id=${form.id}'">
                        View responses
                    </button>
                </div>
            </div>
        `;
        cardRow.appendChild(cardColumn);
    })
}

init();