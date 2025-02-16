import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./ui/Button";

export default function MyAccount() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">My Account</h1>
      <div className="bg-white border-2 border-black p-6 rounded-lg w-96">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Membership:</strong> Premium</p>
        <Button className="mt-4 w-full bg-[#ffcc00] text-black">
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
