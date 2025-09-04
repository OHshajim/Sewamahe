
const Hero = () => {
  return (
      <section className="min-w-full">
          <img
              alt="hero section banner"
              src="/banner7.jpg"
              loading="lazy"
              className="w-full"
          />
          <div className="max-w-4xl mx-auto py-6 px-4 text-sm md:text-xl text-justify">
              <h1 className="text-4xl md:text-5xl font-bold  mt-8">
                  About Sawamahe
              </h1>
              <p className="mt-4">
                  Sawamahe is a cutting-edge platform designed to seamlessly
                  connect users with experts through secure, high-quality video
                  calls. Our mission is to make expert advice accessible to
                  everyone, offering transparent and rewarding experiences for
                  both users and consultants. Whether you`'`re seeking quick
                  guidance or in-depth consultation, Sawamahe ensures a smooth,
                  reliable, and efficient process with instant balance top-ups,
                  flexible payment options, and real-time communication.
              </p>
              <p className="mt-4">
                  We prioritize security and professionalism, providing a
                  trusted space for consultants to showcase their expertise, set
                  competitive rates, and receive prompt payments through secure
                  gateways. For users, our platform simplifies the journey of
                  finding the right expert, ensuring you get the help you need
                  when you need it. At Sawamahe, we believe that expert
                  knowledge should be just a click away, empowering individuals
                  and businesses to thrive with confidence.
              </p>
          </div>
      </section>
  );
};

export default Hero;