const { ethers } = require("ethers");
require("dotenv").config();

// Monad Testnet RPC ve Kontrat Bilgileri
const RPC_URL = "https://testnet-rpc.monad.xyz"; // Monad Testnet RPC
const PRIVATE_KEY = process.env.AGENT_PRIVATE_KEY; // Ajan cüzdanının private key'i
const CONTRACT_ADDRESS = "0x2b9AdF31399a15Be561700FD7F9E33d1d21223De";

const abi = [
    "function resolve(uint256 _actualPrice) external"
];

async function runAgent() {
    try {
        console.log("Monad AI Ajanı çalıştı, piyasa fiyatı çekiliyor...");
        
        // Örnek olarak harici bir API'den fiyat çektiğimizi simüle edelim (Gerçekte CoinGecko vb. kullanılabilir)
        // devnads agents API veya standart bir Oracle verisi buraya eklenebilir.
        const actualPrice = 6500000; // Örnek fiyat (Örn: 65,000.00 USD)

        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

        console.log(`Fiyat belirlendi: ${actualPrice}. Kontrat sonuçlandırılıyor...`);
        
        const tx = await contract.resolve(actualPrice);
        console.log(`İşlem gönderildi, Hash: ${tx.hash}`);

        await tx.wait();
        console.log("Oyun başarıyla sonuçlandırıldı ve zincire yazıldı!");

        // devnads agent doğrulama endpoint'i çağrısı (Opsiyonel / Simülasyon)
        // await fetch("https://agents.devnads.com/v1/verify", { method: "POST", ... });

    } catch (error) {
        console.error("Ajan çalışırken hata oluştu:", error);
    }
}

runAgent();