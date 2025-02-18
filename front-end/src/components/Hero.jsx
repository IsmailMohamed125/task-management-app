import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="bg-secondary py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Task Management App
          </h2>
          <p className="text-text-secondary mb-6">
            Simplify your workflow, collaborate with your team, and stay on top
            of deadlines with our intuitive task management solution.
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-primary text-secondary px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border border-text-secondary text-text-secondary px-6 py-3 rounded-md hover:border-primary hover:text-primary transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img
            src="/Dashboard.png"
            alt="App Dashboard Preview"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
