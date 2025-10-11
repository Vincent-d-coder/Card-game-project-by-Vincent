
    const footballers = [
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
    var shuf_footballers = footballers.sort(() => (Math.random() > .5) ? 2 : -1);
    for (var i = 0; i < footballers.length; i++) {
        let box = document.createElement('div')
        box.className = 'item';
        box.innerHTML = `<img src="${shuf_footballers[i]}" alt="player">`;
        document.querySelector('.game').appendChild(box);

        box.onclick = function(){
            this.classList.add('boxOpen')
        }
    }