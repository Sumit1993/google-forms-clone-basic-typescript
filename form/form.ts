import { Form, Question } from "../index";

let form: Form;

function findGetParameter() {
    var result = {},
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            // @ts-ignore
            result[tmp[0]] = decodeURIComponent(tmp[1]);
        });
    return result;
}

function init(): void {
    const params: { id?: string } = findGetParameter();
    if (params.id) {
        const formsKey = 'forms'
        const formsData = localStorage.getItem(formsKey);
        const forms: Form[] = JSON.parse(formsData || '[]');
        const existingForm = forms.filter(form => form.id === params.id)[0];
        form = existingForm;
        if (params.id && location.pathname === '/form/edit-form.html') {
            existingForm.questions.forEach(question => generateQuestionHTML(question));
        } else if (params.id && location.pathname === '/form/response-form.html') {
            viewForm();
        }
    } else {
        form = {
            id: crypto.randomUUID(),
            published: false,
            title: '',
            questions: []
        };
    }
}

init();

function formTitleChange(value: string): void {
    form.title = value
}

function addQuestion(type: 'text' | 'choice' | 'checkbox'): void {
    const questionData: Question = {
        type,
        label: '',
    }
    form.questions.push(questionData);
    generateQuestionHTML(questionData);
}

function generateQuestionHTML(question: Question): void {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionBlock = document.createElement('div');
    questionBlock.className = 'question-block';
    questionBlock.id = "question-block-" + form.questions.length;

    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionBlock.id = "question-" + form.questions.length;
    questionInput.className = 'question-input';
    questionInput.placeholder = 'Enter your question';
    questionInput.value = question.label;
    questionInput.onchange = (event: Event) => {
        if (event.target) {
            question.label = (event.target as HTMLInputElement).value
        }
    }

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.onclick = () => questionBlock.remove();

    questionBlock.appendChild(questionInput);
    if (question.type === 'choice' || question.type === 'checkbox') {
        question.options ??= [''];
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';

        const addOptionButton = document.createElement('button');
        addOptionButton.textContent = 'Add Option text';
        addOptionButton.onclick = () => addOption(optionsContainer, question);

        questionBlock.appendChild(optionsContainer);
        questionBlock.appendChild(addOptionButton);

        addOption(optionsContainer, question);
    } else {
        const questionAnswer = document.createElement('input');
        questionAnswer.readOnly = true
        questionAnswer.type = 'text';
        questionAnswer.className = 'question-answer';
        questionAnswer.placeholder = 'Enter your answer';
        questionBlock.appendChild(questionAnswer);
    }

    questionBlock.appendChild(removeButton);
    questionsContainer?.appendChild(questionBlock);
}

function addOption(container: HTMLDivElement, question: Question): void {
    question.options?.forEach(option => {
        const optionInput = document.createElement('input');
        optionInput.type = 'text';
        optionInput.id = "option-" + question.options?.length;
        optionInput.className = 'option-input';
        optionInput.placeholder = 'Enter option';
        optionInput.value = option;
        optionInput.onchange = (event: Event) => {
            if (event.target && question.options) {
                question.options[(event.target as HTMLInputElement).id.replace('option-', '')] = (event.target as HTMLInputElement).value
            }
        }
        container.appendChild(optionInput);
    });
}

function previewForm(): void {
    const formBuilder = document.querySelector('.form-builder') as HTMLElement;
    const formPreview = document.getElementById('formPreview') as HTMLElement;
    const previewContainer = document.getElementById('previewContainer') as HTMLElement;
    // Generate preview
    previewContainer.innerHTML = `<h1>${form.title}</h1>`;
    generateFormQuestions(previewContainer);

    formBuilder.classList.add('hidden');
    formPreview.classList.remove('hidden');
}

function viewForm(): void {
    const responseContainer = document.getElementById('responseContainer') as HTMLElement;
    // Generate preview
    responseContainer.innerHTML = `<h1>${form.title}</h1>`;
    generateFormQuestions(responseContainer);
}

function generateFormQuestions(container: HTMLElement): void {
    form.questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';

        questionDiv.innerHTML = `
            <p>${q.label}</p>
            ${q.type === 'text'
                ? '<input type="text" class="question-input">'
                : q.options?.map(opt => `
                    <div>
                        <input type="${q.type === 'choice' ? 'radio' : 'checkbox'}" 
                               name="question${index}" 
                               value="${opt}">
                        <label>${opt}</label>
                    </div>
                `).join('')}
        `;

        container.appendChild(questionDiv);
    });
}

function backToEdit(): void {
    const formBuilder = document.querySelector('.form-builder') as HTMLElement;
    const formPreview = document.getElementById('formPreview') as HTMLElement;

    formBuilder.classList.remove('hidden');
    formPreview.classList.add('hidden');
}

function saveForm(): void {
    const formsKey = 'forms'
    const formsData = localStorage.getItem(formsKey);
    const forms = JSON.parse(formsData || '[]');
    if (forms && forms.length > 0) {
        localStorage.setItem(formsKey, JSON.stringify([...forms, form]));
    } else {
        localStorage.setItem(formsKey, JSON.stringify([form]));
    }
}

function publishForm(): void {
    form.published = true;
    saveForm();
    location.href = `/form/response-form.html?id=${form.id}`;
}

function submitResponse(): void {
    
}