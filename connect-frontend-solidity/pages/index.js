import { ConnectButton } from '@rainbow-me/rainbowkit'
import styles from '../styles/Home.module.css'
import contractABI from "../data.json"
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'

import { useEffect, useState } from 'react'


export default function Home() {
  const [number, setNumber] = useState(0)

  const { data: useContractReadData } = useContractRead({
    address: '0x02E06e2930A40eb280F30b2a22e6a585C4aA6D9A', // change to your own address
    abi: contractABI.abi,
    functionName: 'getNumber',
    watch: true
  })

  const { config } = usePrepareContractWrite({
    address: '0x02E06e2930A40eb280F30b2a22e6a585C4aA6D9A', // change to your own address
    abi: contractABI.abi,
    functionName: 'changeNumber',
    args: [number],

  })

  const { data: useContractWriteData, write } = useContractWrite(config)

  const { data: useWaitForTransactionData, isSuccess } = useWaitForTransaction({
    hash: useContractWriteData?.hash
  })

  useEffect(() => {
    console.log("__________________________");
    console.log("useContractReadData", useContractReadData);
    console.log("useContractWriteData:", useContractWriteData);
    console.log("useWaitForTransactionData:", useWaitForTransactionData);
    console.log("__________________________");
  }, [useContractReadData, useContractWriteData, useWaitForTransactionData]);


  return (
    <>
      <main className={styles.main}>
        <ConnectButton />
        <p>Enter New Number: </p>
        <input onChange={(e) => setNumber(e.target.value)} type="number" />
        <button disabled={!write} onClick={() => { write?.() }}>Change Number </button>
        {isSuccess && <div >{useContractReadData.toNumber()}</div>}

      </main>
    </>
  )
}
