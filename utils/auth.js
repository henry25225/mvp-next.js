export const useAuth = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const auth = localStorage.getItem("auth");
  return auth ? JSON.parse(auth) : null;
};
