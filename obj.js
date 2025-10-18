/*class Game {
    constructor() {
        this.images = [
            "images/messi.png",
        "images/messi.png",
        "images/ronaldo.png",
        "images/ronaldo.png",
        "images/neymar.png",
        "images/neymar.png",
        "images/haaland.png",
        "images/haaland.png",
        "images/salah.png",
        "images/salah.png",
        "images/mbappe.png",
        "images/mbappe.png"

        ];
        this.displayImages();
    }
    displayImages() {

       //let shuf_footballers = this.images.sort(() => (Math.random() > .5) ? 2 : -1);
       let shuf_footballers = this.images;
       
    for (var i = 0; i < this.images.length; i++) {
        let box = document.createElement('div')
        box.className = 'item';
        box.innerHTML = `<div class ="face flip"></div><img src="${shuf_footballers[i]}" class="face flop" alt="player">`;
        
        document.querySelector('.game').appendChild(box);

        box.onclick = function(){
            this.classList.add('boxOpen')
            setTimeout(function(){
                if(document.querySelectorAll('.boxOpen').length > 1){
                    if(document.querySelectorAll('.boxOpen')[0].innerHTML == document.querySelectorAll('.boxOpen')[1].innerHTML){
                        document.querySelectorAll('.boxOpen')[0].classList.add('boxMatch')
                        document.querySelectorAll('.boxOpen')[1].classList.add ('boxMatch')
                        document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen')
                        document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen')
                        if(document.querySelectorAll('.boxMatch').length == footballers.length){alert('win')}
                        else {
                            document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen')
                            document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen')

                        }

                    }
                }
            },700)
        }
    }
    }

   

}
new Game();*/
// --- utils ---
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// --- Build cards first (initial render) ---
(function renderCardsFirst(){
  const images = [
    "images/messi.png","images/messi.png",
    "images/ronaldo.png","images/ronaldo.png",
    "images/neymar.png","images/neymar.png",
    "images/haaland.png","images/haaland.png",
    "images/salah.png","images/salah.png",
    "images/mbappe.png","images/mbappe.png"
  ];

  const shuf_footballers = shuffle(images);
  const gameEl = document.querySelector('.game');

  for (let i = 0; i < shuf_footballers.length; i++) {
    const box = document.createElement('div');
    box.className = 'item';
    box.dataset.name = shuf_footballers[i]; // used for matching

    box.innerHTML = `
      <div class="face flip"></div>
      <img src="${shuf_footballers[i]}" class="face flop" alt="player">
    `;

    gameEl.appendChild(box);
  }
})();

// --- OOP Game class ---
class Game {
  constructor({ cardSelector = '.item', flipBackDelay = 700, matchBlinkDelay = 800 } = {}) {
    this.container = document.querySelector('.game');
    this.cards = [...document.querySelectorAll(cardSelector)];
    this.images = this.cards.map(c => c.dataset.name); // keep current pool for resets

    this.first = null;
    this.second = null;
    this.lockBoard = false;
    this.flipBackDelay = flipBackDelay;
    this.matchBlinkDelay = matchBlinkDelay;

    this.onCardClick = this.onCardClick.bind(this);
    this.attach();
  }

  attach() {
    this.cards.forEach(card => card.addEventListener('click', this.onCardClick));
  }

  onCardClick(e) {
    const card = e.currentTarget;

    // Already matched? Blink red & ignore
    if (card.classList.contains('matched')) {
      card.classList.remove('denyBlink');
      void card.offsetWidth;
      card.classList.add('denyBlink');
      return;
    }

    if (this.lockBoard || card === this.first || card.classList.contains('boxOpen')) return;

    card.classList.add('boxOpen');

    if (!this.first) { 
      this.first = card; 
      return; 
    }

    this.second = card;
    this.lockBoard = true;

    const isMatch = this.first.dataset.name === this.second.dataset.name;
    if (isMatch) this.handleMatch();
    else this.handleNoMatch();
  }

  handleMatch() {
    // re-trigger yellow blink
    [this.first, this.second].forEach(el => {
      el.classList.remove('matchBlink');
      void el.offsetWidth; // force reflow
      el.classList.add('matchBlink');
      el.classList.add('matched'); // stay face-up & unclickable via CSS
    });

    setTimeout(() => {
      // keep them face-up; just remove the transient blink
      this.first.classList.remove('matchBlink');
      this.second.classList.remove('matchBlink');

      // OPTIONAL: shuffle the whole board after each match
      // comment out next line if you don't want reshuffle-on-match
      this.reshuffleBoard();

      this.resetPick();
      this.checkWin(); // <-- check for win AFTER handling the match
    }, this.matchBlinkDelay);
  }

  handleNoMatch() {
    setTimeout(() => {
      this.first.classList.remove('boxOpen');
      this.second.classList.remove('boxOpen');
      this.resetPick();
    }, this.flipBackDelay);
  }

  resetPick() {
    this.first = null;
    this.second = null;
    this.lockBoard = false;
  }

  // Shuffle the DOM nodes so the whole board reorders
  reshuffleBoard() {
    const nodes = [...this.container.children];
    const shuffled = shuffle(nodes);
    shuffled.forEach(node => this.container.appendChild(node));
    this.cards = [...this.container.querySelectorAll('.item')];
  }

 
  checkWin() {
    const matchedCount = this.container.querySelectorAll('.item.matched').length;
    if (matchedCount === this.images.length) {
      alert('You win!');
      this.resetGame();
    }
  }


  resetGame() {
    // Clear the board
    this.container.innerHTML = '';

    // Rebuild with a fresh shuffle from the stored image pool
    const shuffled = shuffle(this.images);
    shuffled.forEach(src => {
      const box = document.createElement('div');
      box.className = 'item';
      box.dataset.name = src;
      box.innerHTML = `
        <div class="face flip"></div>
        <img src="${src}" class="face flop" alt="player">
      `;
      this.container.appendChild(box);
    });

 
    this.cards = [...this.container.querySelectorAll('.item')];
    this.resetPick();
    this.attach();
  }
}

// Start the game
new Game();
