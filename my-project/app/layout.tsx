import { ReactNode } from "react";
import ProviderRedux from "./provider";
import ThemeProvider from "../component/ThemeProvider";

import "./globals.css";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Menyediakan struktur html dan body */}
      <html lang="en">
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        </head>
        <body>
          <ProviderRedux>
            <ThemeProvider>

              {/* Main Content */}
              <div className="min-h-screen bg-gray-50">
                {children}
              </div>
            </ThemeProvider>
          </ProviderRedux>
        </body>
      </html>
    </>
  );
};

export default Layout;
