import { Main } from './components/Main/main.jsx'
import { Header } from './components/Header/Header.jsx'


export default function Home() {
  return (
    <>
      <Header title="Cat Todo" withimage='true' />
      <Main />
    </>
  )
}