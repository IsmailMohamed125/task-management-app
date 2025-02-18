import { Link } from "react-router-dom";

const Header = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-secondary shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">TaskMaster</h1>
        <nav className="space-x-4 hidden md:block">
          {["Home", "Features", "Testimonials"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-text-secondary hover:text-primary transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
        </nav>
        <Link
          to="/register"
          className="bg-primary text-secondary px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default Header;
