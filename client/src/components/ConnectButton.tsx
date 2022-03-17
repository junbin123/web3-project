import { useContext } from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { TransactionContext } from '../context/TransactionContext'

function ConnectButton() {
  const { currentAccount, connectWallet } = useContext(TransactionContext)
  const style = {
    userName: `text-white bg-[rgba(255,255,255,0.1)] h-12 rounded-md w-fit flex items-center px-4`,
    avatar: `h-6 w-6 rounded-full bg-[#111625] mr-2`,
  }
  return (
    <Stack direction='row'>
      {currentAccount ? (
        <div className={style.userName}>
          <img
            className={style.avatar}
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0xxeQe2fRjvIQbegZz-y-HMn9JNN0sSiTTx1bXZvbjDsErD9LojB7f5pj9aPnBLeSK44&usqp=CAU'
          ></img>
          {currentAccount.slice(0, 6) + '...' + currentAccount.slice(-4)}
        </div>
      ) : (
        <Button variant='contained' size='large' onClick={() => connectWallet()}>
          Connect Wallet
        </Button>
      )}
    </Stack>
  )
}
export default ConnectButton
