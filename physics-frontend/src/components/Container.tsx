export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 via-pink-300 to-purple-300 text-gray-900 flex flex-col items-center justify-center px-4">
      {children}
    </div>
  );
}
