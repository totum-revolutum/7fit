import { Header } from "../components/Header";
import { About } from "../components/About";
import { Coaches } from "../components/Coaches";
import { Schedule } from "../components/BookingCalendar";
import { Banner } from "../components/Banner";
import { Price } from "../components/Price";
import { Map } from "../components/Map";

function Home() {
  return (
    <>
      <div>
        <Header />
        <About />
        <Coaches />
        <Schedule />
        <Banner />
        <Price />
        <Map />
      </div>
    </>
  );
}

export default Home;
