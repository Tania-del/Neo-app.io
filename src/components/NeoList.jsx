import React, { useContext, useState, useEffect } from 'react'
import { getNeoDataForRange } from '../api';
import { NeoContext } from './NeoContext'

export const NeoList = () => {
    const { neos, setNeos, setFullNeos, fullNeos } = useContext(NeoContext);
    
    const setSlicedNeos = (data) => {
        // const slicedData = (())
        // setNeos((prevNeos) => {
        //     const updatedNeos = [...prevNeos, ...data]
        //     if(updatedNeos.length > 6) {
        //         updatedNeos.shift()
        //     }
        //     return updatedNeos;
        // })


       const slicedNeos = data.slice(0, 6)
       setNeos(slicedNeos)
       console.log(slicedNeos)
    }

    const fetchData = async () => {
        const data = await getNeoDataForRange()
        setFullNeos(data);
        setSlicedNeos(data)
    }

//    console.log(fullNeos)

    useEffect(() => {
        // const interval = setInterval(() => {
            fetchData()
            
            // }, 5000)
            // return () => {
                // clearInterval(interval)
                // }
            }, [])


            // useEffect(() => {
            //     setSlicedNeos(fullNeos);
            //   }, [fullNeos]);
              

      return (
        <div>
        <h1>Near Orbital Objects (NEO)</h1>
        <ul>
      
      {neos.map((neo) => {
          const neoObjects = neo?.data?.near_earth_objects?.[neo?.date]

          const [obj] = neoObjects;


              const { estimated_diameter, close_approach_data } = obj;
              const { feet, kilometers, meters, miles } =  estimated_diameter;
              const [{ miss_distance, relative_velocity }] = close_approach_data;

              const feetEstMax = feet?.estimated_diameter_max;
              const kilometersEstMax = kilometers?.estimated_diameter_max;
              const metersEstMax = meters?.estimated_diameter_max;
              const milesEstMax = miles?.estimated_diameter_max;

              const missDistanceKm = miss_distance?.kilometers;
              const relativeVelocity = relative_velocity?.kilometers_per_hour;
               const formatter = new Intl.NumberFormat('en-US');
               const hazardousCount = neoObjects.filter((obj) => obj.is_potentially_hazardous_asteroid).length;

          return (
       <li key={neo.date}>
        <h3>Date: {neo.date}</h3>
        <ul>
            <li className="list-item">Feet max estimated diameter: {formatter.format(feetEstMax)}</li>
            <li className="list-item">Kilometers max estimated diameter: {formatter.format(kilometersEstMax)}</li>
            <li className="list-item">Meters max estimated diameter: {formatter.format(metersEstMax)}</li>
            <li className="list-item">Miles max estimated diameter: {formatter.format(milesEstMax)}</li>
            <li className="list-item">Number of potentially hazardous NEOs: {hazardousCount}</li>
            <li className="list-item">Closest NEO: {formatter.format(missDistanceKm)}</li>
            <li className="list-item">Fastest NEO: {formatter.format(relativeVelocity)}</li>
        </ul>
      </li>
          )
      })}
    </ul>
        </div>
    )
}
