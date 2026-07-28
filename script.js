const player = document.getElementById("player");
const world = document.getElementById("world");
const dialogue = document.getElementById("dialogue");
const title = document.getElementById("pokemonName");
const close = document.getElementById("close");
const interaction = document.getElementById("interaction");
const fill = document.getElementById("fill");
const ending = document.getElementById("ending"); // Refers to <div id="ending">

const music = document.getElementById("music");
const victoryMusic = document.getElementById("victory-music");


if (music) music.volume = 0.05; 
if (victoryMusic) victoryMusic.volume = 0.05;

let x = 450;
let y = 300;

let discovered = 0;
let typingInterval;

const objects = [
    {type:"tree",x:40,y:40},
    {type:"tree",x:120,y:60},
    {type:"tree",x:200,y:80},
    {type:"tree",x:760,y:60},
    {type:"tree",x:850,y:80},
    {type:"tree",x:900,y:200},
    {type:"tree",x:80,y:520},
    {type:"tree",x:200,y:540},
    {type:"tree",x:420,y:560},
    {type:"tree",x:720,y:520},
    {type:"tree",x:840,y:500},

    {type:"flower",x:150,y:180},
    {type:"flower",x:640,y:180},
    {type:"flower",x:420,y:250},
    {type:"flower",x:560,y:320},
    {type:"flower",x:300,y:420},
    {type:"flower",x:120,y:350},
    {type:"flower",x:800,y:320}
];

document.addEventListener("keydown", () => {
    if (music && discovered < pokemon.length) {
        music.play();
    }
}, { once: true });

const objectLayer = document.getElementById("objects");

objects.forEach(object => {
    const img = document.createElement("img");
    img.src = "images/" + object.type + ".png";
    img.className = "object";
    img.style.left = object.x + "px";
    img.style.top = object.y + "px";
    objectLayer.appendChild(img);
});

pokemon.forEach(p => {
    const img = document.createElement("img");
    img.src = "images/" + p.name.toLowerCase() + ".png";
    img.className = "pokemon";
    img.style.left = p.x + "px";
    img.style.top = p.y + "px";
    world.appendChild(img);
});

function typeText(message) {
    const box = document.getElementById("typing");
    clearInterval(typingInterval);
    box.innerHTML = "";

    let i = 0;
    typingInterval = setInterval(() => {
        box.innerHTML += message[i];
        i++;
        if (i >= message.length) {
            clearInterval(typingInterval);
        }
    }, 25);
}

document.addEventListener("keydown", (e) => {
    if (dialogue.style.display === "block") return;

    if (e.key === "ArrowLeft" || e.key === "a") x -= 20;
    if (e.key === "ArrowRight" || e.key === "d") x += 20;
    if (e.key === "ArrowUp" || e.key === "w") y -= 20;
    if (e.key === "ArrowDown" || e.key === "s") y += 20;

    x = Math.max(0, Math.min(912, x));
    y = Math.max(0, Math.min(592, y));

    player.style.left = x + "px";
    player.style.top = y + "px";

    interaction.style.left = (x + 15) + "px";
    interaction.style.top = (y - 40) + "px";

    let nearPokemon = false;

    pokemon.forEach(p => {
        const dx = x - p.x;
        const dy = y - p.y;

        if (Math.sqrt(dx * dx + dy * dy) < 80) {
            nearPokemon = true;
        }
    });

    interaction.style.display = nearPokemon ? "block" : "none";

    if (e.key === "e") {
        pokemon.forEach(p => {
            const dx = x - p.x;
            const dy = y - p.y;

            if (Math.sqrt(dx * dx + dy * dy) < 80) {
                if (!p.found) {
                    p.found = true;
                    discovered++;
                    fill.style.width = (discovered / pokemon.length * 100) + "%";
                }

                title.textContent = p.name;
                typeText(p.message);
                dialogue.style.display = "block";

                
                if (discovered === pokemon.length) {
            
                    if (music) music.pause();

                    if (victoryMusic) victoryMusic.play();

                    if (ending) ending.style.display = "block";
                }
            }
        });
    }
});

close.onclick = () => {
    dialogue.style.display = "none";
};