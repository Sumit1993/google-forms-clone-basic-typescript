interface Question {
    type: 'text' | 'choice' | 'checkbox';
    question: string;
    options?: string[];
}

let questions: Question[] = [];

function addQuestion(type: 'text' | 'choice' | 'checkbox'): void {
    const questionData: Question = {
        type,
        question: '',
    }
    questions.push(questionData);
    generateQuestionHTML(questionData);
}

function generateQuestionHTML(question: Question): void {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionBlock = document.createElement('div');
    questionBlock.className = 'question-block';
    questionBlock.id = "question-block-" + questions.length;

    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionBlock.id = "question-" + questions.length;
    questionInput.className = 'question-input';
    questionInput.placeholder = 'Enter your question';
    questionInput.onchange = (event: Event) => {
        if(event.target){
            question.question = (event.target  as HTMLInputElement).value
        }
    }

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.onclick = () => questionBlock.remove();

    questionBlock.appendChild(questionInput);
    if (question.type === 'choice' || question.type === 'checkbox') {
        question.options = [];
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';

        const addOptionButton = document.createElement('button');
        addOptionButton.textContent = 'Add Option text';
        addOptionButton.onclick = () => addOption(optionsContainer, question);

        questionBlock.appendChild(optionsContainer);
        questionBlock.appendChild(addOptionButton);

        // Add initial option
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
    const optionInput = document.createElement('input');
    optionInput.type = 'text';
    optionInput.id = "option-" + question.options?.length;
    optionInput.className = 'option-input';
    optionInput.placeholder = 'Enter option';
    optionInput.value = '';
    optionInput.onchange = (event: Event) => {
        if(event.target && question.options){
            question.options[(event.target  as HTMLInputElement).id.replace('option-', '')] = (event.target  as HTMLInputElement).value
        }
    }
    container.appendChild(optionInput);
}

function previewForm(): void {
    const formBuilder = document.querySelector('.form-builder') as HTMLElement;
    const formPreview = document.getElementById('formPreview') as HTMLElement;
    const previewContainer = document.getElementById('previewContainer') as HTMLElement;
    const formTitle = (document.getElementById('formTitle') as HTMLInputElement).value;
    // Generate preview
    previewContainer.innerHTML = `<h1>${formTitle}</h1>`;
    
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';
        
        questionDiv.innerHTML = `
            <p>${q.question}</p>
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
        
        previewContainer.appendChild(questionDiv);
    });

    formBuilder.classList.add('hidden');
    formPreview.classList.remove('hidden');
}

function backToEdit(): void {
    const formBuilder = document.querySelector('.form-builder') as HTMLElement;
    const formPreview = document.getElementById('formPreview') as HTMLElement;
    
    formBuilder.classList.remove('hidden');
    formPreview.classList.add('hidden');
} 