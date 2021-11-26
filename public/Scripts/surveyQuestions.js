/*Diego Poblete #301158204, COMP 229, Section 008*/

var q = 0;
var o = [];

function createQuestion() {
    let newQuestion = document.createElement('div');
    newQuestion.innerHTML = 
    `<fieldset id="question_${q}">
        <h4>Question ${q + 1}</h4>
        <input type="text" id="q_${q}">
        <div id="o_${q}"></div>
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
    `<fieldset id="option_${questionNumber}_${o[questionNumber]}">
        <h5>Option ${o[questionNumber] + 1}</h5>
        <input type="text" id="o_${questionNumber}_${o[questionNumber]}">
    </fieldset>`
    ;

    document.getElementById("o_" + questionNumber).appendChild(newOption);

    o[questionNumber] += 1;
}

function sendData() {
    let questions = [];
    let options = [];

    for (let i = 0; i < q; i++) {
        for (let j = 0; i < o[q]; j++) {
            options[i][j] = document.getElementById(`o_${i}_${j}`).value;
        }

        questions[i] = document.getElementById(`q_${i}`).value;
    }

}