import { useRoutes } from "react-router-dom";
import { POSPage } from "./pages/pos";
import { OrderPage } from "./pages/order";
import { MainLayout } from "./layouts/mainLayout";

export default function UseRouteElements() {
  const routeElements = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <POSPage />
        </MainLayout>
      ),
    },
    {
      path: "/order",
      element: (
        <MainLayout>
          <OrderPage />
        </MainLayout>
      ),
    },
    {
      path: "*",
      element: <h1>404 page</h1>,
    },
  ]);

  return routeElements;
}
