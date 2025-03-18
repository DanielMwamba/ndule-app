import { Suspense } from "react";
import SignInForm from "@/app/components/auth/SignInForm";

function SignInPageContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-500">Connexion</h1>
          <p className="mt-2 text-gray-400">
            Connectez-vous pour accéder à votre compte
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 w-48 bg-gray-700/20 rounded mx-auto mb-2" />
                <div className="h-4 w-64 bg-gray-700/20 rounded mx-auto" />
              </div>
            </div>
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-700/20 rounded" />
              <div className="h-10 bg-gray-700/20 rounded" />
              <div className="h-10 bg-gray-700/20 rounded" />
            </div>
          </div>
        </div>
      }
    >
      <SignInPageContent />
    </Suspense>
  );
}
