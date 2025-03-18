import { Suspense } from "react";
import { SignUpForm } from "@/app/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-500">Inscription</h1>
          <p className="mt-2 text-gray-400">
            Créez votre compte pour commencer
          </p>
        </div>
        <Suspense
          fallback={
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-700/20 rounded" />
              <div className="h-10 bg-gray-700/20 rounded" />
              <div className="h-10 bg-gray-700/20 rounded" />
            </div>
          }
        >
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  );
}
