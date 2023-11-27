import React, { useState } from 'react'
import axios from 'axios'
import './index.css';

export default function Weather() {
    const [Location, setLocation] = useState("");
    const [Result, setResult] = useState({});
    const API_KEY = 'fb721568798bbdbd253ecc6c2ea122d8';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${Location}&appid=${API_KEY}`;

    const searchWether = async (e) =>{
        if(e.key === 'Enter'){
            try {
                const data = await axios({
                    method: 'get',
                    url: url
                });
                setResult(data);
            } catch (error) {
                alert(error);
            }
        }
    }
    return (
        <div className='Container'>
              <input 
              placeholder='도시를 입력하세요.'
              value={Location} 
              onChange={e=>setLocation(e.target.value)} 
              onKeyDown={searchWether}/>

              {Object.keys(Result).length !== 0 &&
                <div className='second-Container'>
                    <p className='City'>{Result.data.name}</p>
                    <p className='Temperature'>{Math.round(((Result.data.main.temp - 273.15) * 10)) / 10}°C</p>
                    <p className='Sky'>{Result.data.weather[0].main}</p>
              </div>
            } 
        </div>
    )
}