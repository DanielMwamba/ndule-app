export const APP_NAME = "Stripe Payment";

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
  },
  PAYMENT: {
    CREATE_SESSION: "/api/payment/create-session",
    WEBHOOK: "/api/payment/webhook",
  },
  SEARCH: {
    PRODUCTS: "/api/search/products",
  },
} as const;

export const UI_CONSTANTS = {
  MAX_ITEMS_PER_PAGE: 10,
  ANIMATION_DURATION: 300,
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
  },
} as const;

export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: "Identifiants invalides",
    SESSION_EXPIRED: "Session expirée",
  },
  PAYMENT: {
    FAILED: "Le paiement a échoué",
    INVALID_AMOUNT: "Montant invalide",
  },
  GENERIC: {
    SERVER_ERROR: "Une erreur est survenue",
    NETWORK_ERROR: "Erreur de connexion",
  },
} as const;
