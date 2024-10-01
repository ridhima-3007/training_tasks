const wordList = [
    {
        word: "guitar",
        hint: "A musical instrument with strings."
    },
    {
        word: "oxygen",
        hint: "A colorless, odorless gas essential for life."
    },
    {
        word: "mountain",
        hint: "A large natural elevation of the Earth's surface."
    },
    {
        word: "painting",
        hint: "An art form using colors on a surface to create images or expression."
    },
    {
        word: "football",
        hint: "A popular sport played with a spherical ball."
    },
    {
        word: "history",
        hint: "The study of past events and human civilization."
    },
    {
        word: "pizza",
        hint: "A savory dish consisting of a round, flattened base with toppings."
    },
    {
        word: "jazz",
        hint: "A genre of music characterized by improvisation and syncopation."
    },
    {
        word: "camera",
        hint: "A device used to capture and record images or videos."
    },
    {
        word: "diamond",
        hint: "A precious gemstone known for its brilliance and hardness."
    },
    {
        word: "science",
        hint: "The systematic study of the structure and behavior of the physical and natural world."
    },
    {
        word: "bicycle",
        hint: "A human-powered vehicle with two wheels."
    },
    {
        word: "sunset",
        hint: "The daily disappearance of the sun below the horizon."
    },
    {
        word: "coffee",
        hint: "A popular caffeinated beverage made from roasted coffee beans."
    },
    {
        word: "dance",
        hint: "A rhythmic movement of the body often performed to music."
    },
    {
        word: "galaxy",
        hint: "A vast system of stars, gas, and dust held together by gravity."
    },
    {
        word: "volcano",
        hint: "A mountain or hill with a vent through which lava, rock fragments, hot vapor, and gas are ejected."
    },
    {
        word: "novel",
        hint: "A long work of fiction, typically with a complex plot and characters."
    },
    {
        word: "symphony",
        hint: "A long musical composition for a full orchestra, typically in multiple movements."
    },
    {
        word: "ballet",
        hint: "A classical dance form characterized by precise and graceful movements."
    },
    {
        word: "rainbow",
        hint: "A meteorological phenomenon that is caused by reflection, refraction, and dispersion of light."
    },
    {
        word: "universe",
        hint: "All existing matter, space, and time as a whole."
    },
    {
        word: "piano",
        hint: "A musical instrument played by pressing keys that cause hammers to strike strings."
    },

    {
        word: "theater",
        hint: "A building or outdoor area in which plays, movies, or other performances are staged."
    },
    {
        word: "desert",
        hint: "A barren or arid land with little or no precipitation."
    },
    {
        word: "fantasy",
        hint: "A genre of imaginative fiction involving magic and supernatural elements."
    },
    {
        word: "breeze",
        hint: "A gentle wind."
    },
    {
        word: "oasis",
        hint: "A fertile spot in a desert where water is found."
    },
    {
        word: "safari",
        hint: "An expedition or journey, typically to observe wildlife in their natural habitat."
    },
    {
        word: "planet",
        hint: "A celestial body that orbits a star and does not produce light of its own."
    },
    {
        word: "river",
        hint: "A large natural stream of water flowing in a channel to the sea, a lake, or another such stream."
    },
    {
        word: "enigma",
        hint: "Something that is mysterious, puzzling, or difficult to understand."
    },
    {
        word: "paradox",
        hint: "A statement or situation that contradicts itself or defies intuition."
    },
    {
        word: "puzzle",
        hint: "A game, toy, or problem designed to test ingenuity or knowledge."
    },
    {
        word: "whisper",
        hint: "To speak very softly or quietly, often in a secretive manner."
    },
    {
        word: "shadow",
        hint: "A dark area or shape produced by an object blocking the light."
    },
    {
        word: "secret",
        hint: "Something kept hidden or unknown to others."
    },
    {
        word: "unveil",
        hint: "To make known or reveal something previously secret or unknown."
    },
    {
        word: "vibrant",
        hint: "Full of energy, brightness, and life."
    },
];

const word = document.getElementById("word");
const hint = document.getElementById("hint");
const start_button = document.getElementById("start")
const score = document.getElementById("score");
const hangman = document.getElementById("hangman");
const result = document.getElementById("result");
const result_img = document.getElementById("result_img");
const myModal = document.getElementById("myModal");
const alphas = document.getElementsByClassName("btn");
const correct_word = document.getElementById("correct_word");
const sound = document.createElement("audio");
let current_word = "";
let chance = 0;
let count=0;

function start() {
    chance = 0;
    count=0;
    myModal.classList.add("hide");
    word.innerHTML="";
    create_blanks();
    score.innerText = chance;
    for(let i=0; i<26; i++) {
        const ele = document.getElementById(String.fromCharCode(65+i));
        ele.style.backgroundColor="rgb(63, 63, 221)";
        ele.disabled = false;
    }
    hangman.setAttribute("src", "images/hangman-0.svg");
}

function create_blanks() {
    const index = Math.floor(Math.random()*wordList.length);
    const word_len = wordList[index].word.length;
    for(let i=0; i<word_len; i++) {
        const btn = document.createElement("button");
        btn.classList.add("btn2");
        btn.setAttribute("id", `b${i}`);
        word.append(btn);
    }
    document.getElementById("hide_hint").setAttribute("class", "");
    hint.innerText = wordList[index].hint;
    start_button.classList.add("hide");
    current_word = wordList[index].word.toUpperCase();
}

function main(ele) {
    const len = current_word.length;
    const arr = current_word.split("");
    const element = document.getElementById(ele);
    let flag = false;
    for(let i=0; i<len; i++) {
        if(arr[i] == ele){
            let id = document.getElementById(`b${i}`);
            id.innerText = ele;
            element.style.backgroundColor= "green";
            flag = true;
            count++;
        }
    }
    if(flag == false) {
        element.style.backgroundColor="red";
        chance++;
        score.innerText = chance;
        hangman.setAttribute("src", `images/hangman-${chance}.svg`);
        if(chance == 6) {
            myModal.classList.remove("hide");
            result.innerText = "YOU LOSE!";
            result_img.setAttribute("src", "images/lost.gif");
            correct_word.innerText = current_word;
            sound.setAttribute("src", "images/lose.wav");
            sound.play();
        }
    }
    if(count == len) {
        myModal.classList.remove("hide");
        result.innerText = "YOU WIN!";
        result_img.setAttribute("src", "images/victory.gif");
        correct_word.innerText = current_word;
        sound.setAttribute("src", "images/win.wav");
        sound.play();
    }
}

function alpha(ele) {
    sound.setAttribute("src", "images/click.wav");
    sound.play();
    const element = document.getElementById(ele);
    element.disabled = true;
    element.style.backgroundColor = "red"
    main(ele);
}
