"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function init() {
    var formsKey = 'forms';
    var formsData = localStorage.getItem(formsKey);
    var forms = JSON.parse(formsData || '[]');
    var cardRow = document.getElementById('card-row');
    forms.forEach(function (form) {
        var cardColumn = document.createElement('div');
        cardColumn.className = 'column';
        cardColumn.innerHTML = "\n            <div class=\"card\">\n                <button class=\"edit-form-button\" onclick=\"location.href='form/edit-form.html?id=".concat(form.id, "'\">\n                    <i class=\"fa fa-edit fa-lg\"></i>\n                </button>\n                <p class=\"text-overflow-hidden\">").concat(form.title, "</p>\n                <div style=\"display: flex; flex-direction: column;\">\n                    <button class=\"form-option-buttons\" onclick=\"location.href='form/edit-form.html?id=").concat(form.id, "'\">\n                        Copy form URL\n                    </button>                \n                    <button class=\"form-option-buttons\" onclick=\"location.href='form/response-review-form.html?id=").concat(form.id, "'\">\n                        View responses\n                    </button>\n                </div>\n            </div>\n        ");
        cardRow.appendChild(cardColumn);
    });
}
init();
