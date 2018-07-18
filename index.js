'use strict';

let questionNum = 0;
let score = 0;

function generateQuestion() {
  //this function will render the STORE of all the questions and answers in the DOM
  if (questionNum < STORE.length) {
    return `<section role="region" class="questionForms">
      <form>
        <fieldset>
          <legend>${STORE[questionNum].question}</legend>
          <div>
            <span class="answers"><input type="radio" id="answer1"
            name="answer" value="${STORE[questionNum].answers[0]}" checked>
            <label for="answer1">${STORE[questionNum].answers[0]}</label></span>

            <span class="answers"><input type="radio" id="answer2"
            name="answer" value="${STORE[questionNum].answers[1]}">
            <label for="answer2">${STORE[questionNum].answers[1]}</label></span>

            <span class="answers"><input type="radio" id="answer3"
            name="answer" value="${STORE[questionNum].answers[2]}">
            <label for="answer3">${STORE[questionNum].answers[2]}</label></span>

            <span class="answers"><input type="radio" id="answer4"
            name="answer" value="${STORE[questionNum].answers[3]}">
            <label for="answer4">${STORE[questionNum].answers[3]}</label></span>
          </div>
          <div>
            <button type="submit" id="next">Submit</button>
          </div>
        </fieldset>
      </form>
    </section>
    <section role="region">
      <p class="scoreCounter">Question: <span class="questionCounter">${STORE[questionNum].questionCount}<span>/10 Score: ${score}</p>
    </section>`;
  }
  else {
    finalScores();
    startOver();
  }
}

function startQuiz() {
  $('.startPage').on('click', '.startQuiz', function (event) {
    $('.startPage').remove();
    renderQuestion();
  });
}

function changeQuestionNum() {
  questionNum++;
}

function changeScore() {
  score++;
  $('.score').text(score);
}

function renderQuestion() {
  $('.questions').html(generateQuestion());
}

function userAnswerSubmit () {
  $('.questions').on('click', '#next', function (event) {
    event.preventDefault();
    let selected = $("input:checked");
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNum].correctAnswer}`;
    if (answer == correctAnswer) {
      changeScore();
      userAnswerCorrect ();
    } else {
      userAnswerWrong ();
    }
  });
}


function userAnswerCorrect () {
  let correctAnswer = `${STORE[questionNum].correctAnswer}`;
  // $('.questionForms').remove();
  $('.questions').html(`<section role="region">
      <h2>You got it!</h2>
      <img src="https://cdn-images-1.medium.com/max/1200/1*5B1y0udOe2JOAuhBj3Hliw.gif" alt="Andy throwing petals gif" class="gif">
      <p>You know your stuff!</p>
      <button type="button" id="continue">Next Question</button>
    </section>
    <section role="region">
      <p class="scoreCounter">Question: <span class="questionCounter">${STORE[questionNum].questionCount}<span>/10 Score: ${score}</p>
    </section>`);
}

function userAnswerWrong () {
  let correctAnswer = `${STORE[questionNum].correctAnswer}`;
  // $('.questionForms').remove();
  $('.questions').html(`<section>
      <h2>Knope!</h2>
      <img src="https://78.media.tumblr.com/1e3303c5fa0a6b144758ef76651a2aa4/tumblr_inline_mscnnsH5YC1qz4rgp.gif" alt="Ron Swanson exasperated gif">
      <p>The correct answer is:<span> ${correctAnswer}</span></p>
      <button type="button" id="continue">Next Question</button>
    </section>
    <section role="region">
      <p class="scoreCounter">Question: <span class="questionCounter">${STORE[questionNum].questionCount}<span>/10 Score: ${score}</p>
    </section>`);
}

function nextQuestion() {
  $('.questions').on('click', '#continue', function (event) {
    changeQuestionNum();
    renderQuestion();
    // $('.rightOrWrongPage').remove();
  });
}

function finalScores() {
  $('.questions').html(`<h2>Congratulations!</h2>
    <img src="http://gifimage.net/wp-content/uploads/2018/04/ron-swanson-dancing-gif-7.gif" alt="Ron dancing gif">
    <p>Your final score was ${score}/10. Way to be!</p>
    <button type="button" id="startAgain">Start again</button>`)
}

function startOver() {
  $('.questions').on('click', '#startAgain', function (event) {
    location.reload();
  });
}



function createQuiz() {
  startQuiz();
  userAnswerSubmit();
  nextQuestion();
}

$(createQuiz);