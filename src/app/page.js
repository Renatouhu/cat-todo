"use client"
import { Main } from './components/Main/main.jsx'
import { Header } from './components/Header/header.jsx'
import { useState, createContext, useEffect, useRef } from 'react'
import { SectionBody } from './components/SectionBody/SectionBody.jsx'

export const ThemeContext = createContext()

export default function Home() {
  const [ themeId, setThemeId ] = useState(0)
  const hasPageBeenRendered = useRef(false)

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage["themeId"] != undefined
    ) 
    {
      setThemeId(localStorage.getItem("themeId"))
    }
  }, []);

  useEffect(() => {
    if(hasPageBeenRendered.current){
      localStorage.setItem("themeId", themeId);
      return
    }

    hasPageBeenRendered.current = true
  }, [themeId]);
  
  return (
    <ThemeContext.Provider value={{themeId, setThemeId}}>
      <SectionBody>
        <Header title="Cat Todo" withimage='true' />
        <Main />
      </SectionBody>
    </ThemeContext.Provider>
  )
}