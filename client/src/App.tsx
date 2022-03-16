import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ConnectButton from './components/ConnectButton'
import TransactionForm from './components/TransactionForm'

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  })
  const style = {
    wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#001B35] text-white select-none flex flex-col items-center pt-10`,
  }
  return (
    <ThemeProvider theme={theme}>
      <div className={style.wrapper}>
        <ConnectButton />
        <div className='pt-10'></div>
        <TransactionForm />
      </div>
    </ThemeProvider>
  )
}
export default App
