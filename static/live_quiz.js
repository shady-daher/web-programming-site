
// ======================================================
// QUESTIONS FROM THE SERVER
// ======================================================

let total = 0;
const cache = {};


// ======================================================
// APPLICATION STATE
// ======================================================

let currentQuestion = 0;
const userAnswers = [];


// ======================================================
// FETCH ONE QUESTION
// ======================================================

async function getQuestion(index) {

  // Return the question if it has already been fetched.
  if (cache[index]) {
    return cache[index];
  }

  try {
    const response = await fetch(`/api/question/${index}`);

    // Check whether the server returned a successful response.
    if (!response.ok) {
      throw new Error("Could not load question " + (index + 1));
    }

    // Convert the JSON response into a JavaScript object.
    const question = await response.json();

    // Save the question so it does not need to be fetched again.
    cache[index] = question;

    return question;

  } catch (error) {
    throw error;
  }
}


// ======================================================
// SAVE AN ANSWER
// ======================================================

function saveAnswer(choiceIndex) {
  userAnswers[currentQuestion] = choiceIndex;
}


// ======================================================
// NAVIGATION
// ======================================================

function goNext() {
  if (currentQuestion < total - 1) {
    currentQuestion++;
    renderQuestion();
  }
}


function goPrevious() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}


function goFirst() {
  currentQuestion = 0;
  renderQuestion();
}


function goLast() {
  currentQuestion = total - 1;
  renderQuestion();
}


// ======================================================
// CALCULATE SCORE
// ======================================================

async function calculateScore() {
  let score = 0;

  for (let i = 0; i < total; i++) {
    const question = await getQuestion(i);

    if (userAnswers[i] === question.answer) {
      score++;
    }
  }

  return score;
}


// ======================================================
// CALCULATE PERCENTAGE
// ======================================================

function calculatePercentage(score) {
  return Math.round((score / total) * 100);
}


// ======================================================
// PERFORMANCE MESSAGE
// ======================================================

function getPerformanceMessage(percentage) {
  if (percentage >= 80) {
    return "Excellent";
  } else if (percentage >= 60) {
    return "Good";
  } else if (percentage >= 50) {
    return "Pass";
  } else {
    return "Needs improvement";
  }
}


// ======================================================
// BUILD CORRECTION
// ======================================================

async function buildCorrection() {
  let correction = "";

  for (let i = 0; i < total; i++) {
    const question = await getQuestion(i);

    const userAnswer =
      userAnswers[i] === undefined
        ? "Not answered"
        : question.choices[userAnswers[i]];

    const correctAnswer = question.choices[question.answer];

    const result =
      userAnswers[i] === question.answer
        ? "Correct"
        : "Incorrect";

    correction += `Question ${i + 1}: ${question.question}\n`;
    correction += `Your answer: ${userAnswer}\n`;
    correction += `Correct answer: ${correctAnswer}\n`;
    correction += `Result: ${result}\n`;
    correction += `Explanation: ${question.explanation}\n`;
    correction += "\n------------------------------\n\n";
  }

  return correction;
}


// ======================================================
// SUBMIT QUIZ
// ======================================================

async function submitQuiz() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  loading.hidden = false;
  error.hidden = true;
  error.textContent = "";

  try {
    const score = await calculateScore();
    const percentage = calculatePercentage(score);
    const message = getPerformanceMessage(percentage);
    const correction = await buildCorrection();

    showResults(score, percentage, message, correction);

  } catch (err) {
    error.textContent = "Could not calculate the results. " + err.message;
    error.hidden = false;

  } finally {
    loading.hidden = true;
  }
}


// ======================================================
// DISPLAY QUESTION
// ======================================================

async function renderQuestion() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  loading.hidden = false;
  error.hidden = true;
  error.textContent = "";

  try {
    // Fetch the current question from the server.
    const q = await getQuestion(currentQuestion);

    // Display the question number and question text.
    document.getElementById("progress").textContent =
      `Question ${currentQuestion + 1} of ${total}`;

    document.getElementById("questionText").textContent =
      q.question;

    // Create the answer choices.
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";

    for (let i = 0; i < q.choices.length; i++) {
      const label = document.createElement("label");
      label.className = "choice";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.value = i;

      // Restore the previously selected answer.
      if (userAnswers[currentQuestion] === i) {
        radio.checked = true;
      }

      // Save the answer when the user selects it.
      radio.onclick = function () {
        saveAnswer(i);
      };

      label.appendChild(radio);
      label.appendChild(
        document.createTextNode(" " + q.choices[i])
      );

      choicesContainer.appendChild(label);
    }

    // Disable navigation buttons at the beginning and end.
    document.getElementById("firstBtn").disabled =
      currentQuestion === 0;

    document.getElementById("previousBtn").disabled =
      currentQuestion === 0;

    document.getElementById("nextBtn").disabled =
      currentQuestion === total - 1;

    document.getElementById("lastBtn").disabled =
      currentQuestion === total - 1;

  } catch (err) {
    document.getElementById("questionText").textContent = "";
    document.getElementById("choices").textContent = "";

    error.textContent = "Could not load the question. " + err.message;
    error.hidden = false;

  } finally {
    loading.hidden = true;
  }
}


// ======================================================
// DISPLAY RESULTS
// ======================================================

function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";

  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${total}`;

  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;

  document.getElementById("performanceText").textContent = message;

  document.getElementById("correction").textContent = correction;
}


// ======================================================
// INITIALIZE QUIZ
// ======================================================

async function init() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  loading.hidden = false;
  error.hidden = true;
  error.textContent = "";

  try {
    // Fetch the total number of questions.
    const response = await fetch("/api/questions/count");

    if (!response.ok) {
      throw new Error("Could not retrieve the question count.");
    }

    const data = await response.json();
    total = data.count;

    if (!Number.isInteger(total) || total < 1) {
      throw new Error("No questions are available.");
    }

    // Prepare the answers array now that the count is known.
    userAnswers.length = total;

    // Load the first question.
    await renderQuestion();

  } catch (err) {
    error.textContent = "Could not start the quiz. " + err.message;
    error.hidden = false;

  } finally {
    loading.hidden = true;
  }
}


// ======================================================
// START APPLICATION
// ======================================================

init();
