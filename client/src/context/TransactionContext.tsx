import React, { useEffect, useState } from 'react'
import type { TransactionContextType } from '../types'
import { contractABI, contractAddress } from '../lib/constants'
import { ethers } from 'ethers'

export const TransactionContext = React.createContext({} as TransactionContextType)
const { ethereum }: any = window

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
  return transactionContract
}

export const TransactionProvider = ({ children }: any) => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [formData, setFormData] = useState({ addressTo: '', amount: '' })
  const [isLoading, setIsLoading] = useState(false)

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
      transactionHash: transactionHash.hash,
      amount,
      currentAccount,
      addressTo,
    }
    console.log(saveData)
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
      {children}
    </TransactionContext.Provider>
  )
}
