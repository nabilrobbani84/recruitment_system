"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";

// Menentukan tipe untuk children menggunakan React.ReactNode
const ProviderRedux = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderRedux;
 