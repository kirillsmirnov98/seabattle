'use strict';

class Field {

    constructor(name) {
        this.name = name;
        this.battlefield = document.getElementsByClassName(`battlefield__${this.name}`)[0];
    }

    squadron = {
        four: [1, 4],
        triple: [2, 3],
        double: [3, 2],
        single: [4, 1],
    }

    arrTR = []; // массив строк таблицы (нужен для отрисовки клеток по типу матрицы)

    matrix = []; // матрица боя

    aliveShips; // текущее количество живых палуб

    createTable() {
        let table = document.createElement('table');
        table.setAttribute('class', `${this.name}Field`);
        let tbody = document.createElement('tbody');
        table.append(tbody);
        for (let i = 0; i < 10; ++i) {
            let tr = document.createElement('tr');
            tbody.append(tr);
            for (let j = 0; j < 10; ++j) {
                let td = document.createElement('td');
                tr.append(td);
            }
        }
        this.battlefield.prepend(table);
        this.arrTR = tbody.children;
    }

    clearBattleField() {
        let table = document.getElementsByClassName(`${this.name}Field`)[0];
        let thisTD = table.getElementsByTagName('td');
        for (let td of thisTD) {
            td.className = '';
        }

    }

    createRandomSquad() {
        let table = document.getElementsByClassName(`${this.name}Field`)[0];
        let tableRows = table.getElementsByTagName('tr');
        let tableCells = table.getElementsByTagName('td');
        let matrix = [];
        let alive = 0;

        for (let i = 0; i < tableRows.length; ++i) {
            matrix[i] = new Array(tableRows.length);
            for (let j = 0; j < tableRows.length; ++j) {
                matrix[i][j] = 0;
            }
        }

        for (let type in this.squadron) {
            let count = this.squadron[type][0];
            let decks = this.squadron[type][1];
            for (let i = 0; i < count; ++i) {
                let position = Math.round(Math.random());
                showShip(decks, position, this.name);
            }
        }

        function showShip(decks, position, name) {
            let max = matrix.length - decks;

            if (position == 0) {
                let xCoord, yCoord, maxCoord, rightMark, leftMark, topMark, botMark;
                yCoord = Math.floor(Math.random() * (max + 1));
                xCoord = Math.floor(Math.random() * matrix.length);
                while ((tableRows[yCoord].children[xCoord].classList.contains('deathzone') || tableRows[yCoord].children[xCoord].classList.contains('shipsdeck')) || (tableRows[yCoord + decks - 1].children[xCoord].classList.contains('deathzone') || tableRows[yCoord + decks - 1].children[xCoord].classList.contains('shipsdeck'))) {
                    yCoord = Math.floor(Math.random() * (max + 1));
                    xCoord = Math.floor(Math.random() * matrix.length);
                }
                rightMark = xCoord + 1;
                leftMark = xCoord - 1;

                for (let i = 0; i < decks; ++i) {
                    maxCoord = yCoord + i;
                    tableRows[maxCoord].children[xCoord].classList.add('shipsdeck');
                    matrix[maxCoord][xCoord] = 1;
                    alive++;
                    if (0 <= rightMark && rightMark <= 9) {
                        tableRows[maxCoord].children[rightMark].classList.add('deathzone');
                        matrix[maxCoord][rightMark] = 4;
                    }
                    if (0 <= leftMark && leftMark <= 9) {
                        tableRows[maxCoord].children[leftMark].classList.add('deathzone');
                        matrix[maxCoord][leftMark] = 4;
                    }
                }
                topMark = yCoord - 1;
                botMark = maxCoord + 1;
                if (0 <= topMark && topMark <= 9) {
                    tableRows[topMark].children[xCoord].classList.add('deathzone');
                    matrix[topMark][xCoord] = 4;
                    if (0 <= rightMark && rightMark <= 9) {
                        tableRows[topMark].children[rightMark].classList.add('deathzone');
                        matrix[topMark][rightMark] = 4;
                    }
                    if (0 <= leftMark && leftMark <= 9) {
                        tableRows[topMark].children[leftMark].classList.add('deathzone');
                        matrix[topMark][leftMark] = 4;
                    }
                }
                if (botMark <= 9) {
                    tableRows[botMark].children[xCoord].classList.add('deathzone');
                    matrix[botMark][xCoord] = 4;
                    if (0 <= rightMark && rightMark <= 9) {
                        tableRows[botMark].children[rightMark].classList.add('deathzone');
                        matrix[botMark][rightMark] = 4;
                    }
                    if (0 <= leftMark && leftMark <= 9) {
                        tableRows[botMark].children[leftMark].classList.add('deathzone');
                        matrix[botMark][leftMark] = 4;
                    }
                }
            }

            if (position == 1) {
                let xCoord, yCoord, maxCoord, rightMark, leftMark, topMark, botMark;
                yCoord = Math.floor(Math.random() * matrix.length);
                xCoord = Math.floor(Math.random() * (max + 1));
                while ((tableRows[yCoord].children[xCoord].classList.contains('deathzone') || tableRows[yCoord].children[xCoord].classList.contains('shipsdeck')) || (tableRows[yCoord].children[xCoord + decks - 1].classList.contains('deathzone') || tableRows[yCoord].children[xCoord + decks - 1].classList.contains('shipsdeck'))) {
                    yCoord = Math.floor(Math.random() * matrix.length);
                    xCoord = Math.floor(Math.random() * (max + 1));
                }
                topMark = yCoord - 1;
                botMark = yCoord + 1;

                for (let i = 0; i < decks; ++i) {
                    maxCoord = xCoord + i;
                    tableRows[yCoord].children[maxCoord].classList.add('shipsdeck');
                    matrix[yCoord][maxCoord] = 1;
                    alive++;
                    if (0 <= topMark && topMark <= 9) {
                        tableRows[topMark].children[maxCoord].classList.add('deathzone');
                        matrix[topMark][maxCoord] = 4;
                    }
                    if (0 <= botMark && botMark <= 9) {
                        tableRows[botMark].children[maxCoord].classList.add('deathzone');
                        matrix[botMark][maxCoord] = 4;
                    }
                }
                rightMark = maxCoord + 1;
                leftMark = xCoord - 1;
                if (0 <= rightMark && rightMark <= 9) {
                    tableRows[yCoord].children[rightMark].classList.add('deathzone');
                    matrix[yCoord][rightMark] = 4;
                    if (0 <= topMark && topMark <= 9) {
                        tableRows[topMark].children[rightMark].classList.add('deathzone');
                        matrix[topMark][rightMark] = 4;
                    }
                    if (0 <= botMark && botMark <= 9) {
                        tableRows[botMark].children[rightMark].classList.add('deathzone');
                        matrix[botMark][rightMark] = 4;
                    }
                }
                if (0 <= leftMark && leftMark <= 9) {
                    tableRows[yCoord].children[leftMark].classList.add('deathzone');
                    matrix[yCoord][leftMark] = 4;
                    if (0 <= topMark && topMark <= 9) {
                        tableRows[topMark].children[leftMark].classList.add('deathzone');
                        matrix[topMark][leftMark] = 4;
                    }
                    if (0 <= botMark && botMark <= 9) {
                        tableRows[botMark].children[leftMark].classList.add('deathzone');
                        matrix[botMark][leftMark] = 4;
                    }
                }
            }

            if (name == 'comp') {
                for (let i = 0; i < tableCells.length; ++i) {
                    tableCells[i].classList.add('shadow');
                }
            }
        }

        this.aliveShips = alive;
        this.matrix = matrix;
    }
}
const human = new Field('human');
const comp = new Field('comp');
const btnStart = document.getElementsByClassName('btn__start')[0];
const btnRandomPlacement = document.getElementsByClassName('btn__random-place')[0];
const btnClearField = document.getElementsByClassName('btn__clear')[0];
const btnPlay = document.getElementsByClassName('btn__play')[0];
const btnCancel = document.getElementsByClassName('btn__cancel')[0];
const currentMove = document.getElementsByClassName('battlefield__current-move hide')[0];
const btnManualPlacement = document.getElementsByClassName('btn__manual-place')[0];
const btnReady = document.getElementsByClassName('btn__ready')[0];
const manualPlaceContainer = document.getElementsByClassName('battlefield__manual-place')[0];
const humTextStep = 'Ход игрока!';
const compTextStep = 'Ход компьютера!';

let compField;
let step;
let aliveManual = 0;
let matrixManual = [];
let li1 = manualPlaceContainer.firstElementChild.firstElementChild;
let li2 = manualPlaceContainer.firstElementChild.lastElementChild;
let allShips = document.getElementsByClassName('ship');

btnStart.addEventListener('click', createBattleFields);
btnRandomPlacement.addEventListener('click', createRandomSquadron);
btnClearField.addEventListener('click', clearField);
btnPlay.addEventListener('click', startGame);
btnCancel.addEventListener('click', interruptGame);
btnManualPlacement.addEventListener('click', createManualPlace);
manualPlaceContainer.addEventListener('click', shipSelection);
btnReady.addEventListener('click', createManualMatrix);

function createBattleFields() { // создание таблиц
    btnStart.setAttribute('hidden', true);
    btnRandomPlacement.removeAttribute('hidden');
    btnManualPlacement.removeAttribute('hidden');
    human.createTable();
    comp.createTable();
}

function createRandomSquadron() { //автоматическая отрисовка кораблей
    btnRandomPlacement.setAttribute('hidden', true);
    btnManualPlacement.setAttribute('hidden', true);
    btnClearField.removeAttribute('hidden');
    btnPlay.removeAttribute('hidden');
    human.createRandomSquad();
    console.log(human.matrix);
    comp.createRandomSquad();
}

function createManualPlace() { // создание ручной расстановки
    btnRandomPlacement.setAttribute('hidden', true);
    btnManualPlacement.setAttribute('hidden', true);
    btnClearField.removeAttribute('hidden');
    // comp.createRandomSquad();
    comp.battlefield.classList.add('hide');
    manualPlaceContainer.classList.remove('hide');

    for (let i = 0; i < 10; ++i) {
        matrixManual[i] = new Array(10);
        for (let j = 0; j < 10; ++j) {
            matrixManual[i][j] = 0;
        }
    }
}

function clearField() { // очистка таблиц
    btnClearField.setAttribute('hidden', true);
    btnPlay.setAttribute('hidden', true);
    btnRandomPlacement.removeAttribute('hidden');
    btnManualPlacement.removeAttribute('hidden');
    human.clearBattleField();
    comp.clearBattleField();
    for (let i = 0; i < 10; ++i) {
        matrixManual[i] = new Array(10);
        for (let j = 0; j < 10; ++j) {
            matrixManual[i][j] = 0;
        }
    }

    for (let ship of allShips) {
        if (ship.classList.contains('fourdeck') || ship.classList.contains('tripledeck')) {
            shipsReturn(ship, 4);
        }
        else {
            shipsReturn(ship, 2);
        }
    }
    comp.battlefield.classList.remove('hide');
    manualPlaceContainer.classList.add('hide');


}

function startGame() { // запуск партии
    btnClearField.setAttribute('hidden', true);
    currentMove.classList.remove('hide');
    btnPlay.setAttribute('hidden', true);
    btnCancel.removeAttribute('hidden');
    compField = comp.battlefield.firstElementChild;
    console.log(human.matrix);
    console.log(human.aliveShips);
    firstMove();
}

function compShot() { // выстрелы ИИ
    // compField.removeEventListener('click', myShot);
    let randX = Math.floor(Math.random() * 10);
    let randY = Math.floor(Math.random() * 10);
    while (human.matrix[randY][randX] == 2 || human.matrix[randY][randX] == 3) {
        randX = Math.floor(Math.random() * 10);
        randY = Math.floor(Math.random() * 10);
    }
    if (human.matrix[randY][randX] == 0 || human.matrix[randY][randX] == 4) {
        human.matrix[randY][randX] = 2;
        human.arrTR[randY].children[randX].classList.add('shot');
        step = 'human';
        // compField.addEventListener('click', myShot);
        playGame(step);
    }
    if (human.matrix[randY][randX] == 1) {
        human.matrix[randY][randX] = 3;
        human.arrTR[randY].children[randX].classList.add('hit');
        step = 'comp';
        human.aliveShips--;
        console.log(human.aliveShips);
        if (human.aliveShips == 0) {
            alert('Вы проиграли!');
            interruptGame();
            return;
        }
        // compField.addEventListener('click', myShot);
        playGame(step);
    }
}

function myShot(event) { // мои выстрелы
    let target = event.target;
    let x = target.cellIndex;
    let y = target.parentNode.rowIndex;

    if (target.tagName != 'TD') return;

    if (comp.matrix[y][x] == 2 || comp.matrix[y][x] == 3) return;

    if (comp.matrix[y][x] == 0 || comp.matrix[y][x] == 4) {
        alert('Промах!');
        comp.matrix[y][x] = 2;
        target.classList.add('shot');
        step = 'comp';
        playGame(step);
    }

    if (comp.matrix[y][x] == 1) {
        alert('Попадание!');
        comp.matrix[y][x] = 3;
        target.classList.add('hit');
        step = 'human';
        comp.aliveShips--;
        if (comp.aliveShips == 0) {
            alert('Вы победили!');
            interruptGame();
        }
        playGame(step);
    }
}

function firstMove() { // определение первого хода
    let rand = Math.round(Math.random());
    if (rand < 0.5) {
        step = 'comp';
    }
    if (rand >= 0.5) {
        step = 'human';
    }
    playGame(step);
}

function playGame(step) { // игровые ходы
    compField.addEventListener('click', myShot);
    if (step == 'comp') {
        compField.removeEventListener('click', myShot);
        currentMove.innerHTML = '';
        currentMove.innerHTML = compTextStep;
        setTimeout(() => compShot(), 1500);
    }
    if (step == 'human') {
        currentMove.innerHTML = '';
        currentMove.innerHTML = humTextStep;
    }
}

function interruptGame() { // прерывание партии
    // clearField();
    // btnCancel.setAttribute('hidden', true);
    location.reload();
}

function shipSelection(event) { // размещение корабля на поле боя
    let ship = event.target;
    let firstDeck;
    let alignFirst;
    let lastDeck;
    let coordElem;
    let decks;
    let position;

    if (!ship.classList.contains('ship')) return;

    decks = (ship.classList.contains('fourdeck')) ? 4 : (ship.classList.contains('tripledeck')) ? 3 : (ship.classList.contains('doubledeck')) ? 2 : 1;

    ship.onmousedown = function (event) {
        if (event.which == 3 && ship.parentNode.tagName == 'LI') {
            ship.classList.toggle('vertical');
        }
        if (event.which == 1) {
            ship.style.position = 'absolute';
            ship.style.zIndex = 100;
            document.body.append(ship);
            moveAt(event.pageX, event.pageY);
            function moveAt(pageX, pageY) {
                ship.style.left = pageX - 10 + 'px';
                ship.style.top = pageY - 10 + 'px';
            }
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }
            document.addEventListener('mousemove', onMouseMove);
            position = (ship.classList.contains('vertical')) ? 'vertical' : 'horizontal';
            ship.onmouseup = function (event) {
                ship.hidden = true;
                firstDeck = document.elementFromPoint(event.clientX, event.clientY);
                ship.hidden = false;
                if (firstDeck.tagName == 'TD') {
                    alignFirst = firstDeck.getBoundingClientRect();
                    ship.style.left = alignFirst.left + pageXOffset + 'px';
                    ship.style.top = alignFirst.top + pageYOffset + 'px';
                    coordElem = ship.getBoundingClientRect();
                    ship.hidden = true;
                    lastDeck = document.elementFromPoint(coordElem.right - 10, coordElem.bottom - 10);
                    ship.hidden = false;
                    if (lastDeck.tagName == 'TD' && lastDeck != null) {
                        putShip(ship, decks);
                        if (li1.children.length == 0 && li2.children.length == 0) {
                            btnReady.removeAttribute('hidden');
                        }
                    }
                    else {
                        shipsReturn(ship, decks);
                    }
                }
                else {
                    shipsReturn(ship, decks);
                }
                document.removeEventListener('mousemove', onMouseMove);
                ship.onmouseup = null;
            }
        }
    }
}

function putShip(ship, decks) { // проверка валидности местоположения и установка корабля
    let coordElem = ship.getBoundingClientRect();
    let top = coordElem.top - 30;
    let bot = coordElem.bottom + 30;
    let right = coordElem.right + 30;
    let left = coordElem.left - 30;
    let check;
    for (let i = left; i < right; i += 30) {
        ship.hidden = true;
        check = document.elementFromPoint(i, top);
        ship.hidden = false;
        if (check.classList.contains('ship')) {
            shipsReturn(ship, decks);
        }
    }
    for (let i = left; i < right; i += 30) {
        ship.hidden = true;
        check = document.elementFromPoint(i, bot);
        ship.hidden = false;
        if (check.classList.contains('ship')) {
            shipsReturn(ship, decks);
        }
    }
    for (let i = top; i < bot; i += 30) {
        ship.hidden = true;
        check = document.elementFromPoint(left, i);
        ship.hidden = false;
        if (check.classList.contains('ship')) {
            shipsReturn(ship, decks);
        }
    }
    for (let i = top; i < bot; i += 30) {
        ship.hidden = true;
        check = document.elementFromPoint(right, i);
        ship.hidden = false;
        if (check.classList.contains('ship')) {
            shipsReturn(ship, decks);
        }
    }
}

function shipsReturn(ship, decks) { // возврат корабля в исходное положение
    if (decks == 3 || decks == 4) manualPlaceContainer.firstElementChild.children[0].prepend(ship);
    if (decks == 2 || decks == 1) manualPlaceContainer.firstElementChild.children[1].prepend(ship);
    if (ship.classList.contains('vertical')) ship.classList.remove('vertical');
    ship.style.position = '';
    ship.style.zIndex = '';
}

function createManualMatrix() { // завершение ручной отрисовки
    for (let ship of allShips) {
        let firstDeck;
        let position;
        let decks;
        let coord = ship.getBoundingClientRect();
        ship.hidden = true;
        firstDeck = document.elementFromPoint(coord.left + 5, coord.top + 5);
        ship.hidden = false;
        position = (ship.classList.contains('vertical')) ? 'vertical' : 'horizontal';
        let y = firstDeck.parentNode.rowIndex;
        let x = firstDeck.cellIndex;
        if (ship.classList.contains('fourdeck')) {
            decks = 4;
            enterValueIntoMatrix(y, x, 4, position);
        }
        if (ship.classList.contains('tripledeck')) {
            decks = 3;
            enterValueIntoMatrix(y, x, 3, position);
        }
        if (ship.classList.contains('doubledeck')) {
            decks = 2;
            enterValueIntoMatrix(y, x, 2, position);
        }
        if (ship.classList.contains('singledeck')) {
            decks = 1;
            enterValueIntoMatrix(y, x, 1, position);
        }

        shipsReturn(ship, decks);
    }

    btnClearField.setAttribute('hidden', true);
    btnReady.setAttribute('hidden', true);
    btnPlay.removeAttribute('hidden');
    manualPlaceContainer.classList.add('hide');
    comp.battlefield.classList.remove('hide');
    comp.createRandomSquad();
    human.matrix = matrixManual;
    human.aliveShips = aliveManual;
    console.log(human.alive);
}

function enterValueIntoMatrix(y, x, decks, pos) { // заполнение матрицы боя палубами и мертвыми зонами
    let table = document.getElementsByClassName(`humanField`)[0];
    let tableRows = table.getElementsByTagName('tr');
    let tableCells = table.getElementsByTagName('td');
    let alive = 0;
    if (pos == 'vertical') {
        let xCoord, yCoord, maxCoord, rightMark, leftMark, topMark, botMark;
        xCoord = x;
        yCoord = y;
        rightMark = xCoord + 1;
        leftMark = xCoord - 1;
        for (let i = 0; i < decks; ++i) {
            maxCoord = yCoord + i;
            tableRows[maxCoord].children[xCoord].classList.add('shipsdeck');
            matrixManual[maxCoord][xCoord] = 1;
            alive++;
            if (0 <= rightMark && rightMark <= 9) {
                tableRows[maxCoord].children[rightMark].classList.add('deathzone');
                matrixManual[maxCoord][rightMark] = 4;
            }
            if (0 <= leftMark && leftMark <= 9) {
                tableRows[maxCoord].children[leftMark].classList.add('deathzone');
                matrixManual[maxCoord][leftMark] = 4;
            }
        }
        topMark = yCoord - 1;
        botMark = maxCoord + 1;
        if (0 <= topMark && topMark <= 9) {
            tableRows[topMark].children[xCoord].classList.add('deathzone');
            matrixManual[topMark][xCoord] = 4;
            if (0 <= rightMark && rightMark <= 9) {
                tableRows[topMark].children[rightMark].classList.add('deathzone');
                matrixManual[topMark][rightMark] = 4;
            }
            if (0 <= leftMark && leftMark <= 9) {
                tableRows[topMark].children[leftMark].classList.add('deathzone');
                matrixManual[topMark][leftMark] = 4;
            }
        }
        if (botMark <= 9) {
            tableRows[botMark].children[xCoord].classList.add('deathzone');
            matrixManual[botMark][xCoord] = 4;
            if (0 <= rightMark && rightMark <= 9) {
                tableRows[botMark].children[rightMark].classList.add('deathzone');
                matrixManual[botMark][rightMark] = 4;
            }
            if (0 <= leftMark && leftMark <= 9) {
                tableRows[botMark].children[leftMark].classList.add('deathzone');
                matrixManual[botMark][leftMark] = 4;
            }
        }
    }
    else {
        let xCoord, yCoord, maxCoord, rightMark, leftMark, topMark, botMark;
        xCoord = x;
        yCoord = y;
        topMark = yCoord - 1;
        botMark = yCoord + 1;
        for (let i = 0; i < decks; ++i) {
            maxCoord = xCoord + i;
            tableRows[yCoord].children[maxCoord].classList.add('shipsdeck');
            matrixManual[yCoord][maxCoord] = 1;
            alive++;
            if (0 <= topMark && topMark <= 9) {
                tableRows[topMark].children[maxCoord].classList.add('deathzone');
                matrixManual[topMark][maxCoord] = 4;
            }
            if (0 <= botMark && botMark <= 9) {
                tableRows[botMark].children[maxCoord].classList.add('deathzone');
                matrixManual[botMark][maxCoord] = 4;
            }
        }
        rightMark = maxCoord + 1;
        leftMark = xCoord - 1;
        if (0 <= rightMark && rightMark <= 9) {
            tableRows[yCoord].children[rightMark].classList.add('deathzone');
            matrixManual[yCoord][rightMark] = 4;
            if (0 <= topMark && topMark <= 9) {
                tableRows[topMark].children[rightMark].classList.add('deathzone');
                matrixManual[topMark][rightMark] = 4;
            }
            if (0 <= botMark && botMark <= 9) {
                tableRows[botMark].children[rightMark].classList.add('deathzone');
                matrixManual[botMark][rightMark] = 4;
            }
        }
        if (0 <= leftMark && leftMark <= 9) {
            tableRows[yCoord].children[leftMark].classList.add('deathzone');
            matrixManual[yCoord][leftMark] = 4;
            if (0 <= topMark && topMark <= 9) {
                tableRows[topMark].children[leftMark].classList.add('deathzone');
                matrixManual[topMark][leftMark] = 4;
            }
            if (0 <= botMark && botMark <= 9) {
                tableRows[botMark].children[leftMark].classList.add('deathzone');
                matrixManual[botMark][leftMark] = 4;
            }
        }
    }
    aliveManual += alive;
}

document.oncontextmenu = function (event) { // отключение дефолтного события на пкм
    event.preventDefault();
}