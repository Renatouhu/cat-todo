"use client"
import { Main } from './components/Main/main.jsx'
import { Header } from './components/Header/header.jsx'
import { useState, createContext } from 'react'
import { SectionBody } from './components/SectionBody/SectionBody.jsx'

export const ThemeContext = createContext()

export default function Home() {
  const [ themeId, setThemeId ] = useState(1)
  return (
    <ThemeContext.Provider value={{themeId, setThemeId}}>
      <SectionBody>
        <Header title="Cat Todo" withimage='true' />
        <Main />
      </SectionBody>
    </ThemeContext.Provider>
  )
}