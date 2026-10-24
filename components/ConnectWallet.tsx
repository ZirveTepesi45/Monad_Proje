'use client'

import { formatEther } from 'viem'
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { useState, useEffect } from 'react'

export function ConnectWallet() {
  const [isMounted, setIsMounted] = useState(false)
  const { address, isConnected } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Bileşen tarayıcıda yüklenene kadar boş döndür (Hydration hatasını önler)
  if (!isMounted) return null

  if (isConnected) {
    return (
      <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl border border-gray-800 text-white">
        <div className="flex flex-col text-sm">
          <span className="text-gray-400">Bağlı Adres:</span>
          <span className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                {balance && (
        <span className="text-purple-400 font-semibold">
            Bakiye: {Number(formatEther(balance.value)).toFixed(4)} {balance.symbol}
         </span>
        )}
        </div>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all cursor-pointer"
        >
          Çıkış Yap
        </button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all cursor-pointer"
        >
          {connector.name} ile Bağlan
        </button>
      ))}
    </div>
  )
}
