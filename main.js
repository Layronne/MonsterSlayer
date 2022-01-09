'use strict'

const start = document.querySelector('.start');
const commandeButton = document.querySelector('.commandbutton');
const attackButton = document.querySelector('.attackbutton');
const specialAttack = document.querySelector('.specialbutton');
const healButton = document.querySelector('.heal');
const giveUpButton = document.querySelector('.giveup');
const hpBarrePlayer = document.querySelector('.hpbarreplayer');
const hpBarreMonster = document.querySelector('.hpbarremonster');
const log = document.querySelector('.log')

let lifePLayer = 100;
let dammagePlayer = 0;
let lifeMonster = 100;
let dammageMonster = 0;




    function create(element) {
        return document.createElement(element)
}

class ZoneLog {

    zone(dammagePlayer, dammageMonster, end = false, heal = false) {
        if(!end) {
            const player = create('p');
            const monster = create('p');
            player.innerText = !heal? `vous avez inflige ${dammagePlayer} de degat`:`vous vous etes soigne de ${dammagePlayer} points de vie`;
            player.setAttribute('class', !heal?'playerAction':'playerHeal1')
            monster.innerText = `le monstre vous a inflige ${dammageMonster} point de degats`;
            monster.setAttribute('class', 'monsterAction');
            log.appendChild(player);
            log.appendChild(monster);
        } else {
            log.innerHTML = '';
        }
    }
}

class Surrender extends ZoneLog {

    giveUp( win = false, winner = undefined) {
        lifePLayer = 100;
        lifeMonster = 100;
        hpBarrePlayer.style.width = `${lifePLayer}/100`;
        hpBarreMonster.style.width = `${lifeMonster}/100`
        hpBarrePlayer.childNodes[1].innerText = `${lifePLayer}/100`
        hpBarreMonster.childNodes[1].innerText = `${lifeMonster}/100`
        commandeButton.style.display = 'block';
        start.style.display = 'none';
        super.zone(0, 0, true);

        if(!win) {
            alert('GAME OVER');
        } else if(win && Winner) {
            alert(`The Winner is ${winner}`)
        }
    }
}

class Game extends Surrender {

    play(event) {
        event.stop();
        start.style.display = 'none';
        commandeButton.style.display = 'block';
    }

    dpsFunction(event) {
        event.stop();
        dammageMonster = Math.floor(Math.random()*(10 - 3) + 3);
        dammagePlayer = Math.floor(Math.random()*(10 - 5) + 5);
        lifePLayer = lifePLayer - dammagePlayer;
        lifeMonster = lifeMonster - dammageMonster;
        hpBarrePlayer.style.width = `${lifePLayer}/100`;
        hpBarreMonster.style.width = `${lifeMonster}/100`;
        hpBarrePlayer.childNodes[1].innerText = `${lifePLayer}/100`;
        hpBarreMonster.childNodes[1].innerText = `${lifeMonster}/100`;
        super.zone(dammageMonster,dammagePlayer);

        if(lifePLayer <= 0 || lifeMonster <= 0) {
            let winner = lifePLayer <= 0 ? 'Monstre' : 'joueur';
            super.giveUp(true, winner);
        }

    }

    specialDpsFunction(event) {
        event.stop();
        dammagePlayer = Math.floor(Math.random() * (20 - 5) + 5);
        dammageMonster = Math.floor(Math.random() * (10 - 5) + 5);
        lifePLayer = lifePLayer - dammagePlayer;
        lifeMonster = lifeMonster - dammageMonster;
        hpBarrePlayer.style.width = `${lifePLayer}/100`;
        hpBarreMonster.style.width = `${lifeMonster}/100`;
        hpBarrePlayer.childNodes[1].innerText = `${lifePLayer}/100`;
        hpBarreMonster.childNodes[1].innerText = `${lifeMonster}/100`;
        super.zone9(dammageMonster, dammagePlayer);

        if (lifePLayer <= 0 || lifeMonster <= 0) {
            let winner = lifePLayer <= 0 ? 'Monstre' : 'Joueur';
            super.giveUp(true, winner);
        }
    }

    healfunction(event) {
        event.stop();

        if( lifeMonster < 100 && lifePLayer < 100) {
            dammagePlayer = Math.floor(Math.random() * (10 - 5) + 5);
            lifePLayer = lifePLayer - dammagePlayer;
            hpBarrePlayer.style.width = `${lifePLayer}/100`;
            lifePLayer = lifePLayer + heal;
            hpBarrePlayer.style.width = lifePLayer >= 100 ? '100/100' : `${lifePLayer}/100`;
            hpBarrePlayer.childNodes[1].innerText = lifePLayer >= 100 ? '100/100' : `${lifePLayer}/100`;
            super.zone(heal,dammagePlayer,false,true);

        }
    }

}

giveUpButton.addEventListener('click', Game.giveUp);
healButton.addEventListener('click', Game.healfunction)
specialAttack.addEventListener('click', Game.specialDpsFunction);
attackButton.addEventListener('click', Game.dpsFunction)
start.addEventListener('click', Game.play)

