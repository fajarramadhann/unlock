import ImageCard from "./ui/ImageCard";

export default function MyPurchase() {
  return (
    <div className="flex flex-col items-center min-h-screen p-2">
      <h1 className="text-4xl font-bold mb-6">My Purchases</h1>
      <div className="grid grid-cols-3 gap-6">
        <ImageCard imageUrl="https://via.placeholder.com/250" caption="React Masterclass" />
        <ImageCard imageUrl="https://via.placeholder.com/250" caption="UI/UX Design Course" />
        <ImageCard imageUrl="https://via.placeholder.com/250" caption="Advanced JavaScript" />
      </div>
    </div>
  );
}
