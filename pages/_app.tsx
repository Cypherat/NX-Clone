import { AuthProvider } from "@/hooks/useAuth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

function App({ Component, pageProps }: AppProps) {
  return  (
    <RecoilRoot>

    {/* High Order Component */}
  <AuthProvider>
<Component {...pageProps} />
  </AuthProvider>

  </RecoilRoot> )
}

export default App;
