import { Layout } from "./components/Layout";
import Home from "./pages/Home.tsx";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <>
      <Layout>
        <NavBar />
        <Home />
      </Layout>
    </>
  );
}

export default App;
