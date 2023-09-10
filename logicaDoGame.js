let t1 = document.getElementById('t1');
let sc = document.getElementById('sc');
let cardComputer = document.getElementById('cardComputer')
let res1;
let res2 = '';
let atkValue = '';
let nameValue = '';
let linkComputer = '';
let playerOne = []; // Array para armazenar os botões1
let computador = [];
let imgComputer = [];
let contadorplayerOne = 0; // Contador para botão 1

fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?language=pt&archetype=Blue-Eyes")
  .then(response => response.json())
  .then(data => {
    for (let i = 12; i < 15; i++) {
      atkValue = data.data[i].atk;
      nameValue= data.data[i].name
      linkComputer= data.data[i].card_images[0].image_url;

      let b1 = document.createElement('button');

      b1.innerHTML = nameValue;
      b1.value = atkValue;
      b1.id = i;

      t1.appendChild(b1);

      playerOne.push(b1);
      computador.push(atkValue)
      imgComputer.push(linkComputer)

    }

    // Atribua os eventos de clique aos botões
    for (let i = 0; i < 3; i++) {
      playerOne[i].addEventListener('click', () => {
        res1 = playerOne[i].value;
        contadorplayerOne++;

        const indiceAleatorio = Math.floor(Math.random() * computador.length);
        res2 = computador[indiceAleatorio];

        cardComputer.src = imgComputer[indiceAleatorio]
        
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
      sc.innerHTML = "YOU WON!";
    } else if (res1 == res2) {
      sc.innerHTML = "There was a tie, please try again.";
    } else {
      sc.innerHTML = "YOU LOST =(";
    }
    contadorplayerOne = 0;
  }
}
