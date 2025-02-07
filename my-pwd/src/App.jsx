import { useState,useCallback, useEffect,useRef, use} from 'react'

import './App.css'

function App() {
  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword]= useState("")
   // ref for password to copy
   const passwordRef = useRef(null)

  const passwordGen = useCallback(()=>{
    let pass ="";
    let str ="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+|<>{}[];:?/"
    
    for(let i=1; i<=length;i++){
      let char =Math.floor(Math.random() * str.length +1)
      pass +=str.charAt(char)
    }
    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(1,5)
    window.navigator.clipboard.writeText(password)
  },[password])


 
  useEffect(()=>{
    passwordGen()
  },[length,numberAllowed,charAllowed,passwordGen])

  return (
    <div style={{color:"white"}}>
    <h3 style={{color:"white"}}>Password Generator</h3>
    <div >
     <input
     type="text"
     value={password}
     placeholder='password'
     readOnly
     ref={passwordRef}
     ></input>
     <button onClick={copyPasswordToClipboard}>Copy</button>
    </div>
    <div>
      <div>
        <input 
        type="range" 
        min={6}
        max={100}
        value={length}
        onChange={(e)=>{setLength(e.target.value)}}/>
        <label>Length :{length}</label>

        <input
        type="checkbox"
        id='numberInput'
        defaultChecked={numberAllowed}
        onChange={()=>{setNumberAllowed((prev)=>!prev);
        }}
        />
        <label htmlFor="numberInput">Numbers</label>

        <input
        type="checkbox"
        id='characterInput'
        defaultChecked={charAllowed}
        onChange={()=>{setCharAllowed((prev)=>!prev);
        }}
        />
        <label htmlFor="charInput">Characters</label>
        
      </div>
      
    </div>
    
    </div>
  )
}

export default App
