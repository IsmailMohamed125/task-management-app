const Features = () => {
  const featuresData = [
    {
      title: "Task Organization",
      description: "Keep tasks organized with custom categories and filters.",
      icon: "📋",
    },
    {
      title: "Collaboration Tools",
      description:
        "Assign tasks and share progress with your team in real time.",
      icon: "🤝",
    },
    {
      title: "Deadline Tracking",
      description: "Set due dates and never miss an important deadline again.",
      icon: "⏰",
    },
    {
      title: "Customizable Workflows",
      description: "Create custom boards and statuses that fit your process.",
      icon: "⚙️",
    },
  ];

  return (
    <section id="features" className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, idx) => (
            <div
              key={idx}
              className="text-center p-6 bg-card rounded-lg border border-gray-700 hover:border-primary transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
