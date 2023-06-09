import {useEffect, useState} from 'react';
import Tile from './tile';
import Timer from './timer';
import './styles/sprite.css'

const Field = props => {

    let handleMiddle = (x, y) => {
        if(gameState < 0 || gameOver) {
            return;
        }
        if(adjacencyMatrix[x][y] === field[x][y].value) {
            for(let i = -1; i <= 1; i++) {
                for(let j = -1; j <= 1; j++) {
                    if(x + i >= 0 && x + i < props.height && y + j >= 0 && y + j < props.width) {
                        handleReveal(x + i, y + j);
                    }
                }
            }
        }
    }

    let updateAdjacencyMatrix = () => {
        let matrix = new Array(props.height);
        for(let i = 0; i < props.height; i++) {
            matrix[i] = new Array(props.width);
            for(let j = 0; j < props.width; j++) {
                matrix[i][j] = 0;
                for(let k = -1; k <= 1; k++) {
                    for(let l = -1; l <= 1; l++) {
                        if(i + k >= 0 && i + k < props.height && j + l >= 0 && j + l < props.width) {
                            if(field[i + k][j + l].flagged) {
                                matrix[i][j]++;
                            }
                        }
                    }
                }
            }
        }
        setAdjacencyMatrix(matrix);
    }

    let checkWin = () => {
        for(let i = 0; i < props.width; i++) {
            for(let j = 0; j < props.height; j++) {
                if(field[i][j].isMine) {
                    if(field[i][j].revealed) {
                        return;
                    }
                } else {
                    if(!field[i][j].revealed) {
                        return;
                    }
                }
            }
        }
        setMinesRemaining('W')
        setGameState(1);
        setGameOver(true);
    }

    let handleFlag = (x, y) => {
        if(gameState < 0 || gameOver) {
            return;
        }
        if(field[x][y].flagged) {
            field[x][y].flagged = false;
            setMinesRemaining(minesRemaining + 1);
        } else if(!field[x][y].revealed) {
            field[x][y].flagged = true;
            setMinesRemaining(minesRemaining - 1);
        }
        updateAdjacencyMatrix();
        checkWin();
    }

    let handleReveal = (x, y, s) => {
        if(s) {
            if(!gameStarted) {
                updateField(x, y);
                setGameStarted(true);
            }
        }
        if(gameState < 0 || gameOver) {
            return;
        }
        var fieldCopy = [...field];
        if(!field[x][y].flagged && !field[x][y].revealed) {
            fieldCopy[x][y].revealed = true;
            setField(fieldCopy);
            if(field[x][y].value === 0) {
                for(let i = -1; i <= 1; i++) {
                    for(let j = -1; j <= 1; j++) {
                        if(x + i >= 0 && x + i < props.height && y + j >= 0 && y + j < props.width) {
                            handleReveal(x + i, y + j, false);
                        }
                    }
                }
            }
            if(field[x][y].isMine) {
                youLose();
                return;
            }
        }
        checkWin();
    }

    let changeCounter = () => {
        if(gameState === 0 && gameStarted) {
            setCounter(counter + 1);
        } else {
            setCounter(0);
        }
    }

    let youLose = () => {
        setGameState(-1);
        setGameOver(true);
        for(let i = 0; i < props.height; i++) {
            for(let j = 0; j < props.width; j++) {
                if(field[i][j].isMine) {
                    field[i][j].revealed = true;
                }
            }
        }
    }

    let createField = () => {
        let field = new Array(props.height);
        for(let i = 0; i < props.height; i++) {
            field[i] = new Array(props.width);
            for(let j = 0; j < props.width; j++) {
                field[i][j] = {
                    x: i,
                    y: j,
                    value: -7,
                    flagged: false,
                    isMine: false,
                    revealed: false,
                };
            }
        }
        return field;
    }

    let updateField = (x, y) => {
        if(gameStarted) {
            return;
        }
        let fieldCopy = [...field];
        // Set mines
        for(let i = -1; i <= 1 ; i++) {
            for(let j = -1; j <= 1; j++) {
                if(x + i >= 0 && x + i < props.height && y + j >= 0 && y + j < props.width) {
                    fieldCopy[x + i][y + j].value = 0;
                }
            }
        }
        let mines = 0;
        while(mines < props.mines) {
            let x = Math.floor(Math.random() * props.height);
            let y = Math.floor(Math.random() * props.width);
            if(fieldCopy[x][y].value === -7) {
                fieldCopy[x][y].value = -1;
                fieldCopy[x][y].isMine = true;
                mines++;
            }
        }

        // Count adjacent mines
        for(let i = 0; i < props.height; i++) {
            for(let j = 0; j < props.width; j++) {
                var count = 0;
                if(fieldCopy[i][j].value !== -1) {
                    count = 0;
                    for(let k = -1; k <= 1; k++) {
                        for(let l = -1; l <= 1; l++) {
                            if(i + k >= 0 && i + k < props.height && j + l >= 0 && j + l < props.width) {
                                if(fieldCopy[i + k][j + l].value === -1) {
                                    count++;
                                }
                            }  
                        }
                    }
                    fieldCopy[i][j].value = count;
                }
            }
        }
        setField(fieldCopy);
        return;
    }

    let restartGame = () => {
        setField(createField());
        setMinesRemaining(props.mines);
        setGameOver(false);
        setGameStarted(false);
        setGameState(0);
        setCounter(0);
    }


    let [field, setField] = useState(createField());
    let [adjacencyMatrix, setAdjacencyMatrix] = useState();
    let [gameStarted, setGameStarted] = useState(false);
    let [gameOver, setGameOver]  = useState(false);
    let [gameState, setGameState] = useState(0);
    let [counter, setCounter] = useState(0);
    let [minesRemaining, setMinesRemaining] = useState(props.mines);

    useEffect(() => {
        if(!gameStarted) {
            setCounter(0);
        }
    }, [counter, gameStarted]);


    return (
        <div className="gameBoard flex flex-col align-center items-center justify-center h-screen">
            <div className='flex justify-evenly'>
                <MineCounter mines={minesRemaining}/>
                <Sprite state={gameState} restart={restartGame}/>
                <Timer gameState={gameState} gameStarted={gameStarted} count={counter} setCounter={changeCounter}/>
            </div>
            {field.map((row, i) => (
                <div className="row flex h-10" id={i}>
                    {row.map((tile, j) => (
                        <Tile key={j} attributes={field[i][j]} handleReveal={handleReveal} handleFlag={handleFlag} middle={handleMiddle}/>
                    ))}
                </div>
            ))}
        </div>
    )
}

let MineCounter = (props) => {
    return (
        <div className="flex-col flex align-middle justify-center items-center h-12 m-1 text-white w-12 text-center text-2xl bg-slate-600">
           <h1 className=''> {props.mines} </h1>
        </div>
    )
}

let Sprite = (props) => {
    return (
        <div className={`sprite${props.state} border-black border-2 h-12 w-12 m-1 bg-neutral-600 rounded-sm active:bg-neutral-700`}
             onClick={props.restart}>
        </div>
    )
}
export default Field;