import MainNavbar from "./navbar/MainNavbar";
import PerformanceAnalytics from "./sections/PerformanceAnalytics";
import ServicesSection from "./service";
import HeroSection from "./HeroSection/HeroSection";
import OfferSection from "../offer/OfferSection";
import UrlFormMain from "./form/urlFormMain/UrlFormMain";

function Home() {
  return (
    <div className="min-h-screen  flex flex-col justify-center items-center py-8 px-4">
      <MainNavbar />
      <HeroSection />
      <OfferSection />
      <UrlFormMain />
      <PerformanceAnalytics />
      <ServicesSection />
    </div>
  );
}

export default Home;
