import React from 'react'
export const TransactionContext = React.createContext({ currentAccount: '' })
export const TransactionProvider = ({ children }: any) => {
  const currentAccount = '123'
  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
