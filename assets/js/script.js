// Global variables
let dataHS; // Object to store user initials and their scores 
let sortedKeyArray = []; // Sorted array to store user initials (high scorer first) 
let sortedValueArray = []; // Sorted array to store scores (high score first) 

let userInitial;
let score;
const numberHStoShow = 5; // Number of top scorers to show (*** Feel free to modify!)

let questions = { // Questions (*** Feel free to add/delete/modify!)
  "HTML means _____": // Question 1
  [["HyperText Markup Language","correct"], // Answer option 1 for Question 1 & whether it's a correct answer or not
  ["Hot Teriyaki Mayo Lasagna","wrong"], // Answer option 2 for Question 1 & whether it's a correct answer or not
  ["High Tea Milk Latte","wrong"], // Answer option 3 for Question 1 & whether it's a correct answer or not
  ["Hi There My name is Lucy!","wrong"]], // Answer option 4 for Question 1 & whether it's a correct answer or not
  "The main purpose of using CSS is _____":
  [["to get higher grade at school","wrong"], 
  ["to style websites and make them more attractive","correct"], 
  ["to make your engineer life hard","wrong"], 
  ["to exist","wrong"]],
  "As of 2022, __% of websites use JavaScript on the client side.":
  [["2","wrong"], 
  ["82","wrong"], 
  ["98","correct"], 
  ["100","wrong"]],
  "When you save data in your browser's local storage, what's the syntax to use?":
  [["JSON.parse(localStorage.getItem('tag');","wrong"], 
  ["JSON.stringfy(object);","correct"], 
  ["localStorage.push(object)","wrong"], 
  ["localStorage[tag] = object","wrong"]],
  "Which of the following explanation is false? (select a false statement)":
  [["array.length = get the length of the array","wrong"], 
  ["array1.concat(array2) = merge two arrays","wrong"], 
  ["array.push(data) = add data at the end of the array","wrong"], 
  ["array.pop() = remove the first element from the array","correct"]]
}
let maxPoint = Object.keys(questions).length; // Total number of questions = Max possible point
let questionNo; // Question number/index (0, 1, 2...)

let timer // setInterval function (defined globally to be available to all functions)
const timeGiven = 60 // How many seconds to be given to users (*** Feel free to modify!)
let timeLeft; // Remaining seconds
const timeSubtract = 10; // How many seconds to be subtracted for wrong answers (*** Feel free to modify!)


// This function shows the start page
function init (){
  timeLeft = timeGiven;
  userInitial = ""
  score = 0;
  questionNo = 0;
  
  // Create <header> elements
  let headerDiv = document.createElement("div");
  document.body.children[0].appendChild(headerDiv);
  headerDiv.setAttribute("id", "header");
  
  let viewHSButton = document.createElement("button");
  viewHSButton.textContent = "View Highscores";
  document.body.children[0].children[1].appendChild(viewHSButton);
  viewHSButton.setAttribute("id", "viewHS");

    // Create <main> elements
  let mainDiv = document.createElement("div");
  document.body.children[1].appendChild(mainDiv);
  mainDiv.setAttribute("id", "main");

  let mainH2 = document.createElement("h2");
  mainH2.textContent = "Are you ready to test your knowledge on HTML, CSS and JavaScript?";
  document.body.children[1].children[0].appendChild(mainH2);  
  mainH2.setAttribute("id", "mainH2");

  let mainH3 = document.createElement("h3");
  mainH3.textContent = "Try to answer the following " 
    + maxPoint 
    + " questions within " 
    + timeGiven 
    + " seconds.";
  document.body.children[1].children[0].appendChild(mainH3); 
  mainH3.setAttribute("id", "mainH3");

  let mainH4 = document.createElement("h4");
  mainH4.textContent = "⚠︎A wrong answer takes "
    + timeSubtract
    + " seconds from you!";
  document.body.children[1].children[0].appendChild(mainH4); 
  mainH4.setAttribute("id", "mainH4");

  let startButton = document.createElement("button");
  startButton.textContent = "Start";
  document.body.children[1].children[0].appendChild(startButton); 
  startButton.setAttribute("id", "startButton");

  // When "View Highscores" button is clicked, delete some <header> and all <main> elements, clear timer (while user is answering questions in a question page), get highscore data and move to highscore page.  
  viewHSButton.addEventListener("click", function(event){
    event.preventDefault();
    deleteHeader();
    deleteMain();
    clearInterval(timer);
    getHS();
    showHS();
  })
  
  // When "Start" button is clicked, delete all <main> elements, start timer and move to a question page.
  startButton.addEventListener("click", function(event){
    event.preventDefault();
    deleteMain();
    countdown(); 
    showQuestions();
  })
}


// This function starts a timer (countdown) 
function countdown(){
  timer = setInterval(function(){
    showSecond.textContent = timeLeft;
    timeLeft--;

    // When no time is left, stop the timer, delete some <header> elements, delete all <main> elements and move to the result page.
    if(timeLeft < 0){
      clearInterval(timer);
      deleteHeader();
      deleteMain();
      showResult();
    }
  }, 1000)
}


// This function shows question pages with a question and list of answers
function showQuestions(){
  // When the page is loaded for the 1st time (1st question is presented), create a <header> element (timer).
  if (questionNo == 0) {
    let showTime = document.createElement("div");
    showTime.textContent = "Remaining seconds: "; 
    document.body.children[0].children[1].appendChild(showTime);
    showTime.setAttribute("id", "showTime");

    let showSecond = document.createElement("span");
    document.body.children[0].children[1].children[1].appendChild(showSecond);
    showSecond.setAttribute("id", "showSecond");
  }
  
  // Create <main> elements (question and answers)
  let mainDiv = document.createElement("div");
  document.body.children[1].appendChild(mainDiv);
  mainDiv.setAttribute("id", "main");

  let mainH2 = document.createElement("h2");
  mainH2.textContent = Object.keys(questions)[questionNo];
  document.body.children[1].children[0].appendChild(mainH2);  
  mainH2.setAttribute("id", "mainH2");

  let answerList = document.createElement("ol");
  document.body.children[1].children[0].appendChild(answerList);
  answerList.setAttribute("id", "answerList");

  for (let j = 0; j < Object.values(questions)[questionNo].length; j++){
    let answerLi = document.createElement("li");
    document.body.children[1].children[0].children[1].appendChild(answerLi);
    answerLi.setAttribute("class", "answerLi");

    let answerButton = document.createElement("button");
    answerButton.textContent = Object.values(questions)[questionNo][j][0];
    document.body.children[1].children[0].children[1].children[j].appendChild(answerButton);
    answerButton.setAttribute("data-truefalse", Object.values(questions)[questionNo][j][1]);
    answerButton.setAttribute("class", "answerButton");
  }
  
  // When one of the answer buttons is clicked, followings are executed.
  answerList.addEventListener("click", function(event){
    event.preventDefault();
    let element = event.target;

      // Indicate whether the answer is correct or not
      if (element.getAttribute("data-truefalse")==="correct"){
        let mainH3 = document.createElement("h3");
        mainH3.textContent = "You're correct!";
        document.body.children[1].children[0].appendChild(mainH3);
        mainH3.setAttribute("class", "correctAnswer");
        score++;
      } else {
        let mainH3 = document.createElement("h3");
        mainH3.textContent = "You're wrong!";
        document.body.children[1].children[0].appendChild(mainH3);
        mainH3.setAttribute("class", "wrongAnswer");
        timeLeft = timeLeft - timeSubtract;
      }
    questionNo++;

    // When no time is left, stop the timer, wait for 0.5 seconds and then delete some <header> and all <main> elements and move to the result page.
    if (timeLeft <= 0) {
      clearInterval(timer);
      window.setTimeout(deleteMain, 500);
      window.setTimeout(deleteHeader, 500);
      window.setTimeout(showResult, 500);
    } else {
      // When the question is not the last one, wait for 0.5 seconds and then delete all <main> elements and move to the nexr question page.
      if (questionNo < maxPoint){
        window.setTimeout(deleteMain, 500);
        window.setTimeout(showQuestions, 500);
     // When this is the last question, stop the timer, wait for 0.5 seconds and then delete some <header> and all <main> elements and move to the result page.
      } else {
        clearInterval(timer);
        window.setTimeout(deleteMain, 500);
        window.setTimeout(deleteHeader, 500);
        window.setTimeout(showResult, 500);
      }
    } 
  })
}


// This function shows a result page with a form to input user initials
function showResult (){
  // Create <main> elements
  let mainDiv = document.createElement("div");
  document.body.children[1].appendChild(mainDiv);
  mainDiv.setAttribute("id", "main");

  let mainH2 = document.createElement("h2");
  mainH2.textContent = "It's done! Let's see your result!";
  document.body.children[1].children[0].appendChild(mainH2);  
  mainH2.setAttribute("id", "mainH2");

  let mainH3 = document.createElement("h3");
  mainH3.textContent = "Your score is " + score + " out of " + maxPoint + "!";
  document.body.children[1].children[0].appendChild(mainH3); 
  mainH3.setAttribute("id", "mainH3");

  let form = document.createElement("form");
  document.body.children[1].children[0].appendChild(form);
  form.setAttribute("id", "form");
  
  let input = document.createElement("input");
  document.body.children[1].children[0].children[2].appendChild(input); 
  input.setAttribute("placeholder", "Enter your initials");
  input.setAttribute("id", "input");

  let submitButton = document.createElement("button");
  submitButton.textContent = "Submit"; 
  document.body.children[1].children[0].children[2].appendChild(submitButton); 
  submitButton.setAttribute("id", "submitButton");

  // When submit button is clicked, delete all <main> elements, save the score & user initials in the local storage, retrieve the data from the local storage and move to the high scores page.  
  submitButton.addEventListener("click", function(event){
    event.preventDefault();
    userInitial = input.value;
    deleteMain(); 
    saveScore();
    getHS();
    showHS();
  })
}


// This function adds new result (user initials and score) to browser's local storage 
function saveScore (){
  // Retrieve the latest score data from the local storage
  dataHS = JSON.parse(localStorage.getItem("userScores"));
  
  // If the data is null, define dataHS as an object
  if (dataHS===null) {
    dataHS = {};
  }

  // Add new data (user's initials and score) to dataHS
  dataHS[userInitial]=score;

  // Save this latest data to browser's local storage
  localStorage.setItem("userScores", JSON.stringify(dataHS));
}


// This function retrieve score data from browser's local storage and sort the data in descending order
function getHS(){
  // Create empty arrays to input sorted initials and scores at the end
  sortedKeyArray = [];
  sortedValueArray = [];
  dataHS = JSON.parse(localStorage.getItem("userScores"));
  let keyArray = Object.keys(dataHS);
  let valueArray = Object.values(dataHS);
  let j = maxPoint;
  while (j >= 0){
    for (let k = 0; k < keyArray.length; k++){
      // Look for high scores (from Max point to 0) from the original value array and find their indexs
      if (valueArray[k] == j){
        // Input the corresponsing initials and values to separate arrays
        sortedKeyArray.push(keyArray[k]);
        sortedValueArray.push(valueArray[k]);
      }
    }
    j--;
  }
}


// This function shows a page with top scorers and their scores in a descendin order
function showHS(){
  // Create <main> elements
  let mainDiv = document.createElement("div");
  document.body.children[1].appendChild(mainDiv);
  mainDiv.setAttribute("id", "main");

  let mainH2 = document.createElement("h2");
  mainH2.textContent = "Top " + numberHStoShow + " Highscores (out of " + sortedKeyArray.length + " challengers!)";
  document.body.children[1].children[0].appendChild(mainH2);
  mainH2.setAttribute("id", "mainH2");

  // Compare the max number of high scorers to be shown and the actual number of challengers. Take the smaller one.
  let numberOfList;
  if (sortedKeyArray.length < numberHStoShow){
    numberOfList = sortedKeyArray.length;
  } else {
    numberOfList = numberHStoShow;
  }

  // If the number of scores is more than 0, create <ol> and <li> elements 
  if (sortedKeyArray.length > 0){
    document.body.children[1].children[0].appendChild(document.createElement("ol"));

    for (let l = 0; l < numberOfList; l++){
      let hsMainLi = document.createElement("li");
      hsMainLi.textContent = sortedKeyArray[l] + ": " + sortedValueArray[l];
      document.body.children[1].children[0].children[1].appendChild(hsMainLi);
      hsMainLi.setAttribute("id", "hsMainLi");
    }
  }

  let backButton = document.createElement("button");
  backButton.textContent = "Go Back";
  document.body.children[1].children[0].appendChild(backButton);
  backButton.setAttribute("id", "backButton");

  let clearButton = document.createElement("button");
  clearButton.textContent = "Clear Highscores";
  document.body.children[1].children[0].appendChild(clearButton);
  clearButton.setAttribute("id", "clearButton");
  
  // When Go Back button is clicked, delete all <main> elements and go back to the initial page.
  backButton.addEventListener("click", function(event){
    event.preventDefault();
    deleteMain();
    init();
  })

  // When Clear Highscores button is clicked, clear all the score related data and save it to browser's local storage. Then delete all <main> elements and go back to the high score page (which is almost blank).
  clearButton.addEventListener("click", function(event){
    event.preventDefault();
    dataHS = {};
    sortedKeyArray = [];
    sortedValueArray = [];
    localStorage.setItem("userScores", JSON.stringify(dataHS));
    deleteMain();
    showHS();
  })
}


// This function deletes some <header> elements - "View Highscores" button and the remainig time indication
function deleteHeader (){
  document.getElementById("header").remove();
}


// This function deletes all <main> elements
function deleteMain (){
  document.getElementById("main").remove();
}


init();
