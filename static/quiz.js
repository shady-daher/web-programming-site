// ======================================================
// QUESTIONS
// ======================================================

const questions = [
  {
    question: "What does LTE stand for in 4G networks?",
    choices: [
      "Long Term Evolution",
      "Low Transmission Energy",
      "Long Telecommunication Equipment",
      "Local Transport Extension"
    ],
    answer: 0,
    explanation:
      "LTE stands for Long Term Evolution and is a major technology used in 4G mobile communication."
  },

  {
    question: "What is one major advantage of 5G compared with 4G?",
    choices: [
      "Lower data rates",
      "Higher latency",
      "Higher data rates and lower latency",
      "No need for antennas"
    ],
    answer: 2,
    explanation:
      "5G is designed to provide higher data rates and lower latency than previous generations such as 4G."
  },

  {
    question: "Which technology uses many antennas to improve capacity and spatial performance in 5G?",
    choices: [
      "Massive MIMO",
      "Dial-up networking",
      "Infrared transmission",
      "Bluetooth"
    ],
    answer: 0,
    explanation:
      "Massive MIMO uses many antenna elements to improve capacity and spatial performance in 5G networks."
  },

  {
    question: "What is network slicing in 5G?",
    choices: [
      "Physically cutting a network cable",
      "Creating separate virtual network segments for different needs",
      "Removing parts of the radio spectrum",
      "Reducing the number of antennas"
    ],
    answer: 1,
    explanation:
      "Network slicing allows one physical network infrastructure to support multiple virtual networks with different requirements."
  },

  {
    question: "Which 5G service category focuses on very high mobile data rates?",
    choices: [
      "eMBB",
      "SMS",
      "GPS",
      "NFC"
    ],
    answer: 0,
    explanation:
      "eMBB stands for enhanced Mobile Broadband and focuses on high-speed mobile data services."
  },

  {
    question: "Which is an important use case supported by 5G?",
    choices: [
      "Massive Internet of Things deployments",
      "Removing the need for mobile devices",
      "Replacing every Wi-Fi network",
      "Eliminating all antennas"
    ],
    answer: 0,
    explanation:
      "5G supports large numbers of connected devices, making it suitable for many Internet of Things applications."
  },

  {
    question: "Why can higher-frequency bands be useful in 5G?",
    choices: [
      "They can provide large amounts of available bandwidth",
      "They always travel farther than lower frequencies",
      "They eliminate the need for antennas",
      "They cannot carry large amounts of data"
    ],
    answer: 0,
    explanation:
      "Higher-frequency bands can provide wider bandwidth, which can help support high data rates."
  },

  {
    question: "What does MIMO stand for?",
    choices: [
      "Multiple Input Multiple Output",
      "Mobile Internet Main Operation",
      "Maximum Input Minimum Output",
      "Multiple Interface Mobile Option"
    ],
    answer: 0,
    explanation:
      "MIMO stands for Multiple Input Multiple Output and uses multiple antennas at the transmitter and receiver."
  },

  {
    question: "What does 5G NR stand for?",
    choices: [
      "5G Network Router",
      "5G New Radio",
      "5G Network Relay",
      "5G New Receiver"
    ],
    answer: 1,
    explanation:
      "5G NR stands for 5G New Radio and is the radio access technology developed for 5G networks."
  },

  {
    question: "Which statement best describes 5G compared with 4G?",
    choices: [
      "5G is a newer generation designed for higher performance and new use cases",
      "5G is older than 4G",
      "5G is only used for voice calls",
      "5G and 4G are exactly the same technology"
    ],
    answer: 0,
    explanation:
      "5G is a newer generation of mobile communication designed to improve performance and support additional use cases."
  }
];


// ======================================================
// APPLICATION STATE
// ======================================================

let currentQuestion = 0;
const userAnswers = new Array(questions.length);


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
  if (currentQuestion < questions.length - 1) {
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
  currentQuestion = questions.length - 1;
  renderQuestion();
}


// ======================================================
// CALCULATE SCORE
// ======================================================

function calculateScore() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  return score;
}


// ======================================================
// CALCULATE PERCENTAGE
// ======================================================

function calculatePercentage(score) {
  return Math.round((score / questions.length) * 100);
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

function buildCorrection() {
  let correction = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

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

function submitQuiz() {
  const score = calculateScore();
  const percentage = calculatePercentage(score);
  const message = getPerformanceMessage(percentage);
  const correction = buildCorrection();

  showResults(score, percentage, message, correction);
}


// ======================================================
// PROVIDED INTERFACE CODE
// ======================================================

function renderQuestion() {
  const q = questions[currentQuestion];

  // --------------------------------------------------
  // QUESTION NUMBER
  // --------------------------------------------------

  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;


  // --------------------------------------------------
  // QUESTION
  // --------------------------------------------------

  document.getElementById("questionText").textContent =
    q.question;


  // --------------------------------------------------
  // CHOICES
  // --------------------------------------------------

  const choicesContainer =
    document.getElementById("choices");

  choicesContainer.innerHTML = "";

  for (let i = 0; i < q.choices.length; i++) {
    const label = document.createElement("label");
    label.className = "choice";

    const radio = document.createElement("input");

    radio.type = "radio";
    radio.name = "answer";
    radio.value = i;

    // Restore previously selected answer
    if (userAnswers[currentQuestion] === i) {
      radio.checked = true;
    }

    // Save selected answer
    radio.onclick = function () {
      saveAnswer(i);
    };

    label.appendChild(radio);

    label.appendChild(
      document.createTextNode(" " + q.choices[i])
    );

    choicesContainer.appendChild(label);
  }


  // --------------------------------------------------
  // NAVIGATION BUTTONS
  // --------------------------------------------------

  document.getElementById("firstBtn").disabled =
    currentQuestion === 0;

  document.getElementById("previousBtn").disabled =
    currentQuestion === 0;

  document.getElementById("nextBtn").disabled =
    currentQuestion === questions.length - 1;

  document.getElementById("lastBtn").disabled =
    currentQuestion === questions.length - 1;
}


// ======================================================
// DISPLAY RESULTS
// ======================================================

function showResults(
  score,
  percentage,
  message,
  correction
) {
  document.getElementById("quizPanel").style.display =
    "none";

  document.getElementById("resultsPanel").style.display =
    "block";

  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${questions.length}`;

  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;

  document.getElementById("performanceText").textContent =
    message;

  document.getElementById("correction").textContent =
    correction;
}


// ======================================================
// START APPLICATION
// ======================================================

renderQuestion();