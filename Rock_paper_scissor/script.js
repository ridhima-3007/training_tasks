const rock_img = document.getElementById("rock_img");
const paper_img = document.getElementById("paper_img");
const scissor_img = document.getElementById("scissor_img");
const player_img = document.getElementById("player_img");
const computer_img = document.getElementById("computer_img")
const computer_score = document.getElementById("computer_score");
const player_score = document.getElementById("player_score");
const result = document.getElementById("result");
result.innerText = "";

const sound = document.createElement("audio");
sound.setAttribute("src", "./myAudio.wav");

const score = [0, 0];
const arr = ["rock.png", "paper.png", "scissors.png"]

rock_img.addEventListener('click', () => {
    sound.play();
    player_img.src = "rock.png"
    playGame(0);
});
paper_img.addEventListener("click",  ()=>{
    sound.play();
    player_img.src = "paper.png";
    playGame(1);
});
scissor_img.addEventListener("click", () => {
    sound.play();
    player_img.src = "scissors.png";
    playGame(2);
});

function generate() {
    const index = Math.floor(Math.random()*arr.length);
    computer_img.src = arr[index];
    return index;
}

function playGame(pi) {
    const ci = generate();
    if(ci == pi) {
        result.innerText = "DRAW!"
    }
    else if(ci == 0 && pi == 1){
        score[0]++;
        result.innerText = "YOU WIN!"
    }
    else if(ci == 1 && pi == 0) {
        score[1]++;
        result.innerText = "COMPUTER WIN!"
    }
    else if(ci == 1 && pi == 2) {
        score[0]++;
        result.innerText = "YOU WIN!"
    }
    else if(ci == 2 && pi == 1) {
        score[1]++;
        result.innerText = "COMPUTER WIN!"
    }
    else if(ci == 0 && pi == 2) {
        score[1]++;
        result.innerText = "COMPUTER WIN!"
    }
    else if(ci == 2 && pi == 0) {
        score[0]++;
        result.innerText = "YOU WIN!"
    }

    player_score.innerText = score[0];
    computer_score.innerText = score[1];
}

function resetScore() {
    score[0] = 0;
    score[1] = 0;
    player_score.innerText = score[0];
    computer_score.innerText = score[1];
    result.innerText = ""
}
