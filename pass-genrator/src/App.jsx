import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() { 

   const [length,setlength]=useState(8)
   const [numberIn,setnumberIN]=useState(false)
   const[charIn,setcharIN]=useState(false)
   const [Password,setPassword]=useState("")

   const passgen=useCallback(()=>{
    let pass="",str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberIn){str+="0987654321"}
    if(charIn){str+="+_)(*&^%$#@!~"}

    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random()*str.length + 1)
      pass+=str.charAt(char)
      console.log(pass)
    }
    setPassword(pass)
   },[length,numberIn,charIn,setPassword])

   const PasswordRef= useRef(null)
   const copy = useCallback(()=>{
    PasswordRef.current.select();
    window.navigator.clipboard.writeText(Password)
   },[Password])


   useEffect(()=>{
    passgen()
   },[length,numberIn,charIn,passgen])

  return (
    <>
    <div >
      <h1 className=' py-4 text-4xl text-center font-bold text-lime-400  '>Password Genrator</h1>
      <div className='flex justify-center  overflow-hidden py-10'>
        <input type="text"
        readOnly
        ref={PasswordRef}
        value={Password}
        className=' rounded-xl w-1/4 h-11 px-4 text-xl font-semibold' />
        <button onClick={copy}  className='  text-white ml-4  bg-blue-400 px-3 rounded-xl h-11 text-xl '>Copy</button>
      </div>
      <div className='flex justify-center gap-16 text-2xl font-semibold text-orange-700'>
       <div>
       <input type="range"
        min={6}
        max={20}
        value={length} 
        onChange={(e)=>{setlength(e.target.value)}}
        className=' w-52 mr-2'/>
        <label htmlFor="input">Length: {length} </label>
       </div>
       <div>
        <input type="checkbox" id='num'
        className='w-5 h-5 mr-2'
        defaultChecked={numberIn}
        onChange={ ()=>{
        setnumberIN((prev)=>!prev);}
        }/>
        <label htmlFor="num">Numbers</label>
       </div>
       <div>
        <input type="checkbox" id='char'
        className='w-5 h-5 mr-2'
        defaultChecked={charIn}
        onChange={()=>{
          setcharIN((prev)=>!prev)
        }} />
        <label htmlFor="char">Special Character</label>
       </div>
      </div>
    </div>
    </>
  )
}

export default App
