import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";

function SignInContent() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-green-500 hover:bg-green-600 text-sm normal-case",
          card: "bg-transparent shadow-none",
          headerTitle: "text-white",
          headerSubtitle: "text-gray-400",
          socialButtonsBlockButton:
            "bg-gray-700 hover:bg-gray-600 border-none text-white",
          formFieldInput: "bg-gray-700 border-gray-600 text-white",
          footerActionLink: "text-green-500 hover:text-green-400",
        },
      }}
    />
  );
}

export function SignInForm() {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-700/20 rounded" />
          <div className="h-10 bg-gray-700/20 rounded" />
          <div className="h-10 bg-gray-700/20 rounded" />
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
