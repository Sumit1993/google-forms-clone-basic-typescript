"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var form;
var formResponse;
function findGetParameter() {
    var result = {}, tmp = [];
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
function init() {
    var params = findGetParameter();
    if (params.id) {
        var formsKey = 'forms';
        var formsData = localStorage.getItem(formsKey);
        var forms = JSON.parse(formsData || '[]');
        var existingForm = forms.filter(function (form) { return form.id === params.id; })[0];
        form = existingForm;
        if (location.pathname === '/form/edit-form.html') {
            existingForm.questions.forEach(function (question) { return generateQuestionHTML(question, true); });
        }
        else if (location.pathname === '/form/response-form.html') {
            viewForm();
        }
        else if (location.pathname === '/form/response-review-form.html') {
            var responseKey = form.id;
            var responseData = localStorage.getItem(responseKey);
            var formResponses = JSON.parse(responseData || '[]');
            formResponses.forEach(function (formResponse, index) { return viewFormResponses(formResponse.responses, index); });
        }
    }
    else {
        form = {
            id: crypto.randomUUID(),
            published: false,
            title: 'Untitled form',
            questions: []
        };
    }
    var formTitleElement = document.getElementById('formTitle');
    formTitleElement.value = form.title;
}
init();
function formTitleChange(value) {
    form.title = value;
}
function addQuestion(type) {
    var questionData = {
        type: type,
        label: '',
    };
    form.questions.push(questionData);
    generateQuestionHTML(questionData);
}
function generateQuestionHTML(question, isEditInit) {
    var _a, _b;
    var questionsContainer = document.getElementById('questionsContainer');
    var questionBlock = document.createElement('div');
    questionBlock.className = 'question-block';
    questionBlock.id = "question-block-" + form.questions.length;
    var questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionBlock.id = "question-" + form.questions.length;
    questionInput.className = 'question-input';
    questionInput.placeholder = 'Enter your question';
    questionInput.value = question.label;
    questionInput.onchange = function (event) {
        if (event.target) {
            question.label = event.target.value;
        }
    };
    var removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.onclick = function () { return questionBlock.remove(); };
    questionBlock.appendChild(questionInput);
    if (question.type === 'choice' || question.type === 'checkbox') {
        (_a = question.options) !== null && _a !== void 0 ? _a : (question.options = ['']);
        var optionsContainer_1 = document.createElement('div');
        optionsContainer_1.className = 'options-container';
        var addOptionButton = document.createElement('button');
        addOptionButton.textContent = 'Add Option text';
        addOptionButton.onclick = function () {
            var _a;
            (_a = question.options) === null || _a === void 0 ? void 0 : _a.push('');
            addOption(optionsContainer_1, question, '');
        };
        questionBlock.appendChild(optionsContainer_1);
        questionBlock.appendChild(addOptionButton);
        if (isEditInit) {
            (_b = question.options) === null || _b === void 0 ? void 0 : _b.forEach(function (option) {
                addOption(optionsContainer_1, question, option);
            });
        }
        else {
            addOption(optionsContainer_1, question, '');
        }
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
function addOption(container, question, option) {
    var _a;
    var optionInput = document.createElement('input');
    optionInput.type = 'text';
    optionInput.id = "option-" + (((_a = question.options) === null || _a === void 0 ? void 0 : _a.length) - 1);
    optionInput.className = 'option-input';
    optionInput.placeholder = 'Enter option';
    optionInput.value = option;
    optionInput.onchange = function (event) {
        if (event.target && question.options) {
            // @ts-ignore
            question.options[event.target.id.replace('option-', '')] = event.target.value;
        }
    };
    container.appendChild(optionInput);
}
function previewForm() {
    var formBuilder = document.querySelector('.form-builder');
    var formPreview = document.getElementById('formPreview');
    var previewContainer = document.getElementById('previewContainer');
    // Generate preview
    previewContainer.innerHTML = "<h1>".concat(form.title, "</h1>");
    generateFormQuestions(previewContainer);
    formBuilder.classList.add('hidden');
    formPreview.classList.remove('hidden');
}
function viewForm() {
    var responseContainer = document.getElementById('responseContainer');
    // Generate preview
    responseContainer.innerHTML = "<h1>".concat(form.title, "</h1>");
    generateFormQuestions(responseContainer);
}
function viewFormResponses(responses, index) {
    var responseContainer = document.getElementById('responseContainer');
    var formTitleElement = document.createElement('h1');
    formTitleElement.innerHTML = "".concat(form.title, " - Response ").concat(index);
    responseContainer.appendChild(formTitleElement);
    generateFormResponses(responseContainer, responses, true);
}
function generateFormResponses(container, response, isResponse) {
    form.questions.forEach(function (q, index) {
        var _a;
        var questionDiv = document.createElement('div');
        questionDiv.className = isResponse ? 'response-block' : 'question-block';
        questionDiv.innerHTML = "\n            <p>".concat(q.label, "</p>\n            ").concat(q.type === 'text'
            ? "<input type=\"text\" name=\"question".concat(index, "\" class=\"question-input\"\n                    value=\"").concat(isResponse && (response === null || response === void 0 ? void 0 : response.length) ? response[index] : '', "\"\n                    ").concat(isResponse ? 'readonly disabled' : '', ">")
            : (_a = q.options) === null || _a === void 0 ? void 0 : _a.map(function (opt) { return "\n                    <div>\n                        <input type=\"".concat(q.type === 'choice' ? 'radio' : 'checkbox', "\" \n                               name=\"question").concat(index, "\" \n                               value=\"").concat(opt, "\" \n                               ").concat(isResponse ? 'readonly disabled ' : '', "\n                               ").concat(isResponse && (response === null || response === void 0 ? void 0 : response.length) && response[index] === opt ? 'checked' : '', ">\n                        <label>").concat(opt, "</label>\n                    </div>\n                "); }).join(''), "\n        ");
        container.appendChild(questionDiv);
    });
}
function generateFormQuestions(container, response, isResponse) {
    form.questions.forEach(function (q, index) {
        var _a;
        var questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';
        questionDiv.innerHTML = "\n            <p>".concat(q.label, "</p>\n            ").concat(q.type === 'text'
            ? '<input type="text" class="question-input">'
            : (_a = q.options) === null || _a === void 0 ? void 0 : _a.map(function (opt) { return "\n                    <div>\n                        <input type=\"".concat(q.type === 'choice' ? 'radio' : 'checkbox', "\" \n                               name=\"question").concat(index, "\" \n                               value=\"").concat(opt, "\">\n                        <label>").concat(opt, "</label>\n                    </div>\n                "); }).join(''), "\n        ");
        container.appendChild(questionDiv);
    });
}
function backToEdit() {
    var formBuilder = document.querySelector('.form-builder');
    var formPreview = document.getElementById('formPreview');
    formBuilder.classList.remove('hidden');
    formPreview.classList.add('hidden');
}
function saveForm() {
    var formsKey = 'forms';
    var formsData = localStorage.getItem(formsKey);
    var forms = JSON.parse(formsData || '[]');
    if (forms && forms.length > 0) {
        var filteredForms = forms.filter(function (existingForm) { return existingForm.id !== form.id; });
        localStorage.setItem(formsKey, JSON.stringify(__spreadArray(__spreadArray([], filteredForms, true), [form], false)));
    }
    else {
        localStorage.setItem(formsKey, JSON.stringify([form]));
    }
    alert('Form save successfully');
}
function publishForm() {
    form.published = true;
    saveForm();
    location.href = "/form/response-form.html?id=".concat(form.id);
}
function submitResponse() {
    var response = {
        id: crypto.randomUUID(),
        formId: form.id,
        responses: []
    };
    for (var i = 0; i < document.forms[0].length; i++) {
        var input = document.forms[0][i];
        if (input.type == 'text') {
            response.responses.push(input.value);
        }
        if ((input.type == 'radio' || input.type == 'checkbox') && input.checked) {
            response.responses.push(input.value);
        }
    }
    var responseKey = form.id;
    var responseData = localStorage.getItem(responseKey);
    var responses = JSON.parse(responseData || '[]');
    if (responses && responses.length > 0) {
        localStorage.setItem(responseKey, JSON.stringify(__spreadArray(__spreadArray([], responses, true), [response], false)));
    }
    else {
        localStorage.setItem(responseKey, JSON.stringify([response]));
    }
}
