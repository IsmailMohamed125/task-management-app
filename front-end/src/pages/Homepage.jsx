import DashboardPreview from "../components/DashboardPreview";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";

const Homepage = () => {
  return (
    <div className="font-sans text-center">
      <Header />
      <Hero />
      <Features />
      <DashboardPreview />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Homepage;
