'use client'

import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { parseEther } from 'viem'
import { PREDICTION_CONTRACT_ADDRESS, PREDICTION_ABI } from '../contract'

export function PredictionForm() {
  const { address, isConnected } = useAccount()
  const { writeContract, isPending, error } = useWriteContract()

  // 1. Oyunun bitiş süresini okuma (endTime)
  const { data: endTime } = useReadContract({
    address: PREDICTION_CONTRACT_ADDRESS,
    abi: PREDICTION_ABI,
    functionName: 'endTime',
  })

  // 2. Oyunun çözülüp çözülmediğini okuma (isResolved)
  const { data: isResolved } = useReadContract({
    address: PREDICTION_CONTRACT_ADDRESS,
    abi: PREDICTION_ABI,
    functionName: 'isResolved',
  })

  // 3. Kullanıcının kendi tahmin detaylarını okuma (predictions(address))
  const { data: userPrediction } = useReadContract({
    address: PREDICTION_CONTRACT_ADDRESS,
    abi: PREDICTION_ABI,
    functionName: 'predictions',
    args: address ? [address] : undefined,
  })

  const handlePredict = () => {
    if (!isConnected) return

    writeContract({
      address: PREDICTION_CONTRACT_ADDRESS,
      abi: PREDICTION_ABI,
      functionName: 'submitPrediction',
      args: [], 
      value: parseEther('0.01'), // Kontratın istediği miktar
    })
  }

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-900 rounded-xl border border-gray-800 text-white w-96">
      <h3 className="text-lg font-bold">Prediction Market</h3>

      {/* Kontrat Bilgileri */}
      <div className="text-sm bg-gray-800 p-3 rounded-lg flex flex-col gap-1">
        <p>Bitiş Zamanı (endTime): {endTime ? String(endTime) : 'Yükleniyor...'}</p>
        <p>Durum (isResolved): {isResolved ? 'Çözüldü' : 'Devam Ediyor'}</p>
      </div>
      
      {!isConnected ? (
        <p className="text-yellow-400 text-sm">
          Tahminde bulunmak için lütfen cüzdanınızı bağlayın.
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