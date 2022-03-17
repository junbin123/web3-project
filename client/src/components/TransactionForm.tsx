import { useContext } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { TransactionContext } from '../context/TransactionContext'
import type { FormDataType } from '../types'

function TransactionForm() {
  const { currentAccount, formData, setFormData, sendTransaction, isLoading } =
    useContext(TransactionContext)
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof FormDataType
  ) {
    const value = event.target.value
    setFormData((prevState) => ({ ...prevState, [key]: value }))
  }

  async function handleSubmit() {
    const { addressTo, amount } = formData
    if (!addressTo || !amount) return
    sendTransaction()
  }
  return (
    <div className='w-[30rem] rounded-md bg-[#111625] p-3 border border-slate-500'>
      {isLoading ? '加载中...' : '没有'}
      <div className='pb-2 text-lg'>Swap</div>
      <Stack spacing={2}>
        <Autocomplete
          freeSolo
          options={[]}
          disabled={isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Amount'
              placeholder='0.0'
              onChange={(e) => handleChange(e, 'amount')}
            />
          )}
        />
        <Autocomplete
          freeSolo
          options={[]}
          disabled={isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Address To'
              placeholder='0x...'
              onChange={(e) => handleChange(e, 'addressTo')}
            />
          )}
        />

        <LoadingButton variant='contained' size='large' onClick={handleSubmit} loading={isLoading}>
          <span className='normal-case'>Confirm</span>
        </LoadingButton>
      </Stack>
    </div>
  )
}

export default TransactionForm
