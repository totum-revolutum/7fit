import { Header } from "../components/Header";
import { About } from "../components/About";
import { Programs } from "../components/Programs";
import { Coaches } from "../components/Coaches";
import { Banner } from "../components/Banner";
import { Price } from "../components/Price";
import { Feedback } from "../components/Feedback";
import { Footer } from "../components/Footer";
import { Schedule } from "../components/Schedule";

function Home() {
  return (
    <>
      <Header />
      <About />
      <Programs />
      <Coaches />
      <Schedule />
      <Banner />
      <Price />
      <Feedback />
      <Footer />
    </>
  );
}

export default Home;
