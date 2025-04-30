import { Layout } from "./components/Layout";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <div className="fixed-bg" />
      <Layout>
        <Home />
        <Contact />
        <Footer />
      </Layout>
    </>
  );
}

export default App;
