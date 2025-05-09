import { Layout } from "./components/Layout";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./pages/Home.jsx";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <>
      <Layout>
        <NavBar />
        <Home />
        <Contact />
        <Footer />
      </Layout>
    </>
  );
}

export default App;
