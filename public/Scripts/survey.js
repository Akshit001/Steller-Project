/*Diego Poblete #301158204, COMP 229, Section 008*/


var q = 0;
var o = [];

function createQuestion() {
    let newQuestion = document.createElement('div');
    newQuestion.innerHTML = 
    `<fieldset id="question[${q}]" name="question[${q}]">
        <h4>Question ${q + 1}</h4>
        <input type="text" name="q[${q}]">
        <div id="options[${q}]"></div>
        <input type="button" onClick="createOption(${q})" value="New Option">
    </fieldset>`
    ;

    document.getElementById("questionHolder").appendChild(newQuestion);

    o[q] = 0;
    q += 1;
}

function createOption(questionNumber) {
    let newOption = document.createElement('div');
    newOption.innerHTML =
    `<fieldset id="option[${questionNumber}][${o[questionNumber]}]">
        <h5>Option ${o[questionNumber] + 1}</h5>
        <input type="text" name="o[${questionNumber}][${o[questionNumber]}]">
    </fieldset>`
    ;

    document.getElementById(`o[${questionNumber}]`).appendChild(newOption);

    o[questionNumber] += 1;
}
