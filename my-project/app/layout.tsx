import { ReactNode } from "react";
import ProviderRedux from "./provider";
import ThemeProvider from "../component/ThemeProvider";
import JobMessage from "./JobMessage";
import CompanyMessage from "../component/CompanyMessage";
import UserMessage from "./UserMessage";
import "./globals.css";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Menyediakan struktur html dan body */}
      <html lang="en">
        <head>
          {/* Head content seperti meta tags bisa ditempatkan di sini */}
        </head>
        <body>
          <ProviderRedux>
            <ThemeProvider>
              {/* Display messages */}
              <JobMessage />
              <CompanyMessage />
              <UserMessage />

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
