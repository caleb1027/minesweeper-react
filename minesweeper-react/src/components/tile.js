const Tile = props => {
    let [revealed, setRevealed] = useState(false);
    let [flagged, setFlagged] = useState(false);
    return (
        <div>
            <button className="tile" onClick={() => setRevealed(true)} onContextMenu={() => setFlagged(true)}>
                {revealed ? props.value : flagged ? "F" : ""}
            </button>
        </div>
    )
}

export default Tile;