import React, {useState, useEffect} from 'react'; 
///delete all the text if a user stops typing
export default function TextBox(){
    const [text, setText] = useState(""); 
    const [time, setTime] = useState(10); 
    const [isActive, setIsActive] = useState(false); 
    let timer; 

    function handleType(){
        window.clearTimeout(timer); 
        reset(); 
    }

    function reset(){
        setTime(10); 
        setIsActive(false); 
    }

    useEffect(() => {
        let interval = null; 
        if(isActive){
            interval = setInterval(() => {
                setTime(time => time - 1);
            }, 1000); 
        } else if(!isActive && time !== 10){
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isActive, time]); 

    function handleKeyUp(e){
        window.clearTimeout(timer); 
        setIsActive(true); 
        timer = window.setTimeout(() => {
            setText(""); 
        }, 10000)
    }
  
  
    return(
        <div className="text-area">
           <h1>Keep Typing</h1>
           <h2>if you stop typing, all your work will be deleted</h2>
            <progress value={time} max ="10"/>
            <textarea type="textbox" onKeyPress={handleType} onKeyUp={handleKeyUp} onChange={e => setText(e.target.value)} value={text}>
            </textarea>
        </div>
    )
}