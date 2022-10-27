import './App.css';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils';


let flipcnt = []
function App() {
    let refs = useRef()
    let btn = useRef()
    let img = ["hammer.png", "captain.png", "hulk.png", "panther.png", "spider.png", "stark.png", "thanos.png"]
    var interval = useRef;
    const tmp = {
        matrix: [[2, 3, 0, 5, 5, 4],[1, 1, 2, 0, 3, 1],[4, 2, 2, 0, 6, 0], [4, 6, 0, 0, 5, 5],[0, 2, 2, 4, 0, 0],[1, 6, 2, 6, 0, 2]].sort(() => Math.random() - 0.5)
        , correct: 0, interval: 0, heighest: 0
    };
    // 
    let [state, setState] = useState(tmp)
    console.log(state)
    const manager = (sign) => {
        sign = parseInt(sign)
        if (sign > 0) {
            refs.current.innerHTML = 0
            btn.current.innerHTML = "Start New Game"
            clearInterval(interval.current)
            stopper()
            setState({...state})
        }
        if (sign === 0) {
            interval.current = setInterval(() => {
                refs.current.innerHTML = parseInt(refs.current.innerHTML) + 1
            }, 1000);
            btn.current.innerHTML = "STOP"
        }
    }
    const stopper=()=>{
        alert("Game Completed")
        clearInterval(interval.current)
           if (parseInt(refs.current.innerHTML) > state.heighest)
            state = { ...tmp, heighest: parseInt(refs.current.innerHTML),correct:0 }
            else
            state = { ...tmp, heighest: parseInt(refs.current.innerHTML)}
        refs.current.innerHTML = 0
        btn.current.innerHTML = "Start New Game"
    }
    const clicked = (i, j, y, e) => {
        if(e.target.getAttribute("src")=="sdd.png")
         return ""
        if(refs.current.innerHTML==0){
            alert("press button to start")
            return ""
            }
        if (flipcnt.length == 1) {
            if ((flipcnt[0][0] == i) && (flipcnt[0][1] == j) && (flipcnt[0][2] == y)) {
                return ""
            }
        }   
        if (flipcnt.length < 2) {
            flipcnt.push([i, j, y, e.target])
            e.target.setAttribute("src", img[y])
        }
        if (flipcnt.length === 2 && flipcnt[0][2] === flipcnt[1][2]) {
            state.matrix[flipcnt[0][0]][flipcnt[0][1]] = "sdd.png"
            state.matrix[flipcnt[1][0]][flipcnt[1][1]] = "sdd.png"
            state.correct = state.correct + 1
            if (state.correct === 18) {
               stopper()
            }
            setTimeout(() => {
                flipcnt[0][3].setAttribute("src", "sdd.png")
                e.target.setAttribute("src", "sdd.png")
                flipcnt = []
                setState({ ...state })
            }, 1000)
        }else if (flipcnt.length === 2) {
            setTimeout(() => {
                flipcnt[0][3].setAttribute("src", "icons8-avengers-100.png")
                e.target.setAttribute("src", "icons8-avengers-100.png")
                flipcnt = []
                setState({ ...state })
            }, 1000)
        }
    }

    return (
        <div className="App">
            <div className="col">
                <p> <span style={{ fontSize: "18px" }}>Heigest Score:&nbsp;{state.heighest}</span></p>
                <h2 >Memory Game</h2>
                <p>Correct: <span>{state.correct}/18</span></p>
                <p>Score: <span ref={refs}>0</span></p>
                <img src="371812620_FIREWORKS_400.gif" alt="" />
                <button className="btn1" onClick={() => manager((refs.current === undefined || parseInt(refs.current.innerHTML) < 1) ? 0 : refs.current.innerHTML)} ref={btn}>New Game</button></div>
            <table>
                {state.matrix.map((x, i) => {
                    return <tr >{x.map((y, j) => <td id="animated-example" className="animated flip"><img onClick={(e) => clicked(i, j, y, e)} src="icons8-avengers-100.png" alt="Correct" /></td>)}</tr>
                })
                }
            </table>
        </div>
    );
}
export default App;
