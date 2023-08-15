import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import publicRoutes from "./components/Modules/Routes/index.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route key={index} path={route.path} element={<Page />}>
                
              </Route>
            )
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
