import MainNavbar from "./navbar/MainNavbar";
import PerformanceAnalytics from "./sections/PerformanceAnalytics";
import ServicesSection from "./sections/ServicesSection";
import HeroSection from "./HeroSection/HeroSection";
import OfferSection from "../offer/OfferSection";
import UrlFormMain from "./form/urlFormMain/UrlFormMain";

function Home() {
  return (
    <div className="min-h-screen  flex flex-col justify-center items-center py-8 px-4">
      <MainNavbar />
      <HeroSection />
      <OfferSection />
      {/* <URLShortenerForm /> */}
      <UrlFormMain />
      <PerformanceAnalytics />
      {/* <Pricing /> */}
      <ServicesSection />
      {/* <TestimonialCarousel /> */}
    </div>
  );
}

export default Home;
