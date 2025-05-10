import { Header } from "../components/Header";
import { About } from "../components/About";
import { Coaches } from "../components/Coaches";
import { Schedule } from "../components/BookingCalendar";

function Home() {
  return (
    <>
      <div>
        <Header />
        <About />
        <Coaches />
        <Schedule />
      </div>
    </>
  );
}

export default Home;
