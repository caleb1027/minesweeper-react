import Tile from './tile';


const Field = props => {
    let [field, setField] = useState(createField());
    let [adjacencyMatrix, setAdjacencyMatrix] = useState();
    let [gameState, setGameState] = useState(0);

    let handleMiddle = (x, y) => {
        if(gameState < 0) {
            return;
        }
        if(adjacencyMatrix[x][y] == field[x][y]) {
            for(let i = -1; i <= 1; i++) {
                for(let j = -1; j <= 1; j++) {
                    if(x + i >= 0 && x + i < props.height && y + j >= 0 && y + j < props.width) {
                        field[x+i][y+j].revealed = true;
                        if(field[x+i][y+j].isMine) {
                            youLose();
                            return;
                        }
                    }
                }
            }
        }
    }

    let handleFlag = (x, y) => {
        if(gameState < 0) {
            return;
        }
        if(field[x][y].flagged) {
            field[x][y].flagged = false;
        } else if(!field[x][y].revealed) {
            field[x][y].flagged = true;
        }
    }

    let handleReveal = (x, y) => {
        if(gameState < 0) {
            return;
        }
        if(!field[x][y].flagged && !field[x][y].revealed) {
            field[x][y].revealed = true;
            if(field[x][y].isMine) {
                youLose();
                return;
            }
        }
    }

    let youLose = () => {
        setGameState(-1);
        // do something to illustrate game is over, ie. popup
    }

    // Fix field so that it holds objects instead of int values
    let createField = () => {
        let field = new Array(props.height);
        for(let i = 0; i < props.width; i++) {
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

        let mines = 0;
        while(mines < props.mines) {
            let x = Math.floor(Math.random() * props.width);
            let y = Math.floor(Math.random() * props.height);
            if(field[x][y] == -7) {
                field[x][y].value = -1;
                field[x][y].isMine = true;
                mines++;
            }
        }

        for(let i = 0; i < props.height; i++) {
            for(let j = 0; j < props.width; j++) {
                let count = 0;
                if(field[i][j] != -1) {
                    let count = 0;
                    for(let k = -1; k <= 1; k++) {
                        for(let l = -1; l <= 1; l++) {
                            if(i + k >= 0 && i + k < props.height && j + l >= 0 && j + l < props.width) {
                                if(field[i + k][j + l].value == -1) {
                                    count++;
                                }
                            }  
                        }
                    }
                    field[i][j].value = count;
                }
            }
        }
        return field;
    }

    return (
        <div className="gameBoard">
            <div className="field">
                {field.map((row, i) => {
                    <Tile attributes={row[i]} />
                })}
            </div>
        </div>
    )
}

export default Field;