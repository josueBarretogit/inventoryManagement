import { BrowserRouter, Route, Routes } from "react-router";
import InventoryManagerMock from "./services/inventoryManagerMock";
import ApiInventoryManager from "./services/inventoryManager";
import React from "react";

const Dashboard = React.lazy(() => import("./pages/dashboard.tsx"))

export default function Router() {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const inventoryManager =
    baseUrl === undefined
      ? new InventoryManagerMock()
      : new ApiInventoryManager(baseUrl);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            path="/"
            element={<Dashboard inventoryManager={inventoryManager} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
