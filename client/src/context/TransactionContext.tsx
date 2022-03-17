import React, { useEffect, useState } from 'react'
import type { TransactionContextType } from '../types'

export const TransactionContext = React.createContext({} as TransactionContextType)
import { ethers } from 'ethers'

const { ethereum }: any = window
export const TransactionProvider = ({ children }: any) => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [formData, setFormData] = useState({ addressTo: '', amount: '' })

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
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
