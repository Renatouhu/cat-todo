import { Main } from './components/main/main.jsx'
import { Header } from './components/header/header.jsx'

export default function Home() {
  return (
    <>
      <Header title="Cat Todo" withimage='true' />
      <Main />
    </>
  )
}