let body = document.querySelector("body");
let p = document.querySelector("p");
let gameSeq = [];
let userSeq = [];
let h3 = document.querySelector("h3");
let h4=document.querySelector("h4");


let btns = ["red", "yellow", "green", "purple"];

let start = false;
let level = 0;
let highScore = 0; // High score variable

document.addEventListener("keypress", function () {
  if (start == false) {
    console.log("Game is started");
    start = true;
  }

  levelUp();
});

function gameFlash(randBtn) {
  randBtn.classList.add("flash");
  setTimeout(function () {
    randBtn.classList.remove("flash");
  }, 500);
}

function userFlash(userBtn){
    userBtn.classList.add("userFlash");
    setTimeout(function () {
      userBtn.classList.remove("userFlash");
    }, 500);
  }

function levelUp() {
  level++;
  userSeq=[];
  h3.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
//   console.log(randIdx);
//   console.log(randColor);
// console.log(randBtn);
  gameSeq.push(randColor);
  console.log(gameSeq);

  gameFlash(randBtn);
}

function checkAns(idx){
    // console.log(`current level is ${level}`);
    if(gameSeq[idx]===userSeq[idx]){
        if(gameSeq.length==userSeq.length){
          setTimeout(levelUp,1000);
        }
    }else{
      // Update high score if the current level exceeds the high score
    if (level > highScore) {
      highScore = level;
    }
       h3.innerHTML=`<b>Game Over..!</b> Your score was ${level} <br>Press any key to start`;
       h4.innerHTML = `High Score: ${highScore}`;// Display the current level and high score when the game ends
       start=false;
       level=0;
       gameSeq=[];
       userSeq=[];
       body.style.backgroundColor="red";
       setTimeout(function(){
        body.style.backgroundColor="white";
       },200);
    }
}

function btnPress(){
    // console.log(this);
    let button=this;
    userFlash(button);
    
    let userColor = button.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    // console.log(userSeq);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

