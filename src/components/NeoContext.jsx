import React, { createContext, useState } from "react";
import { useEffect } from "react";
import axios from 'axios';



export const NeoContext = createContext([])

export const NeoProvider = ({ children }) => {
const [neos, setNeos] = useState([])
const [fullNeos, setFullNeos] = useState([]);
return (
     <NeoContext.Provider value={{neos, setNeos, fullNeos, setFullNeos}}>
    {children}
</NeoContext.Provider> 
)
}

