import './tiles.css';
import { useEffect } from 'react';
const Tile = props => {

    useEffect(() => {
        // define a custom handler function
        // for the contextmenu event
        const handleContextMenu = (e) => {
          // prevent the right-click menu from appearing
          e.preventDefault()
        }
    
        // attach the event listener to 
        // the document object
        document.addEventListener("contextmenu", handleContextMenu)
    
        // clean up the event listener when 
        // the component unmounts
        return () => {
          document.removeEventListener("contextmenu", handleContextMenu)
        }
      }, [])

      const mouseDownHandler = ( event ) => {
        if( event.button === 1 ) {
          props.middle(props.attributes.x, props.attributes.y);
        }
      }
    return (
        <div className=
                    {`${props.attributes.revealed ? "open" + props.attributes.value +" bg-slate-400" : "bg-slate-200 active:bg-slate-500 hover:bg-slate-300"}
                    border-2 border-black w-10 h-10 text-center text-3xl font-bold flex justify-center items-center tile
                    ${props.attributes.flagged ? "flagged" : ""}`}
                    onClick={() => { props.handleReveal(props.attributes.x, props.attributes.y, true) }} 
                    onContextMenu={() => { props.handleFlag(props.attributes.x, props.attributes.y) }}
                    onMouseDown={mouseDownHandler}>
                        {props.attributes.revealed ? props.attributes.value : ""}
        </div>
    )
}

export default Tile;