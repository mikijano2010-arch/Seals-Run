const seal = document.getElementById("seal");
const rock = document.getElementById("rock");
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const playButton = document.getElementById("playButton");
const cloud1 = document.getElementById("cloud1");
const cloud2 = document.getElementById("cloud2");
const jumpSound = new Audio("assets/audio/jump.mp3");
const correctSound = new Audio("assets/audio/correct.mp3");
const wrongSound = new Audio("assets/audio/wrong.mp3");
const gameOverSound = new Audio("assets/audio/gameover.mp3");
const winSound = new Audio("assets/audio/win.mp3");
const music = new Audio("assets/audio/music.mp3");

music.loop = true;
music.volume = 0.4;

let y = 110;
let velocity = 0;
let jumping = false;

let rockX = 900;
let rockSpeed = 6;
let rockSize = 50;
let cloud1X = 600;
let cloud2X = 250;
let backgroundX = 0;
let score = 0;
let lives = 3;
let gameOver = false;
let showingQuestion = false;
let bestScore = localStorage.getItem("bestScore") || 0;

const scoreText = document.getElementById("score");
const hearts = document.querySelector("#hud span");
const bar = document.getElementById("bar");
const questionBox = document.getElementById("questionBox");
const answers = document.querySelectorAll(".answer");
const resultBox = document.getElementById("resultBox");
const resultTitle = document.getElementById("resultTitle");
const resultExplanation = document.getElementById("resultExplanation");
const continueButton = document.getElementById("continueButton");
const gameOverBox = document.getElementById("gameOverBox");
const finalScore = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");

let currentQuestion;
const questions = [

{
    question:"¿Qué significa respetar los límites personales?",
    answers:[
        "Escuchar y respetar cuando alguien dice 'no'.",
        "Obligar a la otra persona.",
        "Ignorar sus sentimientos.",
        "Burlarse de sus decisiones."
    ],
    correct:0,
    explanation:"Todas las personas tienen derecho a establecer límites y deben ser respetados."
},

{
    question:"¿Qué es el consentimiento?",
    answers:[
        "Aceptar libremente una situación.",
        "Obligar a alguien.",
        "Guardar un secreto.",
        "Hacer lo que los demás quieren."
    ],
    correct:0,
    explanation:"El consentimiento debe ser libre, claro y puede retirarse en cualquier momento."
},

{
    question:"¿Qué debes hacer si alguien te hace sentir incómodo?",
    answers:[
        "Decirlo a un adulto de confianza.",
        "Quedarte callado.",
        "Aceptar siempre.",
        "No contarlo nunca."
    ],
    correct:0,
    explanation:"Buscar ayuda en un adulto de confianza siempre es una buena decisión."
},

{
    question:"¿Quién puede decidir sobre tu propio cuerpo?",
    answers:[
        "Tú mismo.",
        "Tus amigos.",
        "Cualquier persona.",
        "Internet."
    ],
    correct:0,
    explanation:"Cada persona tiene derecho a decidir sobre su propio cuerpo."
},

{
    question:"¿Qué debes hacer si recibes un mensaje que te hace sentir incómodo?",
    answers:[
        "Contárselo a un adulto de confianza.",
        "Responder siempre.",
        "Compartirlo con todos.",
        "Ignorarlo para siempre."
    ],
    correct:0,
    explanation:"Es importante pedir ayuda cuando algo te hace sentir incómodo."
},

{
    question:"¿Qué significa respetar la privacidad de otra persona?",
    answers:[
        "No revisar sus cosas sin permiso.",
        "Leer todos sus mensajes.",
        "Contar sus secretos.",
        "Publicar sus fotos."
    ],
    correct:0,
    explanation:"La privacidad es un derecho que debemos respetar."
},

{
    question:"¿Qué es una amistad saludable?",
    answers:[
        "Una relación basada en el respeto.",
        "Obligar al otro a hacer cosas.",
        "Controlar a los amigos.",
        "Burlarse constantemente."
    ],
    correct:0,
    explanation:"Las amistades saludables se basan en el respeto y la confianza."
},

{
    question:"¿Qué debes hacer si alguien no respeta tus límites?",
    answers:[
        "Decir 'no' y buscar ayuda.",
        "Aceptar siempre.",
        "Quedarte callado.",
        "Hacer lo mismo."
    ],
    correct:0,
    explanation:"Buscar ayuda y expresar tus límites es lo correcto."
},

{
    question:"¿Qué información personal no debes compartir con desconocidos?",
    answers:[
        "Tu dirección y datos personales.",
        "Tu color favorito.",
        "Tu comida favorita.",
        "Tu deporte favorito."
    ],
    correct:0,
    explanation:"Nunca compartas información personal con personas desconocidas."
},

{
    question:"¿Qué significa el consentimiento?",
    answers:[
        "Aceptar libremente sin presión.",
        "Hacer algo obligado.",
        "Guardar un secreto.",
        "Aceptar por miedo."
    ],
    correct:0,
    explanation:"El consentimiento siempre debe ser libre y voluntario."
}



];

let availableQuestions = [...questions];

function showQuestion(){

    if(availableQuestions.length === 0){

    availableQuestions = [...questions];

}

const randomIndex = Math.floor(Math.random() * availableQuestions.length);

currentQuestion = availableQuestions[randomIndex];

availableQuestions.splice(randomIndex, 1);

    document.getElementById("questionText").textContent = currentQuestion.question;

    answers.forEach((button,index)=>{

        button.textContent = currentQuestion.answers[index];

        if(index == currentQuestion.correct){
            button.dataset.correct = "true";
        }else{
            button.dataset.correct = "false";
        }

    });

    questionBox.style.display = "flex";

}

function update(){

    if(gameOver || showingQuestion){
    return;
}

    //----- FÍSICA DEL SALTO -----

    velocity -= 0.8;

    y += velocity;

    if(y <= 110){
        y = 110;
        velocity = 0;
        jumping = false;
    }

    seal.style.bottom = y + "px";

    //----- MOVIMIENTO DE LA ROCA -----

    rockX -= rockSpeed;

    if(rockX < -rockSize){

    rockX = 900;

    rockSpeed = Math.random()*4 + 5;

    rockSize = Math.random()*30 + 40;

    rock.style.width = rockSize + "px";
    rock.style.height = rockSize + "px";

    score++;

    scoreText.textContent = "⭐ " + score;

    bar.style.width = (score % 10) * 10 + "%";

    if(score >= 50){

    gameOver = true;

    finalScore.textContent = "🏆 ¡GANASTE!\nPuntaje: " + score + " ⭐";

    gameOverBox.style.display = "flex";

    return;

}

    if(score > 0 && score % 10 === 0){

    showingQuestion = true;

    showQuestion();

    rock.style.left = rockX + "px";

    return;

}

}

    rock.style.left = rockX + "px";

    //----- COLISIONES -----

    if(
    rockX < 180 &&
    rockX > 90 &&
    y < 160
){

    gameOver = true;

    lives--;

    if(lives==2){
        hearts.textContent="❤️❤️🤍";
    }

    if(lives==1){
        hearts.textContent="❤️🤍🤍";
    }

    if(lives==0){

        hearts.textContent="🤍🤍🤍";

        if(score > bestScore){
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
}

        gameOver = true;

        setTimeout(()=>{

            finalScore.textContent =
"Puntaje: " + score + " ⭐\nRécord: " + bestScore + " 🏆";

            gameOverBox.style.display = "flex";
            gameOverSound.play();

        },300);

        return;
    }

    setTimeout(()=>{

        y=110;
        velocity=0;
        jumping=false;

        rockX=900;

        gameOver=false;

        update();

    },300);

    return;

}

//----- MOVIMIENTO DE LAS NUBES -----

cloud1X -= 0.5;
cloud2X -= 0.3;

if(cloud1X < -150){
    cloud1X = 900;
}

if(cloud2X < -200){
    cloud2X = 900;
}

cloud1.style.left = cloud1X + "px";
cloud2.style.left = cloud2X + "px";

// Movimiento del fondo
backgroundX -= 0.3;
game.style.backgroundPosition = backgroundX + "px 0";

requestAnimationFrame(update);

}

// SALTO CON ESPACIO

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space" && !jumping){

        velocity = 15;
        jumping = true;

        jumpSound.currentTime = 0;
        jumpSound.play();

    }

});

// SALTO EN CELULAR

document.addEventListener("click",()=>{

    if(!jumping){

        velocity = 15;
        jumping = true;

        jumpSound.currentTime = 0;
        jumpSound.play();

    }

});

playButton.addEventListener("click",()=>{

    music.play();

    menu.style.display = "none";
    game.style.display = "block";

    update();

});

answers.forEach(button => {

    button.addEventListener("click", () => {

        // Verifica si respondió correctamente
        if(button.dataset.correct === "true"){

    button.style.background = "#2ecc71";

    resultTitle.textContent = "✅ ¡Correcto!";
    correctSound.play();

    score += 5;

}else{

    button.style.background = "#e74c3c";

    resultTitle.textContent = "❌ Respuesta incorrecta";
    wrongSound.play();

}

        // Explicación
        resultExplanation.textContent = currentQuestion.explanation;

        // Actualiza el puntaje
        scoreText.textContent = "⭐ " + score;
        bar.style.width = (score % 10) * 10 + "%";

        // Oculta la pregunta
        questionBox.style.display = "none";

        // Muestra la explicación
        resultBox.style.display = "flex";

    });

});

continueButton.addEventListener("click", () => {

    resultBox.style.display = "none";

    showingQuestion = false;

    rockX = 900;
    rock.style.left = rockX + "px";

    answers.forEach(button => {
        button.style.background = "#4CAF50";
    });

    update();

});

restartButton.addEventListener("click", () => {

    gameOverBox.style.display = "none";

    lives = 3;
    hearts.textContent = "❤️❤️❤️";

    score = 0;
    scoreText.textContent = "⭐ 0";

    bar.style.width = "0%";

    y = 110;
    velocity = 0;
    jumping = false;

    rockX = 900;
    rock.style.left = rockX + "px";

    gameOver = false;
    showingQuestion = false;

availableQuestions = [...questions];

update();

});