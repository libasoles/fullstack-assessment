import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { PropsWithChildren } from "react";
import theme from "../theme";
import ClientProviders from "./clientProviders";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ClientProviders>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </ClientProviders>
  );
}
