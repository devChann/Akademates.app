import React, { useEffect, useState } from 'react'

const useDebounced = (value:string, delay? :number) => {
    const [debouncedValue, setdebouncedValue] = useState(value)

    useEffect(() => {
        const timer  = setTimeout (()=> setdebouncedValue(value), delay || 500)
        return clearTimeout(timer)
    }, [value,delay])
    
  return debouncedValue
  
}

export default useDebounced
