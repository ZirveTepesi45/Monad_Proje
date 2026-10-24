'use client'

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { formatUnits } from 'viem'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address })

  if (isConnected) {
    return (
      <div className="flex items-center gap-4 p-4 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-800">
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">Bağlı Cüzdan</span>
          <span className="font-mono font-medium">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
        <div className="flex flex-col items-end border-l border-gray-700 pl-4">
          <span className="text-sm text-gray-400">Bakiye</span>
          <span className="font-medium text-purple-400">
            {balance ? formatUnits(balance.value, balance.decimals).slice(0, 6) : '0'} {balance?.symbol}
          </span>
        </div>
        <button
          onClick={() => disconnect()}
          className="ml-2 px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm font-medium"
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
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all active:scale-95"
        >
          Cüzdanı Bağla
        </button>
      ))}
    </div>
  )
}
