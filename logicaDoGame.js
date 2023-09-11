let t1 = document.getElementById('t1');
let sc = document.getElementById('sc');
let vs = document.getElementById('vs');
let cardComputer = document.getElementById('cardComputer');
let res1;
let res2 = '';
let atkValue = '';
let nameValue = '';
let linkComputer = '';
let playerOne = []; // Array para armazenar os botões
let computador = [];
let imgComputer = [];
let contadorplayerOne = 0; // Contador para botão 
let computerAdded = false; // Variável para controlar se "Computer" já foi adicionado

fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?language=pt&archetype=Blue-Eyes")
  .then(response => response.json())
  .then(data => {
    for (let i = 12; i < 15; i++) {
      atkValue = data.data[i].atk;
      nameValue = data.data[i].name;
      linkComputer = data.data[i].card_images[0].image_url;

      let img = document.createElement('img');

      img.src = linkComputer;
      img.alt = nameValue;
      img.value = atkValue; 
      img.id = i;
      img.style.cursor = 'pointer'; 
      img.title = `ATK: ${atkValue}`;
      
      t1.appendChild(img);

      playerOne.push(img);
      computador.push(atkValue);
      imgComputer.push(linkComputer);

      img.addEventListener('click', () => {
        res1 = img.value; 
        contadorplayerOne++;

        if (!computerAdded) {
          let versus = document.createElement('span');
          versus.innerHTML = 'Computer';
          vs.appendChild(versus);
          computerAdded = true; // Marque como verdadeiro para evitar repetição
        }

        const indiceAleatorio = Math.floor(Math.random() * computador.length);
        res2 = computador[indiceAleatorio];

        cardComputer.src = imgComputer[indiceAleatorio];
        cardComputer.title = `ATK: ${computador[indiceAleatorio]}`;

        verificarComparacao();
      });
    }
  })
  .catch(error => {
    console.error(error);
  });

function verificarComparacao() {
  if (contadorplayerOne === 1) {
    console.log("res1: " + res1);
    console.log("res2: " + res2);
    if (res1 > res2) {
      sc.innerHTML = "--\\\\YOU WON!//-- <div style='margin-left: 50px;'>😄</div>";
    } else if (res1 == res2) {
      sc.innerHTML = "--||There was a tie, please try again.||-- <div style='margin-left: 50px;'>😑</div>";
    } else {
      sc.innerHTML = "--//YOU LOST\\\\-- <div style='margin-left: 50px;'>😞</div>";
    }
    contadorplayerOne = 0;
  }
}
