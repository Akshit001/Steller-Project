/*Diego Poblete #301158204, COMP 229, Section 008*/


var q = 0;
var o = [];

function createQuestion() {
    let newQuestion = document.createElement('fieldset');
    newQuestion.id = `question[${q}]`;
    newQuestion.innerHTML = 
    `<h4>Question ${q + 1}</h4>
    <input type="text" name="q[${q}]">
    <div id="options[${q}]"></div>
    <input type="button" onClick="createOption(${q})" value="New Option">`;

    document.getElementById("questionHolder").appendChild(newQuestion);

    o[q] = 0;
    q += 1;
}

function createOption(questionNumber) {
    let newOption = document.createElement('fieldset');
    newOption.id = `option[${questionNumber}][${o[questionNumber]}]`;
    newOption.innerHTML =
    `<h5>Option ${o[questionNumber] + 1}</h5>
    <input type="text" name="o[${questionNumber}][${o[questionNumber]}]">`;

    document.getElementById(`options[${questionNumber}]`).appendChild(newOption);

    o[questionNumber] += 1;
}
