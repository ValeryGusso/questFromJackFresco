let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector('#time-game')
let $bigBlock = document.querySelector('.app')
let $hide = document.querySelector('#hide')
let $header = document.querySelector('#time-header')
let $headerTime = document.querySelector('#time-header2')
let $headerGame = document.querySelector('#ti-pidor')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $gameTime = document.querySelector('#game-time')
let $clown = document.querySelector('#clown')
let $foother = document.querySelector('.app__footer')
let $arrow = document.querySelector('.arrow')
let $a = document.querySelector('#a')

let scoreNo = 0
let scoreYes = 0
let defaulfFontYes = 24
let defaulfFontNo = 24
let defaultSizeYes = 50
let defaultSizeNo = 50
let isGameStarted = false
let inputTime = $gameTime.value

let renderBox = () => {
    $game.innerHTML = ''
    let gameSize = $game.getBoundingClientRect()
    let maxTopYes = gameSize.height - defaultSizeYes
    let maxTopNo = gameSize.height - defaultSizeNo
    let maxLeftYes = gameSize.width - defaultSizeYes
    let maxLeftNo = gameSize.width - defaultSizeNo
    let boxTop = getRandom(0, maxTopNo)
    let box2Top = getRandom(0, maxTopYes)
    let boxLeft = getRandom(0, maxLeftNo)
    let box2Left = getRandom(0, maxLeftYes)

    let box = document.createElement('div') // создаёт html код внутри жаваскрипта
    box.style.width = box.style.height = defaultSizeNo + 'px'
    box.style.position = 'absolute'
    box.style.cursor = 'pointer'
    // box.style.border = '5px solid black'
    // box.style.top = boxTop + 'px'
    // box.style.left = boxLeft + 'px'
    box.textContent = 'Нет'
    box.style.textAlign = 'left'
    box.style.paddingTop = '6px'
    box.style.fontSize = defaulfFontNo + 'px'
    box.setAttribute('data-no', true)

    let box2 = document.createElement('div')
    box2.style.width = box2.style.height = defaultSizeYes + 'px'
    box2.style.position = 'absolute'
    box2.style.cursor = 'pointer'
    // box2.style.border = '5px solid black'
    // box2.style.top = box2Top + 'px'
    // box2.style.left = box2Left + 'px'
    box2.textContent = 'Да'
    box2.style.textAlign = 'left'
    box2.style.paddingTop = '6px'
    box2.style.fontSize = defaulfFontYes + 'px'
    box2.setAttribute('data-yes', true)

    if ((Math.abs(boxTop - box2Top) + Math.abs(boxLeft - box2Left)) > 100) {
        box2.style.top = box2Top + 'px'
        box2.style.left = box2Left + 'px'
        box.style.top = boxTop + 'px'
        box.style.left = boxLeft + 'px'

    } else {
        box2.style.top = '50px'
        box2.style.left = '50px'
        box.style.top = '200px'
        box.style.left = '200px'
    }

    $game.insertAdjacentElement('afterbegin', box) // добавляет html код в DOM дерево
    $game.insertAdjacentElement('afterbegin', box2)
}

let startGame = () => {
    $header.setAttribute('class', 'hide')
    $headerGame.removeAttribute('class', 'hide')
    isGameStarted = true
    $start.classList.add('hide')
    $game.style.backgroundColor = '#fff'
    $game.style.background = 'url("")'
    $foother.setAttribute('class', 'hide')

    let time = $gameTime.value
    let interval = setInterval(() => {
        if (time > 0) {
        $time.textContent = (time - 0.1).toFixed(1)
        time -= 0.1
        }  else {
            clearInterval(interval)
            endGame()
        }
    }, 100)

    renderBox()
}

let endGame = () => {
    isGameStarted = false
    $headerGame.setAttribute('class', 'hide')
    $arrow.classList.remove('hide')
    if (scoreNo > 0 && scoreYes === 0) {
        $resultHeader.removeAttribute('class', 'hide')
        $bigBlock.setAttribute('class', 'app congratulation')
        $hide.setAttribute('class', 'hide')
        if (scoreNo > 1 && scoreNo < 5) {
            $a.removeAttribute('class', 'hide')
        }
    } else if (scoreYes === 0) {
        $clown.removeAttribute('class', 'hide')
        $bigBlock.setAttribute('class', 'app clown')
        $hide.setAttribute('class', 'hide')
    }
    $result.textContent = scoreNo
    $game.innerHTML = ''
}

let boxClick = (event) => {
    event.preventDefault()
    if (event.target.dataset.yes && isGameStarted) {
        $bigBlock.setAttribute('class', 'app pidaras')
        $hide.setAttribute('class', 'hide')
        $arrow.classList.remove('hide')
        scoreYes++
    } else if (event.target.dataset.no && defaulfFontYes > 0 && defaultSizeNo > 0 && isGameStarted) {
        renderBox()
        scoreNo++
        if (defaultSizeNo > 0) {
        defaultSizeYes += 4
        defaultSizeNo -= 2
        defaulfFontYes += 4
        defaulfFontNo -= 1
        }

    }
}

let setGameTime = () => {
   $headerTime.textContent = $gameTime.value
   $time.value = $gameTime.value
}

let reset = () => {
    location.reload()
}

let getRandom = (min, max) => {
    return Math.ceil((Math.random() * (max - min) + min))
}

$start.addEventListener('click', startGame)
$game.addEventListener('click', boxClick)
$gameTime.addEventListener('input', setGameTime)
$arrow.addEventListener('click', reset)
