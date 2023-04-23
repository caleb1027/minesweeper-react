import Field from './field.js'
function Menu() {
    let [playing, setPlaying] = useState(false);
    let [difficulty, setDifficulty] = useState(0);
    const difficulties = [
        [9,9,10],
        [16,16,40],
        [30,16, 99]
    ];

    return (
        <div className = "main">
            {playing ?
            <Field width={difficulties[difficulty][0]} height={difficulties[difficulty][1]}
                    numMines ={difficulties[difficulty][2]}/>
            :
            <div className="menu">
                <h1>Minesweeper</h1>
                {/* Drop down menu for difficulty */}
                <button className="" onclick={setPlaying(true)}>Play</button>
            </div>
            }
        </div>
    );
}

export default Menu;