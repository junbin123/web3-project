export type ChainIdType = '0x1' | '0x5' | '0x2a' | '0x4' | '0x3'
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
  chainName: string
}
