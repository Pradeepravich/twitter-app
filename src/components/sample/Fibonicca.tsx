import React, { useEffect, useState } from 'react'

const Fibonicca = () => {

  const [data, setData] = useState({
    a: 0,
    b: 1,
  })

  const {a,b} = data;

  useEffect(() => {

    for(let i = 0; i < 5; i++) {
        
    }

  }, [a, b])
  
  

  return data;
}

export default Fibonicca