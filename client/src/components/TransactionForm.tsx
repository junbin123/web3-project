import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

function TransactionForm() {
  return (
    <div className='w-[30rem] rounded-md bg-[#111625] p-3 border border-slate-500'>
      <div className='pb-2 text-lg'>Swap</div>
      <Stack spacing={2}>
        <Autocomplete
          freeSolo
          options={[]}
          renderInput={(params) => <TextField {...params} label='Amount' placeholder='0.0' />}
        />
        <Autocomplete
          freeSolo
          options={[]}
          renderInput={(params) => <TextField {...params} label='Address To' placeholder='0x...' />}
        />
        <Button variant='contained' size='large'>
          Confirm
        </Button>
      </Stack>
    </div>
  )
}

export default TransactionForm
