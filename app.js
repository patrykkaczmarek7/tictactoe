// Krzyżyk
const player1 = 'fa-times';
// Kółko
const player2 = 'fa-circle-o';
let round = 1;

const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const combinations = [
[0,1,2], [3,4,5], [6,7,8],
[0,3,6], [1,4,7], [2,5,8],
[0,4,8], [2,4,6]

];

// Nadanie wartości boxom
const boxes = [...document.querySelectorAll('.box')];
// Nadanie boxom zdarzenia 'click'
boxes.forEach(box => box.addEventListener('click', pick));

function pick (event) {
    //#1  Nie zmienia się po ponownym kliknięciu pierwsza podana wartość
    const { row, column } = event.target.dataset;
    // ruch = sprawdzenie czy parzysta runda, jesli tak, to gracz 2, jesli nie, to gracz 1
    const turn = round % 2 !== 0 ? player2 : player1;
    // Zatrzymanie działania funkcji, jeśli nie jest pustym polem
    if (board[row][column] !== '' ) {
        return;
    }
    //Dodawanie rundy
    event.target.classList.add(turn);
    //#1  Nie zmienia się po ponownym kliknięciu pierwsza podana wartość
    board [row][column] = turn;
    round++;

    console.log(check());
}

function check() {
    const result = board.reduce((total, row) => total.concat(row));
    let winner = null;
    let moves = {
        'fa-times': [],
        'fa-circle-o': []
    };

    // dla każdego (pola, znacznik) => 
    // jeśli moves[field] istneje pushuj index, w przeicwnym razie 
    // nic się nie dzieje
    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);
    combinations.forEach(combination => {
        if (combination.every(index => moves[player1].indexOf(index) > -1)) {
            winner = 'Winner: Player 1';
        }
        if (combination.every(index => moves[player2].indexOf(index) > -1)) {
            winner = 'Winner: Player 2';
        }
        
    });

    return winner;
}


// dodać blokowanie planszy, jeśli wygra ziomek


//document.write(round);



// Dokładnie to samo, tylko inaczej zapisane
//function pick (event) {
    //if (turn = round % 2 !== 0) {
        //turn = player1;
    //} 
    //else {
        //turn = player2;
    //}
    //event.target.classList.add(turn);
    //round++;
//}