import { useContext } from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { TransactionContext } from '../context/TransactionContext'

function ConnectButton() {
  const { currentAccount } = useContext(TransactionContext)
  return (
    <Stack direction='row'>
      {currentAccount}
      <Button variant='contained'>Connect Wallet</Button>
    </Stack>
  )
}
export default ConnectButton
