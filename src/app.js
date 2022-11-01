let solution;
let difficulty;
let seconds;
let minutes;
let selectedCell;

document.onload = function(){
    document.getElementById('start').style.opacity = 0;
}


// WHEN BUTTON 'START' GETS CLICKED ----------------------------------------
document.getElementById('start').addEventListener('click', (event) => {
    // display correct view
    document.getElementById('after-start').style.display = 'block';
    document.getElementById('before-start').style.display = 'none';

    // reset timer
    document.getElementById('timer-container').textContent = '0:00';

    seconds = 0;
    minutes = 0;

    // generate new solution
    difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    solution = generateSudoku();

    // rewrite selected difficulty
    document.getElementById('selected').textContent = difficulty;

    buildBoard();
    startTimer();

    document.addEventListener('keydown', (event) => {
        if (selectedCell != undefined) {
            if (event.key >= 1 && event.key <= 9) {
                selectedCell.textContent = event.key;
            } else if (event.key == 'Backspace') {
                selectedCell.textContent = '';
            }
        }
    })

    let buttons = document.querySelectorAll('#num-pad button');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', (event) => {
            if (selectedCell != undefined) {
                if (buttons[i].textContent == 'X') {
                    selectedCell.textContent = '';
                } else {
                    selectedCell.textContent = buttons[i].textContent;
                }
            }
        });
    }
});

// WHEN BUTTON 'SUBMIT' GETS CLICKED -----------------------------------------
document.getElementById('submit').addEventListener('click', (event) => {
    let answer = collectData();

    console.log(JSON.stringify(answer));
    console.log(JSON.stringify(solution));

    if (JSON.stringify(answer) === JSON.stringify(solution)) {
        alert('correct answer!');
    } else {
        alert('incorrect answer!');
    }
});

function collectData() {
    let answer = [];

    let rows = document.getElementById('board').children;
    for (let i = 0; i < 9; i++) {
        let row = rows.item(i);

        let arr = [];

        for (let j = 0; j < 9; j++) {
            let cell = Number(row.children.item(j).textContent);

            arr.push(cell);
        }

        answer.push(arr);
    }

    return answer;
}


// FUNCTION FOR STARTING AND UPDATING TIMER ----------------------------------
function startTimer() {
    setInterval(update, 1000);

    function update() {
        seconds++;

        if (seconds > 59) {
            seconds = 0;
            minutes++;
        }

        seconds = seconds < 10 ? '0' + seconds : seconds;
        document.getElementById('timer-container').textContent = `${minutes}:${seconds}`;
    }
}

// BUILDING BOARD -----------------------------------------------------------
function buildBoard() {
    let table = document.createElement('table');
    table.setAttribute('id', 'board');
    
    // add 10 rows to table
    for (let i = 1; i < 10; i++) {
        let currRow = document.createElement('tr');

        // add 10 columns to row
        for (let j = 1; j < 10; j++) {
            let currCol = document.createElement('td');
            currCol.setAttribute('id', `${i}.${j}`);

            currRow.appendChild(currCol);
        }

        table.appendChild(currRow);
    }

    document.getElementById('board-container').appendChild(table);

    fillBoard();
}

// FILLING BOARD ------------------------------------------------------------
function fillBoard() {
    let rows = document.getElementById('board').children;

    const removedCellIDs = new Set();

    if (difficulty == 'Easy') {
        // remove 20 (random) cells from the solution
        while (removedCellIDs.size != 20) {
            let row = getRandomInt(9);
            let col = getRandomInt(9);

            if (!removedCellIDs.has(`${row}.${col}`)) {
                removedCellIDs.add(`${row}.${col}`);
            }

        }
    } else if (difficulty == 'Medium') {
        // remove 29 (random) cells from the solution
        while (removedCellIDs.size != 29) {
            let row = getRandomInt(9);
            let col = getRandomInt(9);

            if (!removedCellIDs.has(`${row}.${col}`)) {
                removedCellIDs.add(`${row}.${col}`);
            }
        }
    } else if (difficulty == 'Hard') {
        // remove 28 (random) cells from the solution
        while (removedCellIDs.size != 38) {
            let row = getRandomInt(9);
            let col = getRandomInt(9);

            if (!removedCellIDs.has(`${row}.${col}`)) {
                removedCellIDs.add(`${row}.${col}`);
            }
        }
    } else if (difficulty == 'VeryHard') {
        // remove 47 (random) cells from the solution
        while (removedCellIDs.size != 47) {
            let row = getRandomInt(9);
            let col = getRandomInt(9);

            if (!removedCellIDs.has(`${row}.${col}`)) {
                removedCellIDs.add(`${row}.${col}`);
            }
        }
    } else if (difficulty == 'Insane') {
        // remove 58 (random) cells from the solution
        while (removedCellIDs.size != 58) {
            let row = getRandomInt(9);
            let col = getRandomInt(9);

            if (!removedCellIDs.has(`${row}.${col}`)) {
                removedCellIDs.add(`${row}.${col}`);
            }
        }
    }

    for (let row = 0; row < 9; row++) {
        let currRow = rows.item(row);

        let cells = currRow.children;
        for (let col = 0; col < 9; col++) {
            let currCell = cells.item(col);

            if (removedCellIDs.has(currCell.getAttribute('id'))) {
                currCell.innerHTML = '';
                currCell.addEventListener('click', selectCell)
            } else {
                currCell.innerHTML = `<b>${solution[row][col]}</b>`;
            }
        }
    }
}

function selectCell() {
    if (selectedCell != this) {
        if (selectedCell != null) {
            selectedCell.classList.remove('selectedCell');
        }
        selectedCell = this;
    }

    selectedCell.classList.add('selectedCell');
}

function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
}

// GENERATE SUDOKU SOLUTION ----------------------------------------------------------
function generateSudoku() {
    function shiftByThree(row) {
        let newRow = [...row];
    
        newRow.push(newRow.shift());
        newRow.push(newRow.shift());
        newRow.push(newRow.shift());
    
        return newRow;
    }

    firstRow = [];
    secondRow = [];
    thirdRow = [];
    fourthRow = [];
    fifthRow = [];
    sixthRow = [];
    seventhRow = [];
    eighthRow = [];
    ninthRow = [];

    // fill row 1 with random numbers
    while (firstRow.length != 9) {
        let rand = getRandomInt(9);

        if (firstRow.indexOf(rand) == -1) {
            firstRow.push(rand)
        }
    }

    // fill row 2
    secondRow = shiftByThree(firstRow);

    // fill row 3
    thirdRow = shiftByThree(secondRow);

    // fill row 4
    fourthRow = [...thirdRow];
    fourthRow.push(fourthRow.shift())

    // fill row 5
    fifthRow = shiftByThree(fourthRow);

    // fill row 6
    sixthRow = shiftByThree(fifthRow);

    // fill row 7
    seventhRow = [...sixthRow];
    seventhRow.push(seventhRow.shift())

    // fill row 8
    eighthRow = shiftByThree(seventhRow);

    // fill row 9
    ninthRow = shiftByThree(eighthRow);

    return [
        firstRow,
        secondRow,
        thirdRow,
        fourthRow,
        fifthRow,
        sixthRow,
        seventhRow,
        eighthRow,
        ninthRow
    ];
}