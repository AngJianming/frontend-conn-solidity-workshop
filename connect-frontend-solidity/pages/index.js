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
    address: '0xBc0AC9B08C5f9daAfd9c0fd45416864e95DE82F3', // change to your own address
    abi: contractABI.abi,
    functionName: 'getNumber',
    watch: true
  })

  const { config } = usePrepareContractWrite({
    address: '0xBc0AC9B08C5f9daAfd9c0fd45416864e95DE82F3', // change to your own address
    abi: contractABI.abi,
    functionName: 'changeNumber',
    args: [number],

  })

  const { data: useContractWriteData, write, error: writeError } = useContractWrite(config)

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

  useEffect(() => {
    if (writeError) {
      console.error("Write Error:", writeError);
    }
  }, [writeError]);

  return (
    <>
      <main className={styles.main}>
        <ConnectButton />
        <p>Enter New Number: </p>
        <input 
          className="put"
          onChange={(e) => setNumber(Number(e.target.value))}type="number"
        />
        <button className={styles.btn} disabled={!write} onClick={() => { write?.() }}>
          Change Number
        </button>
        {isSuccess && <div>{useContractReadData.toNumber()}</div>}
      </main>
    </>
  )
}
