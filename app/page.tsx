import { ConnectWallet } from "../components/ConnectWallet";
import { PredictionForm } from "../components/PredictionForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-24 bg-black">
      <ConnectWallet />
      <PredictionForm />
    </main>
  );
}