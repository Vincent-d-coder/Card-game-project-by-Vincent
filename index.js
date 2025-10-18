
    /*const footballers = [
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
    }*/