import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TransactionContext } from '../context/TransactionContext'
import { useContext } from 'react'
import { Link } from '@mui/material'

function sliceStr(str: string): string {
  return str.slice(0, 6) + '...' + str.slice(-6)
}

export default function DenseTable() {
  const { transactionList } = useContext(TransactionContext)

  return (
    <div className='w-30 mt-10 max-w-full'>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Transaction Hash</TableCell>
              <TableCell align='right'>FromAddress</TableCell>
              <TableCell align='right'>ToAddress</TableCell>
              <TableCell align='right'>Amount</TableCell>
              <TableCell align='right'>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionList.map((row) => (
              <TableRow key={row.txHash}>
                <TableCell component='th' scope='row'>
                  <Link
                    underline='hover'
                    href={`https://ropsten.etherscan.io/tx/${row.txHash}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {sliceStr(row.txHash)}
                  </Link>
                </TableCell>
                <TableCell align='right'>{sliceStr(row.fromAddress)} </TableCell>
                <TableCell align='right'>{sliceStr(row.toAddress)}</TableCell>
                <TableCell align='right'>{row.amount}</TableCell>
                <TableCell align='right'>{row.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
