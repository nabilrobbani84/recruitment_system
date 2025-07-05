"use client"; // Tanda ini sangat penting!

import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store"; // Pastikan path ini benar
import { AuthProvider } from "@/contexts/AuthContext"; // 1. Impor AuthProvider

// Mengganti nama `Provider` dari Redux agar tidak bentrok
const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReduxProvider store={store}>
            {/* 2. Bungkus children dengan AuthProvider di sini */}
            <AuthProvider>
                {children}
            </AuthProvider>
        </ReduxProvider>
    );
};

export default Providers;