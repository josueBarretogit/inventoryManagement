import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/dashboard";
import NavBar from "./components/NavBar";
import InventoryManagerMock from "./services/inventoryManagerMock";
import ApiInventoryManager from "./services/inventoryManager";

export default function Router() {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const inventoryManager =
    baseUrl === undefined
      ? new InventoryManagerMock()
      : new ApiInventoryManager(baseUrl);

  return (
    <>
      <NavBar />
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
