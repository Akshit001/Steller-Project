/*Diego Poblete #301158204, COMP 229, Section 008*/

var q = 0;
var o = [];

function createQuestion() {
    let newQuestion = document.createElement('fieldset');
    newQuestion.id = `question[${q}]`;
    newQuestion.innerHTML = 
    `<h4>Question ${q + 1}</h4>
    <input type="hidden" name="q[${q}][0]">
    <input type="text" name="q[${q}][1]" required>
    <div id="options[${q}]"></div>
    <input type="button" onClick="createOption(${q})" value="New Option">
    <input type="button" onClick="deleteQuestion(${q})" value="Delete Question">`;

    document.getElementById("questionHolder").appendChild(newQuestion);

    o[q] = 0;
    q += 1;
}

function createOption(questionNumber) {
    let newOption = document.createElement('fieldset');
    newOption.id = `option[${questionNumber}][${o[questionNumber]}]`;
    newOption.innerHTML =
    `<h5>Option ${o[questionNumber] + 1}</h5>
    <input type="hidden" name="o[${questionNumber}][${o[questionNumber]}][0]">
    <input type="text" name="o[${questionNumber}][${o[questionNumber]}][1]" required>
    <input type="button" onClick="deleteOption(${[questionNumber, o[questionNumber]]})" value="Delete Option">`;

    document.getElementById(`options[${questionNumber}]`).appendChild(newOption);

    o[questionNumber] += 1;
}

function deleteQuestion(questionNumber) {
    document.getElementById(`question[${questionNumber}]`).remove();
}

function deleteOption(questionNumber, optionNumber) {
    document.getElementById(`option[${questionNumber}][${optionNumber}]`).remove();
}

function loadQuestions() {
    while (q =! queList.length) {
        queList.forEach((que) => { 
            document.getElementById("questionHolder").appendChild(
            `<fieldset id="question[${q}]">
                <h4>Question ${que.questionNumber + 1}</h4>
                <input type="hidden" name="q[${q}][0]" value="<%= que._id %>">
                <input type="text" name="q[${q}][1]" value="<%= que.question %>" required>
                <div id="options[${q}]"></div>
                <input type="button" onClick="createOption(${q})" value="New Option">
                <input type="button" onClick="deleteQuestion(${q})" value="Delete Question">
            </fieldset>`);

            q += 1;
            o[q] = 0;

            optList.forEach((opt) => {
                if (opt[0].questionId === que._id) {
                    opt.forEach((oo) => { 
                        if (oo.optionNumber == o[q]) {
                            document.getElementById(`options[${questionNumber}]`).appendChild(
                            `<fieldset id="option[${q}][o[${q}]">
                                <h5>Option ${o[questionNumber] + 1}</h5>
                                <input type="hidden" name="o[${questionNumber}][${o[questionNumber]}][0]" value="<%= opt._id %>">
                                <input type="text" name="o[${questionNumber}][${o[questionNumber]}][0][1]" value="<%= opt.option %>" required>
                                <input type="button" onClick="deleteOption(${[questionNumber, o[questionNumber]]})" value="Delete Option">>
                            </fieldset>`);
                            o[q] += 1;
                        }
                    });
                }
            });
        });
    }
}