const Tile = props => {
    return (
        <div>
            <button className="tile" onClick={props.reveal(props.x, props.y)} onContextMenu={() => setFlagged(true)}>
                {props.revealed ? props.value : props.flagged ? "F" : ""}
            </button>
        </div>
    )
}

export default Tile;