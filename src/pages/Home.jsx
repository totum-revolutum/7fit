import { Header } from "../components/Header";
import { About } from "../components/About";
import { Coaches } from "../components/Coaches";

function Home() {
  return (
    <>
      <div>
        <Header />
        <About />
        <Coaches />
      </div>
    </>
  );
}

export default Home;
