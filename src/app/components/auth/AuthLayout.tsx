interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-xl">
        {children}
      </div>
    </div>
  );
}
