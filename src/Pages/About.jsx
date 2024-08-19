import React, { useState } from "react";
import "../index.css";

const About = () => {
  // State for toggling content visibility
  const [showMoreTechnologies, setShowMoreTechnologies] = useState(false);

  return (
    <div className="container lead fs-3 mt-5">
      {/* Introduction Section */}
      <section className="mb-5 text-center">
        <h1>About WildLens Tours</h1>
        <p>Bringing the beauty of the world to your lens.</p>
      </section>

      {/* Our Story Section */}
      <section className="mb-5">
        <h2>Our Story</h2>
        <p>
          WildLens Tours was founded with the vision of offering travelers
          unique and unforgettable experiences that go beyond the ordinary. From
          our humble beginnings, we've grown into a company known for our
          attention to detail and commitment to customer satisfaction.
        </p>
      </section>

      {/* Our Services Section */}
      <section className="mb-5">
        <h2>Our Services</h2>
        <ul>
          <li>
            Diverse Tour Packages: Adventure, culture, wildlife, and
            photography.
          </li>
          <li>
            Customized Experiences: Tailored tours to match your preferences.
          </li>
          <li>
            Expert Tour Guides: Knowledgeable and passionate guides to lead your
            journey.
          </li>
        </ul>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="mb-5">
        <h2>What Sets Us Apart</h2>
        <p>
          At WildLens Tours, we pride ourselves on offering unique experiences
          that showcase the world's beauty. Our commitment to sustainable
          tourism and supporting local communities ensures that our tours are
          not only memorable but also responsible.
        </p>
      </section>

      {/* Testimonials and Reviews Section */}
      <section className="mb-5">
        <h2>Testimonials</h2>
        <blockquote>
          "WildLens Tours gave us the experience of a lifetime. The guides were
          knowledgeable, and the itinerary was perfect!" - Jane Doe
        </blockquote>
        <blockquote>
          "I've never been on a tour like this before. The destinations were
          breathtaking and the service was top-notch." - John Smith
        </blockquote>
      </section>

      {/* Meet the Team Section */}
      <section className="mb-5">
        <h2>Meet the Team</h2>
        <p>
          Our team is made up of experienced professionals who are passionate
          about travel and dedicated to providing the best possible experience
          for our clients.
        </p>
      </section>

      {/* Future Plans Section */}
      <section className="mb-5">
        <h2>Future Plans</h2>
        <p>
          We're constantly exploring new destinations and crafting new
          experiences. Stay tuned for our upcoming tours and events!
        </p>
      </section>

      {/* Technologies Section */}
      <div className="container mt-5">
        <button
          onClick={() => setShowMoreTechnologies(!showMoreTechnologies)}
          className="btn border-0 mb-4"
        >
          {showMoreTechnologies ? "Show Less" : "Show More"}
        </button>

        {showMoreTechnologies && (
          <div>
            {/* Frontend Technologies */}
            <div className="p-4 rounded shadow-sm mb-5">
              <h2 className="mb-4">Frontend Technologies</h2>
              <h4>Framework:</h4>
              <p>
                <strong>React:</strong> A JavaScript library for building user
                interfaces.
              </p>
              <h5>Libraries (by purpose):</h5>
              <h6>State Management:</h6>
              <ul>
                <li>
                  <strong>React-Redux:</strong> Official React bindings for
                  Redux, a predictable state container for JavaScript apps.
                </li>
                <li>
                  <strong>Redux-Persist:</strong> A library to persist and
                  rehydrate a Redux store.
                </li>
              </ul>
              <h6>Routing:</h6>
              <ul>
                <li>
                  <strong>React-Router-Dom:</strong> A collection of
                  navigational components that compose declaratively with your
                  application.
                </li>
              </ul>
              <h6>HTTP Client:</h6>
              <ul>
                <li>
                  <strong>Axios:</strong> A promise-based HTTP client for making
                  requests to servers.
                </li>
              </ul>
              <h6>UI Components:</h6>
              <ul>
                <li>
                  <strong>React-Bootstrap:</strong> Bootstrap components built
                  with React.
                </li>
                <li>
                  <strong>React-Icon:</strong> Popular icons as React
                  components.
                </li>
              </ul>
              <h6>Firebase Integration:</h6>
              <ul>
                <li>
                  <strong>Firebase:</strong> A platform developed by Google for
                  creating mobile and web applications.
                </li>
              </ul>
              <h6>Progress Indicator:</h6>
              <ul>
                <li>
                  <strong>React-Circular-Progressbar:</strong> A React component
                  to create circular progress bars.
                </li>
              </ul>
              <h6>Notifications:</h6>
              <ul>
                <li>
                  <strong>React-Toastify:</strong> A library to create
                  notifications (toasts) in React apps.
                </li>
              </ul>
              <h6>Rendering:</h6>
              <ul>
                <li>
                  <strong>React-DOM:</strong> A package that provides
                  DOM-specific methods that can be used at the top level of your
                  app.
                </li>
              </ul>
            </div>

            {/* Backend Technologies */}
            <div className="p-4 rounded shadow-sm">
              <h2 className="mb-4">Backend Technologies</h2>
              <h4>Framework:</h4>
              <p>
                <strong>Express:</strong> A fast, unopinionated, minimalist web
                framework for Node.js.
              </p>
              <h5>Libraries (by purpose):</h5>
              <h6>Authentication &amp; Security:</h6>
              <ul>
                <li>
                  <strong>Bcryptjs:</strong> A library to hash and compare
                  passwords for secure storage.
                </li>
                <li>
                  <strong>Jsonwebtoken:</strong> A library to sign, verify, and
                  decode JSON Web Tokens (JWT) for authentication.
                </li>
              </ul>
              <h6>Database:</h6>
              <ul>
                <li>
                  <strong>Mongoose:</strong> An ODM (Object Data Modeling)
                  library for MongoDB and Node.js, providing a schema-based
                  solution to model your application data.
                </li>
              </ul>
              <h6>Environment Configuration:</h6>
              <ul>
                <li>
                  <strong>Dotenv:</strong> A module that loads environment
                  variables from a .env file into process.env.
                </li>
              </ul>
              <h6>Email Handling:</h6>
              <ul>
                <li>
                  <strong>Nodemailer:</strong> A module to send emails from
                  Node.js applications.
                </li>
              </ul>
              <h6>Development Tools:</h6>
              <ul>
                <li>
                  <strong>Nodemon:</strong> A utility that monitors for any
                  changes in your source code and automatically restarts your
                  server, making development faster and easier.
                </li>
              </ul>
              <h6>Middleware:</h6>
              <ul>
                <li>
                  <strong>Cors:</strong> A package for enabling Cross-Origin
                  Resource Sharing (CORS) in your Express applications.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <section className="text-center mt-5">
        <h2>Join Us</h2>
        <p>
          Ready to explore the world with WildLens Tours? Check out our tour
          packages and start planning your next adventure.
        </p>
        <a href="/tours" className="btn border-0">
          Explore Our Tours
        </a>
      </section>
    </div>
  );
};

export default About;
