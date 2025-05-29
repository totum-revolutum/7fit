import { Header } from "../components/Header";
import { About } from "../components/About";
import { Coaches } from "../components/Coaches";
import { Schedule } from "../components/BookingCalendar";
import { Banner } from "../components/Banner";
import { Price } from "../components/Price";
import { Feedback } from "../components/Feedback";
import { Footer } from "../components/Footer";
import { TrainersList } from "@components/Treinets";

function Home() {
  return (
    <>
      <Header />
      <TrainersList />
      <About />
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
