var questions = [];
function addQuestion(type) {
    var questionData = {
        type: type,
        question: '',
    };
    questions.push(questionData);
    generateQuestionHTML(questionData);
}
function generateQuestionHTML(question) {
    var questionsContainer = document.getElementById('questionsContainer');
    var questionBlock = document.createElement('div');
    questionBlock.className = 'question-block';
    questionBlock.id = "question-block-" + questions.length;
    var questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionBlock.id = "question-" + questions.length;
    questionInput.className = 'question-input';
    questionInput.placeholder = 'Enter your question';
    questionInput.onchange = function (event) {
        if (event.target) {
            question.question = event.target.value;
        }
    };
    var removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.onclick = function () { return questionBlock.remove(); };
    questionBlock.appendChild(questionInput);
    if (question.type === 'choice' || question.type === 'checkbox') {
        question.options = [];
        var optionsContainer_1 = document.createElement('div');
        optionsContainer_1.className = 'options-container';
        var addOptionButton = document.createElement('button');
        addOptionButton.textContent = 'Add Option text';
        addOptionButton.onclick = function () { return addOption(optionsContainer_1, question); };
        questionBlock.appendChild(optionsContainer_1);
        questionBlock.appendChild(addOptionButton);
        // Add initial option
        addOption(optionsContainer_1, question);
    }
    else {
        var questionAnswer = document.createElement('input');
        questionAnswer.readOnly = true;
        questionAnswer.type = 'text';
        questionAnswer.className = 'question-answer';
        questionAnswer.placeholder = 'Enter your answer';
        questionBlock.appendChild(questionAnswer);
    }
    questionBlock.appendChild(removeButton);
    questionsContainer === null || questionsContainer === void 0 ? void 0 : questionsContainer.appendChild(questionBlock);
}
function addOption(container, question) {
    var _a;
    var optionInput = document.createElement('input');
    optionInput.type = 'text';
    optionInput.id = "option-" + ((_a = question.options) === null || _a === void 0 ? void 0 : _a.length);
    optionInput.className = 'option-input';
    optionInput.placeholder = 'Enter option';
    optionInput.value = '';
    optionInput.onchange = function (event) {
        if (event.target && question.options) {
            question.options[event.target.id.replace('option-', '')] = event.target.value;
        }
    };
    container.appendChild(optionInput);
}
function previewForm() {
    var formBuilder = document.querySelector('.form-builder');
    var formPreview = document.getElementById('formPreview');
    var previewContainer = document.getElementById('previewContainer');
    var formTitle = document.getElementById('formTitle').value;
    // Generate preview
    previewContainer.innerHTML = "<h1>".concat(formTitle, "</h1>");
    questions.forEach(function (q, index) {
        var _a;
        var questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';
        questionDiv.innerHTML = "\n            <p>".concat(q.question, "</p>\n            ").concat(q.type === 'text'
            ? '<input type="text" class="question-input">'
            : (_a = q.options) === null || _a === void 0 ? void 0 : _a.map(function (opt) { return "\n                    <div>\n                        <input type=\"".concat(q.type === 'choice' ? 'radio' : 'checkbox', "\" \n                               name=\"question").concat(index, "\" \n                               value=\"").concat(opt, "\">\n                        <label>").concat(opt, "</label>\n                    </div>\n                "); }).join(''), "\n        ");
        previewContainer.appendChild(questionDiv);
    });
    formBuilder.classList.add('hidden');
    formPreview.classList.remove('hidden');
}
function backToEdit() {
    var formBuilder = document.querySelector('.form-builder');
    var formPreview = document.getElementById('formPreview');
    formBuilder.classList.remove('hidden');
    formPreview.classList.add('hidden');
}
