export const PREDICTION_CONTRACT_ADDRESS = "0xAeD1209E8E44a28c391AFe6D90ff45187433EF3D" as const;

export const PREDICTION_ABI = [
  // Arkadaşının Forge çıktısından aldığı ABI dizisini buraya yapıştır:
  // Örnek format:
  {
    inputs: [],
    name: "submitPrediction",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;