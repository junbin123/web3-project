import React, { useEffect, useState } from 'react'
import type { TransactionContextType } from '../types'
import { contractABI, contractAddress } from '../lib/constants'
import { ethers } from 'ethers'
import { Snackbar, Alert, Link } from '@mui/material'
import { saveTransaction } from '../lib/sanityClient'

export const TransactionContext = React.createContext({} as TransactionContextType)
const { ethereum }: any = window

// 获取合约信息
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
  return transactionContract
}
let toastStr = ''

export const TransactionProvider = ({ children }: any) => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [formData, setFormData] = useState({ addressTo: '', amount: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // 执行交易
  async function sendTransaction() {
    if (!currentAccount) {
      return alert('Please connect your wallet')
    }
    setIsLoading(true)
    const { addressTo, amount } = formData
    const transactionContract = getEthereumContract()
    const parsedAmount = ethers.utils.parseEther(amount)
    await ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: currentAccount,
          to: addressTo,
          gas: '0x7EF40',
          value: parsedAmount._hex,
        },
      ],
    })
    const transactionHash = await transactionContract.publicTransaction(
      addressTo,
      parsedAmount,
      `Transferring ETH ${parsedAmount} to ${addressTo}`,
      'TRANSFER'
    )
    await transactionHash.wait()
    const saveData = {
      txHash: transactionHash.hash,
      amount,
      fromAddress: currentAccount,
      toAddress: addressTo,
    }
    saveTransaction(saveData)
    toastStr = `Transaction ${transactionHash.hash.slice(0, 6)}... has been sent`
    setShowToast(true)
    setIsLoading(false)
  }

  // 检查钱包是否连接
  function checkWalletConnected() {
    if (!ethereum) {
      return alert('Please install MetaMask')
    }
    ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts: string[]) => {
        setCurrentAccount(accounts[0])
      })
      .catch(() => {
        throw new Error('No ethereum object.')
      })
  }
  useEffect(() => {
    checkWalletConnected()
  }, [])

  // 连接钱包
  function connectWallet() {
    if (!ethereum) {
      return alert('Please install MetaMask')
    }
    ethereum
      .enable()
      .then((accounts: string[]) => {
        setCurrentAccount(accounts[0])
      })
      .catch(() => {
        throw new Error('No ethereum object')
      })
  }
  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        sendTransaction,
        isLoading,
        formData,
        setFormData,
      }}
    >
      <Snackbar open={showToast} autoHideDuration={6000} onClose={() => setShowToast(false)}>
        <Alert severity='success'>
          <div className='flex items-center justify-center'>
            {toastStr}
            <Link
              className='px-4'
              underline='hover'
              href='https://ropsten.etherscan.io/tx/0x641fe8c5641692b818bcd9d748d4b2478a95b732f33e87c633bac2726800eccd'
              target='_blank'
              rel='noreferrer'
            >
              View on Etherscan
            </Link>
          </div>
        </Alert>
      </Snackbar>
      {children}
    </TransactionContext.Provider>
  )
}
