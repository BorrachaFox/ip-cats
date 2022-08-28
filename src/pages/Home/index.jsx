import React, { useState, useEffect } from "react"

import { SearchResult } from '../../components'
import { api } from "../../services/api"

import SvgWorld from '../../assets/img/connected-world.svg'
import MapImage from '../../assets/img/map.png'

import "./style.scss"
import axios from "axios"

const Home = () => {
  const [userIp, setUserIp] = useState('');
  const [location, setLocation] = useState([]);
  const [inputValue, setInputValue] = useState('');

  async function getIpAdress(ipAdress) {
    const res = await api.get(`${ipAdress}`+'/json/')
    const data = (res.data)
    setLocation(data)
    
    if(!ipAdress) setUserIp(data.ip)
  }

  const handleSubmit = event => {
    event.preventDefault();
    if(inputValue) getIpAdress(inputValue);
    setInputValue('');
  };

  useEffect(() => {
    getIpAdress('')
  }, [])
  
  useEffect(() => {
    console.log(userIp)
  }, [userIp]);

  return (
    <div className="container">
      <div className="header">
        <div className="logo">IpCats</div>
        <div className="ip">IP: {userIp}</div>
      </div>
      <div className="mainSection">
        <div className="mainText">
          <div className="title">De onde vem este IP?</div>
          <div className="description">
          📌 Forneça o IP desejado e descubra sua região e localização.
          </div>
        </div>                
        <img src={SvgWorld} alt="Connected world"/>
      </div>
      <div className="ipSearch">
        <h2>DIGITE O IP DESEJADO:</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            id="SearchIp" 
            name="SearchIp" 
            placeholder="Digite IP 8.8.8.8"
            onChange={event => setInputValue(event.target.value)} 
            value={inputValue}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <SearchResult locationData={location}/>
      <div className="map">
        <iframe src={`//maps.google.com/maps?q=${location.latitude},${location.longitude}&z=12&output=embed`}>
        </iframe>
      </div>
      <div className="footer"/>
    </div>
  )
}

export default Home
