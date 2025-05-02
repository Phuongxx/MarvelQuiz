const marvelQuestions = [
  {
    id: "black-panther-name",
    question: "What is the real name of Black Panther?",
    answerA: "M'Baku",
    answerB: "T'Challa",
    answerC: "Zuri",
    answerD: "N'Jadaka",
    correctAnswer: "answerB",
  },
  {
    id: "first-avengers-villain",
    question: "Who is the villain in the first Avengers movie (2012)?",
    answerA: "Red Skull",
    answerB: "Ultron",
    answerC: "Loki",
    answerD: "Thanos",
    correctAnswer: "answerC",
  },
  {
    id: "wolverine-metal",
    question: "What metal is bonded to Wolverine's skeleton?",
    answerA: "Vibranium",
    answerB: "Adamantium",
    answerC: "Titanium",
    answerD: "Carbonadium",
    correctAnswer: "answerB",
  },
  {
    id: "thors-hammer-name",
    question: "What is the name of Thor’s hammer?",
    answerA: "Stormbreaker",
    answerB: "Gungnir",
    answerC: "Mjolnir",
    answerD: "Excalibur",
    correctAnswer: "answerC",
  },
  {
    id: "peter-parker-best-friend",
    question: "Who is Peter Parker’s best friend in the MCU?",
    answerA: "MJ",
    answerB: "Harry Osborn",
    answerC: "Ned Leeds",
    answerD: "Flash Thompson",
    correctAnswer: "answerC",
  },
  {
    id: "jarvis-replacement-ai",
    question: "What is the name of the AI that replaces J.A.R.V.I.S.?",
    answerA: "Karen",
    answerB: "Friday",
    answerC: "K.A.R.E.N.",
    answerD: "Edith",
    correctAnswer: "answerB",
  },
  {
    id: "tony-stark-parents-killer",
    question: "Who killed Tony Stark’s parents in the MCU?",
    answerA: "Baron Zemo",
    answerB: "Loki",
    answerC: "The Winter Soldier",
    answerD: "Thanos",
    correctAnswer: "answerC",
  },
  {
    id: "doctor-strange-job",
    question:
      "What is Doctor Strange’s real profession before becoming a sorcerer?",
    answerA: "Psychiatrist",
    answerB: "Neurologist",
    answerC: "Chemist",
    answerD: "Surgeon",
    correctAnswer: "answerD",
  },
  {
    id: "gamora-race",
    question: "What race is Gamora from?",
    answerA: "Kree",
    answerB: "Zen-Whoberi",
    answerC: "Xandarian",
    answerD: "Skrull",
    correctAnswer: "answerB",
  },
  {
    id: "avenger-wield-mjolnir",
    question: "Who was the first Avenger to wield Mjolnir after Thor?",
    answerA: "Captain America",
    answerB: "Vision",
    answerC: "Hulk",
    answerD: "Iron Man",
    correctAnswer: "answerB",
  },
];

//  reset right/wrong
function resetAnswerSolutionButton() {
  const answerChoices = document.querySelectorAll(".answer-button");
  answerChoices.forEach((button) => {
    button.classList.remove("right-answer", "wrong-answer");
  });

  const solutionButton = document.querySelector(".navigation-button");
  if (solutionButton) {
    solutionButton.disabled = false;
  }
}

// shuffle random order of answers

function randomAnswer(answers) {
  const shuffled = [];

  while (answers.length > 0) {
    const shuffledAnswer = Math.floor(Math.random() * answers.length);
    const randomAnswer = answers.splice(shuffledAnswer, 1)[0];
    shuffled.push(randomAnswer);
  }

  return shuffled;
}

// nextPage

let questionID = 0;

function nextQuestion() {
  resetAnswerSolutionButton();

  function updateQuestionNumber() {
    const numberElement = document.querySelector(".number-of-questions");
    numberElement.textContent = `Frage ${questionID + 1}.  von ${
      marvelQuestions.length
    }.`;
  }

  if (questionID >= marvelQuestions.length - 1) {
    alert("YOU HAVE REACHED THE ENDGAME WITH " + score + " POINTS");
    return;
  }

  questionID++;

  const currentQuestion = marvelQuestions[questionID];
  document.getElementById("quizQuestion").innerHTML = currentQuestion.question;

  const answers = [
    { id: "answerA", text: currentQuestion.answerA },
    { id: "answerB", text: currentQuestion.answerB },
    { id: "answerC", text: currentQuestion.answerC },
    { id: "answerD", text: currentQuestion.answerD },
  ];

  const shuffledAnswers = randomAnswer(answers);

  const answerButtons = document.querySelectorAll(".answer-button");

  shuffledAnswers.forEach((answer, index) => {
    answerButtons[index].innerHTML = answer.text;
    answerButtons[index].setAttribute("data-id", answer.id);
    answerButtons[index].setAttribute("onclick", `addAnswer('${answer.id}')`);
  });

  updateBackground();
  updateQuestionNumber();
}

// update Background

let marvelBackgroundImg = [
  "img/question1.jpg",
  "img/question2.jpg",
  "img/question3.jpg",
  "img/question4.jpg",
  "img/question5.jpg",
  "img/question6.jpg",
  "img/question7.jpg",
];

function updateBackground() {
  const wrapper = document.querySelector('[data-id="displayQuestion"]');
  if (wrapper) {
    const imageName =
      marvelBackgroundImg[
        Math.floor(Math.random() * marvelBackgroundImg.length)
      ];
    wrapper.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.7)), url('${imageName}')`;
    wrapper.style.backgroundSize = "cover";
    wrapper.style.backgroundPosition = "center";
  }
}
// right/wrong logic
let score = 0;

function addAnswer(answerId) {
  const correctId = marvelQuestions[questionID].correctAnswer;
  const rightAnswer = document.querySelector(`[data-id="${correctId}"]`);
  const clickedAnswer = document.querySelector(`[data-id="${answerId}"]`);

  if (answerId === correctId) {
    clickedAnswer.classList.add("right-answer");
    score++;
    document.getElementById("scorePoints").innerText = "Your Score: " + score;
  } else {
    clickedAnswer.classList.add("wrong-answer");
    rightAnswer.classList.add("right-answer");
  }
}

//  sokutionButton

function solution() {
  const currentCorrectAnswerId = marvelQuestions[questionID].correctAnswer;
  const correctAnswerElement = document.querySelector(
    `[data-id="${currentCorrectAnswerId}"]`
  );
  correctAnswerElement.classList.add("right-answer");
  document.querySelector("button.navigation-button").disabled = true;
}

//  create HTML & nextPage
function nextPage() {
  const quizAppContainer = document.createElement("div");
  quizAppContainer.dataset.id = "displayQuestion";
  quizAppContainer.classList.add("quizapp-container");

  const numberOfQuestions = document.createElement("h4");
  numberOfQuestions.id = "numberOfQuestion";
  numberOfQuestions.textContent = "Frage 1. von 10.";
  numberOfQuestions.classList.add("number-of-questions");

  const questionText = document.createElement("h1");
  questionText.id = "quizQuestion";
  questionText.textContent = "Das ist die Frage";
  questionText.classList.add("question-text");

  // quizAnswer
  const answerContainer = document.createElement("div");
  answerContainer.classList.add("answer-container");

  const answerButtonA = document.createElement("button");
  answerButtonA.classList.add("answer-button", "gridA");
  answerButtonA.dataset.id = "answerA";
  answerButtonA.setAttribute("onclick", "addAnswer('answerA')");

  const answerButtonB = document.createElement("button");
  answerButtonB.classList.add("answer-button", "gridB");
  answerButtonB.dataset.id = "answerB";
  answerButtonB.setAttribute("onclick", "addAnswer('answerB')");

  const answerButtonC = document.createElement("button");
  answerButtonC.classList.add("answer-button", "gridC");
  answerButtonC.dataset.id = "answerC";
  answerButtonC.setAttribute("onclick", "addAnswer('answerC')");

  const answerButtonD = document.createElement("button");
  answerButtonD.classList.add("answer-button", "gridD");
  answerButtonD.dataset.id = "answerD";
  answerButtonD.setAttribute("onclick", "addAnswer('answerD')");

  answerContainer.append(
    answerButtonA,
    answerButtonB,
    answerButtonC,
    answerButtonD
  );

  // footerContainer
  const footerContainer = document.createElement("footer");
  footerContainer.classList.add("footer-container");

  // quizNavigation
  const quizNavigationContainer = document.createElement("div");
  quizNavigationContainer.id = "quizNavigation";
  quizNavigationContainer.classList.add("quiz-navigation-container");

  const navigationButtonNext = document.createElement("button");
  navigationButtonNext.textContent = "Next";
  navigationButtonNext.classList.add("navigation-button");
  navigationButtonNext.setAttribute("onclick", "nextQuestion()");

  const solutionButton = document.createElement("button");
  solutionButton.textContent = "Solution";
  solutionButton.classList.add("navigation-button");
  solutionButton.setAttribute("onclick", "solution()");

  // score text
  const footerScore = document.createElement("div");
  footerScore.classList.add("footer-score");
  const scoreText = document.createElement("span");
  scoreText.id = "scorePoints";
  scoreText.classList.add("score-text");
  scoreText.textContent = "Your score:";

  // appendHTML

  quizAppContainer.append(numberOfQuestions);
  quizAppContainer.append(questionText);
  quizAppContainer.append(answerContainer);
  quizAppContainer.append(footerContainer);

  quizNavigationContainer.append(solutionButton, navigationButtonNext);

  footerContainer.append(quizNavigationContainer, footerScore);

  footerScore.appendChild(scoreText);

  document.getElementById("wrapper").append(quizAppContainer);

  //   remove introScene
  document.querySelector(".intro-container").style.display = "none";
  document.getElementById("introScreen").muted = true;

  function addQuestionToButton() {
    const question = document.getElementById("quizQuestion");
    question.innerHTML = marvelQuestions[questionID].question;

    const answerA = document.querySelector('[data-id="answerA"]');
    answerA.innerHTML = marvelQuestions[questionID].answerA;

    const answerB = document.querySelector('[data-id="answerB"]');
    answerB.innerHTML = marvelQuestions[questionID].answerB;

    const answerC = document.querySelector('[data-id="answerC"]');
    answerC.innerHTML = marvelQuestions[questionID].answerC;

    const answerD = document.querySelector('[data-id="answerD"]');
    answerD.innerHTML = marvelQuestions[questionID].answerD;
  }
  document.addEventListener("DOMContentLoaded", addQuestionToButton);

  addQuestionToButton();
  updateBackground();
}
