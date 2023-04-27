import {useState, useEffect} from 'react';

let Timer = (props) => {
    useEffect(() => {
        if(props.gameState === 0 && props.gameStarted) {
            setTimeout(() =>props.setCounter(props.count + 1), 1000);
        }
    }, [props.count, props.gameStarted]);

    return (
        <div className="flex-col flex align-middle justify-center items-center h-12 m-1 text-white w-12 text-center text-2xl bg-slate-600">
           <h1 className=''> {props.count} </h1>
        </div>
    )
}
export default Timer;
