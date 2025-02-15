import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import Button from './ui/Button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate, Link } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-bold">
      {/* Navbar */}
      <nav className="w-full fixed top-0 flex justify-between items-center px-8 py-4 bg-white border-b-4 border-black shadow-neo">
        <Link to="/" className="text-3xl">
          🔓 Unlock
        </Link>
        {!isConnected && (
          <ConnectButton
            showBalance={false}
            chainStatus="none"
            accountStatus="address"
            className="custom-connect-button"
          />
        )}
      </nav>

      {/* Hero Section */}
      <section className="text-center mt-16">
        <h1 className="text-6xl font-bold mb-4">
          Join Exclusive <span className="text-[#ffffff]">Web3</span> Communities
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Unlock premium content & courses using blockchain.
        </p>
        <Button className="flex justify-center"
          onClick={() => navigate('/dashboard')}
        >
          Get Started
        </Button>
      </section>
    </div>
  );
}

export default LandingPage;