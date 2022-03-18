export interface FormDataType {
  addressTo: string
  amount: string
}
export interface TransactionContextType {
  currentAccount: string
  connectWallet: () => void
  sendTransaction: () => void
  isLoading: boolean
  formData: FormDataType
  setFormData: (data: FormDataType) => void
  transactionList: any[]
}
