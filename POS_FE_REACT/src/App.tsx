import "./App.css";
import UseRouteElements from "./UseRouteElements";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routeElements = UseRouteElements();
  return <>{routeElements}</>;
}

export default App;
