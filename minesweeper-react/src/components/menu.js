import redflag from './images/red-flag.png'

const Menu = props => {
    return (
        <div className="menu h-screen flex-col items-center flex justify-center align-center">
            <h1 className="text-5xl font-bold m-4 text-center font-mono">Minesweeper</h1>
            <img alt="" className="w-32 m-4" src={redflag}></img>
            <h2 className="text-center text-2xl font-mono">Select Difficulty</h2>
            <select className="w-64 text-center rounded-md h-10 m-2" id="dSelector"
                    onChange={props.changeDifficulty}>
                <option value="0">Beginner</option>
                <option value="1">Intermediate</option>
                <option value="2">Hard</option>
            </select>
            <button onClick={props.startGame}
                    className="text-white w-48 h-10 m-4 text-lg font-bold bg-gray-500 rounded-md hover:bg-gray-600 active:bg-gray-700">Play</button>
        </div>
    )
}

export default Menu;