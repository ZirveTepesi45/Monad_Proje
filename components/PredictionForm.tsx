'use client'

import { useAccount, useWriteContract } from 'wagmi'
import { PREDICTION_CONTRACT_ADDRESS, PREDICTION_ABI } from '../contract'

export function PredictionForm() {
  const { isConnected } = useAccount()
  const { writeContract, isPending, error } = useWriteContract()

  const handlePredict = () => {
    if (!isConnected) return

    writeContract({
      address: PREDICTION_CONTRACT_ADDRESS,
      abi: PREDICTION_ABI,
      functionName: 'submitPrediction',
      args: [],
    })
  }

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-900 rounded-xl border border-gray-800 text-white w-96">
      <h3 className="text-lg font-bold">Prediction Market</h3>
      
      {!isConnected ? (
        <p className="text-yellow-400 text-sm">
          Tahminde bulunmak için lütfen önce yukarıdan cüzdanınızı bağlayın.
        </p>
      ) : (
        <button
          onClick={handlePredict}
          disabled={isPending}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-medium rounded-xl transition-all cursor-pointer"
        >
          {isPending ? 'İşlem Onaylanıyor...' : 'Tahminde Bulun (Submit)'}
        </button>
      )}

      {error && <span className="text-red-400 text-sm">Hata: {error.message}</span>}
    </div>
  )
}