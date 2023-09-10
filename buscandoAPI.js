document.addEventListener("DOMContentLoaded", function() {
    let naming = document.getElementById('named');
    let imging = document.getElementById('img');
    // let descing = document.getElementById('desc');
  
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?language=pt&archetype=Blue-Eyes")
      .then(response => response.json())
      .then(data => {
        for (let i = 12; i < 15; i++) {
          // let named = document.createElement("div");
          let imged = document.createElement("img");
          // let desced = document.createElement("div");
          
          // named.innerHTML = data.data[i].name;
          imged.src = data.data[i].card_images[0].image_url;
          // desced.innerHTML = data.data[i].desc;
          
          // naming.appendChild(named);
          imging.appendChild(imged);
          // descing.appendChild(desced);
          console.log(data.data)
        }
      })
      .catch(error => console.error(error));
  });
  