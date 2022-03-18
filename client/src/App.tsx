import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ConnectButton from './components/ConnectButton'
import TransactionForm from './components/TransactionForm'
import TransactionTable from './components/TransactionTable'
import { TransactionProvider } from './context/TransactionContext'

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  })
  const style = {
    wrapper: `h-screen max-h-screen h-min-screen bg-[#001B35] text-white select-none flex flex-col items-center`,
  }
  return (
    <ThemeProvider theme={theme}>
      <TransactionProvider>
        <div className={style.wrapper}>
          <div className='pt-10'></div>
          <ConnectButton />
          <div className='pt-10'></div>
          <TransactionForm />
          <TransactionTable />
        </div>
      </TransactionProvider>
    </ThemeProvider>
  )
}
export default App
