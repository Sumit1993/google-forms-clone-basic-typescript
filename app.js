var questions = [];
function addQuestion(type) {
    var questionData = {
        index: questions.length,
        type: type,
        question: '',
        answer: ''
    };
    questions.push(questionData);
    generateQuestionHTML(questionData);
}
function generateQuestionHTML(question) {
    var questionsContainer = document.getElementById('questionsContainer');
    var questionBlock = document.createElement('div');
    questionBlock.className = 'question-block';
    var questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.className = 'question-input';
    questionInput.placeholder = 'Enter your question';
    questionInput.value = questions[question.index].question;
    questionInput.onchange = function (event) {
        if (event.target) {
            questions[question.index].question = event.target.value;
        }
    };
    var questionAnswer = document.createElement('input');
    questionAnswer.readOnly = true;
    questionAnswer.type = 'text';
    questionAnswer.className = 'question-answer';
    questionAnswer.placeholder = 'Enter your answer';
    var removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.onclick = function () { return questionBlock.remove(); };
    questionBlock.appendChild(questionInput);
    questionBlock.appendChild(questionAnswer);
    questionBlock.appendChild(removeButton);
    questionsContainer === null || questionsContainer === void 0 ? void 0 : questionsContainer.appendChild(questionBlock);
}
function previewForm() {
}
