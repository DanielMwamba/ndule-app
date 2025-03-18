import { SignUp } from "@clerk/nextjs";

export function SignUpForm() {
  return (
    <SignUp
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
