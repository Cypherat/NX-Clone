import { AuthProvider } from "@/hooks/useAuth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return ( 
  // HOC
  <AuthProvider>
<Component {...pageProps} />
  </AuthProvider> )
}

export default App;
