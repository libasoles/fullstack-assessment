import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import Providers from "../providers/providers";

export const metadata: Metadata = {
  title: "Number8 assessment",
  description: "Fullstack assessment for Number8",
};

const queryClient = new QueryClient();

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CssBaseline />
          <Container>
            <main>{children}</main>
          </Container>
        </Providers>
      </body>
    </html>
  );
}
