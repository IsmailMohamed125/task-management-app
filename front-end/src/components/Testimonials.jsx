const Testimonials = () => {
  const testimonialsData = [
    {
      name: "Jane Doe",
      role: "Product Manager",
      content:
        "This app has transformed how my team collaborates. Highly recommended!",
      image: "https://avatar.iran.liara.run/public/57",
    },
    {
      name: "John Smith",
      role: "Freelancer",
      content: "I love how easy it is to keep track of my tasks and deadlines!",
      image: "https://avatar.iran.liara.run/public/40",
    },
    {
      name: "Sarah Lee",
      role: "Startup Founder",
      content:
        "The intuitive interface and powerful features help us move fast.",
      image: "https://avatar.iran.liara.run/public/62",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-16 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4 border-2 border-indigo-100"
                />
                <div>
                  <h3 className="font-bold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-indigo-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
