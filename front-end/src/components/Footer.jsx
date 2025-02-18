const Footer = () => {
  return (
    <footer className="bg-card border-t border-gray-700 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
        <p className="text-text-secondary">
          © {new Date().getFullYear()} TaskMaster. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
