import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/dashboard";
import NavBar from "./components/NavBar";
import InventoryManagerMock from "./services/inventoryManagerMock";

export default function Router() {
  const inventoryManager = new InventoryManagerMock();

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
