const DashboardPreview = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          Powerful Dashboard
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Visualize your tasks in a Kanban board and drag them across statuses
          with ease.
        </p>
        <div className="relative">
          <img
            src="/Kanban.png"
            alt="Kanban Board"
            className="mx-auto rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
          />
          <div className="absolute inset-0 bg-indigo-500 mix-blend-multiply opacity-5 rounded-xl"></div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
