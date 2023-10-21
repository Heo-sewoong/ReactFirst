import React from 'react'
import { Button } from 'react-bootstrap';


const WeatherButton = ({cities, setCity}) => {
  console.log("cities?",cities)
  return (
    <div>
     
      {cities.map((item, index)=>(
        <Button className='button-style' variant="success" key={index} onClick={()=>setCity(item )}>{item}</Button>
      ))}
    </div>
  )
}

export default WeatherButton
