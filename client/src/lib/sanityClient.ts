import sanityClient from '@sanity/client'
export const client = sanityClient({
  projectId: 'moqw5oz2',
  dataset: 'production',
  apiVersion: 'v1',
  token: import.meta.env.VITE_SANITY_TOKEN as string,
  useCdn: false,
})

// 保存交易信息
export const saveTransaction = async (transactionInfo: any) => {
  const { txHash, amount, fromAddress, toAddress } = transactionInfo
  const txDoc = {
    _type: 'transactions',
    _id: txHash,
    fromAddress,
    toAddress,
    timestamp: new Date(Date.now()).toISOString(),
    txHash,
    amount: parseFloat(amount),
  }
  const res = await client.createIfNotExists(txDoc)
  //   amount: 0.1
  // fromAddress: "0xe21b2d4218c67efc544a893c824e289eec467fd5"
  // timestamp: "2022-03-18T05:06:17.916Z"
  // toAddress: "0xE21B2D4218C67Efc544A893C824E289eEc467fD5"
  // txHash: "0x641fe8c5641692b818bcd9d748d4b2478a95b732f33e87c633bac2726800eccd"
  // _createdAt: "2022-03-18T05:06:18Z"
  // _id: "0x641fe8c5641692b818bcd9d748d4b2478a95b732f33e87c633bac2726800eccd"
  // _rev: "MjXuzc6psNgT2wzwWu9pdL"
  // _type: "transactions"
  // _updatedAt: "2022-03-18T05:06:18Z"
  return res
}

// 获取最近20条交易信息
export const getTransaction = async () => {
  const query = `*[_type == "transactions"] | order(timestamp desc){
    txHash,fromAddress,toAddress,amount,timestamp
  }[0...20]`
  const res = await client.fetch(query)
  return res
}
