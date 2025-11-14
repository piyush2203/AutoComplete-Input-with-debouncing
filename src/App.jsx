import React, { useEffect, useState } from 'react'
// import { createLogger } from 'vite';

const App = () => {
  const [input, setinput] = useState(""); 
  const [result, setResult] = useState([]);
  const [showResult , setshowResult] = useState(false);
  const [cacheResults , setcacheResults] = useState({});

  const fetchData = async()=>{
    if(cacheResults[input]){
      setResult(cacheResults[input]);
      console.log("cached result");
      console.log(result);
      return;
    }

    console.log(input);
    const respose = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const jsonresponse  = await respose.json();
    setResult(jsonresponse?.recipes);
    setcacheResults((prev)=>( {...prev, [input]: jsonresponse?.recipes}))
    console.log(cacheResults);
  }


  useEffect(() => {
    const timer  = setTimeout(() => {
      fetchData();
    }, 300);


    return ()=>{clearTimeout(timer)}
  }, [input])
  

  return (
    <div className='flex flex-col items-center pt-20 w-screen '>
      <h1 className='text-2xl font-bold'>Autocomplete Search bar</h1>
      <input className='border-2 rounded p-2 w-[40vw] ' type="text" value={input} onBlur={()=>setshowResult(false)} onFocus={()=>setshowResult(true)} onChange={(e)=>{setinput(e.target.value)}}/>

      {showResult && 
        <div className='result w-[40vw]  max-h-[300px] border p-3 overflow-auto '>
        {result.map((data,id)=>{
          return <div className='m-2 hover:bg-amber-200  ' key={id}>{data.name}</div>
        })}
      </div>
      }
    </div>
  )
}

export default App
