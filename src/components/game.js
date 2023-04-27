import {useState} from 'react';
import Field from './field.js'
import Menu from './menu.js'

function Game() {
    let [playing, setPlaying] = useState(false);
    let [difficulty, setDifficulty] = useState(0);
    let [passedValues, setPassedValues] = useState([9, 9, 10]);
    const difficulties = [
        [9,9,10],
        [16,16,40],
        [16,30,99]];

    const startGame = () => {
        setPassedValues(difficulties[difficulty]);
        setPlaying(true);
    }

    const changeDifficulty = (e) => {
        setDifficulty(e.target.value);
    }
    
    return (
        <div id="main">
            {playing ?
            <Field height={passedValues[0]} width={passedValues[1]} mines={passedValues[2]} /> 
            : 
            <Menu changeDifficulty={changeDifficulty} startGame={startGame}/>
            }
        </div>
    );
}
export default Game;