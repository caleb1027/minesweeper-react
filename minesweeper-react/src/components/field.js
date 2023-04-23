import Tile from './tile';

const Field = props => {
    let [field, setField] = useState(createField());

    let createField = () => {
        let field = new Array(props.height);
        for(let i = 0; i < props.width; i++) {
            field[i] = new Array(props.width);
            for(let j = 0; j < props.width; j++) {
                field[i][j] = -7;
            }
        }

        let mines = 0;
        while(mines < props.mines) {
            let x = Math.floor(Math.random() * props.width);
            let y = Math.floor(Math.random() * props.height);
            if(field[x][y] == -7) {
                field[x][y] = -1;
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
                                if(field[i + k][j + l] == -1) {
                                    count++;
                                }
                            }  
                        }
                    }
                    field[i][j] = count;
                }
            }
        }
        return field;
    }

    return (
        <div className="gameBoard">
            <div className="field">
                {field.map((row, i) => {
                    <Tile value={row[i]} />
                })}
            </div>
        </div>
    )


}