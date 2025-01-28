interface Question {
    type: 'text' | 'choice' | 'checkbox';
    question: string;
    options?: string[];
}

let questions: Question[] = [];

function addQuestion(type: 'text' | 'choice' | 'checkbox'): void {
    const questionData = {
        index: questions.length,
        type,
        question: '',
        answer: ''
    }
    questions.push(questionData);
    generateQuestionHTML(questionData);
}

function generateQuestionHTML(question): void {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionBlock = document.createElement('div');
    questionBlock.className = 'question-block';

    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.className = 'question-input';
    questionInput.placeholder = 'Enter your question';
    questionInput.value = questions[question.index].question
    questionInput.onchange = (event: Event) => {
        if(event.target){
            questions[question.index].question = (event.target  as HTMLInputElement).value
        }
    }

    const questionAnswer = document.createElement('input');
    questionAnswer.readOnly = true
    questionAnswer.type = 'text';
    questionAnswer.className = 'question-answer';
    questionAnswer.placeholder = 'Enter your answer';

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.onclick = () => questionBlock.remove();

    questionBlock.appendChild(questionInput);
    questionBlock.appendChild(questionAnswer);

    questionBlock.appendChild(removeButton);
    questionsContainer?.appendChild(questionBlock);
}

function previewForm(): void {
}