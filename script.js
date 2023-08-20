
const state = JSON.parse(localStorage.getItem('userState'))
const signaArray = ['Виноград', 'Три_Топора', 'Два_Колокола', 'Лимоны', 'Bar', 'Вишни', 'Арбузы', 'Сливы', 'Апельсины'];
let win = document.getElementById('win');
let balance = document.getElementById('balance');
let walletValue;
let scoreItem = document.getElementById('score');
let score ;
if(state) {
    walletValue = state.balance;
    score = state.stars;
} else {
    walletValue = 1000000
    score = 0
}
let bidItem = document.getElementById('bid');
let bid = 5000;

let bidStep = 100
let upBidItem = document.getElementById('upBid')
let downBidItem = document.getElementById('downBid')

let scoreForWin = 100
let kfc = 5

bidItem.innerHTML = bid
scoreItem.innerHTML = score
balance.innerHTML = walletValue

function randomNumber() {
    let number = Math.floor(Math.random() * signaArray.length);
    return signaArray[number]
}

let autoMode = false
// Так и не могу разобраться как оотменить setInterval, пробовал и глобально переменную делать, далеее clearInterval. И по разным фнукциям раскидывал...
document.getElementById('auto').addEventListener('click', () => {
    autoMode = !autoMode
    if(autoMode) {
        setInterval(() => {
            init(autoMode)
            win.classList.add('display-none')
        }, 1000)
    } else{
        init(autoMode)
    }
    
})

document.getElementById('spin').addEventListener('click', () => {

    win.classList.add('display-none')
    init(true)
})

upBidItem.addEventListener('click', () => {
    bid += bidStep
    bidItem.innerHTML = bid
})

downBidItem.addEventListener('click', () => {
    if(bid <= 0) {
        return 
    } else {
        bid -= bidStep
        bidItem.innerHTML = bid
    }
})

function drawTable () {
    let table = document.getElementById('table');
//     <div style="display: flex; align-items: center; justify-content: center; padding: 0.5rem;">
//     <img src="./img/Виноград.png" style="width: 100%; height: 100%; object-fit: contain;"/>
// </div>
        
        table.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; padding: 0.5rem;">
                <img src="./img/${randomNumber()}.png" style="width: 100%; height: 100%; object-fit: contain; width: 105px; height: 65px"/>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; padding: 0.5rem;">
                <img src="./img/${randomNumber()}.png" style="width: 100%; height: 100%; object-fit: contain; width: 105px; height: 65px"/>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; padding: 0.5rem;">
                <img src="./img/${randomNumber()}.png" style="width: 100%; height: 100%; object-fit: contain; width: 105px; height: 65px"/>
            </div>

            <div class='check' style="display: flex; align-items: center; justify-content: center; padding: 0.5rem;">
                <img src="./img/${randomNumber()}.png" style="width: 100%; height: 100%; object-fit: contain; width: 105px; height: 65px"/>
            </div>
            <div class='check' style="display: flex; align-items: center; justify-content: center; padding: 0.5rem;">
                <img src="./img/${randomNumber()}.png" style="width: 100%; height: 100%; object-fit: contain; width: 105px; height: 65px"/>
            </div>
            <div class='check' style="display: flex; align-items: center; justify-content: center; padding: 0.5rem;">
                <img src="./img/${randomNumber()}.png" style="width: 100%; height: 100%; object-fit: contain; width: 105px; height: 65px"/>
            </div>

            <div style="display: flex; align-items: center; justify-content: center; padding: 0.5rem;">
                <img src="./img/${randomNumber()}.png" style="width: 100%; height: 100%; object-fit: contain; width: 105px; height: 65px"/>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; padding: 0.5rem;">
                <img src="./img/${randomNumber()}.png" style="width: 100%; height: 100%; object-fit: contain; width: 105px; height: 65px"/>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; padding: 0.5rem;">
                <img src="./img/${randomNumber()}.png" style="width: 100%; height: 100%; object-fit: contain; width: 105px; height: 65px"/>
            </div>
        `
}

function checkWin () {
    if(table.querySelectorAll('.check')) {

        const checkArray = table.querySelectorAll('.check')
        let result = [];
        checkArray.forEach(item => {
            result.push(item.children[0].getAttribute('src'))
            // console.log(item.children[0].getAttribute('src'))
        })

        // console.log(result)

        setTimeout(() => {

            if(result[0] === result[1] && result[0] === result[2]) {
                
                win.classList.remove('display-none')
                win.classList.add('display-win')

                walletValue += bid * kfc
                balance.innerHTML = walletValue

                score += scoreForWin
                scoreItem.innerHTML = score
            } else {
                walletValue -= bid
                balance.innerHTML = walletValue
            }

            const state = {
                balance: walletValue,
                stars: score
            }
    
            localStorage.setItem('userState', JSON.stringify(state));
        }, 100)


    }
}

const init = (mode) => {

    if(walletValue <= 0 ) {
        alert('Ваш баланс равень нулю! Пополните, чтобы продолжить') 
    } else {

        if(mode) {
            drawTable()
        
            checkWin()
        } else {
            autoMode = false
        }
    }
}