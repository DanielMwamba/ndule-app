import { SignIn } from "@clerk/nextjs";
import AuthLayout from "@/app/components/auth/AuthLayout";

export default function SignInPage() {
  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Bienvenue</h1>
        <p className="text-gray-400">
          Connectez-vous pour accéder à votre compte
        </p>
      </div>
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
    </AuthLayout>
  );
}
