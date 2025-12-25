import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* HERO */}
      <section className="landing-hero">
        <div className="hero-overlay">
          <h1>🌿 Smart Irrigation & Farm Management</h1>
          <p>
            A unified web platform that helps farmers and organizations monitor
            farms, track sensors, analyze irrigation data, and make smarter
            decisions to boost productivity and save water.
          </p>

          <div className="landing-buttons">
            <button onClick={() => navigate("/login")} className="btn primary">
  Login
</button>
            <button onClick={() => navigate("/signup")} className="btn outline">
  Sign Up
</button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="landing-section light">
        <h2>🌾 About Our Platform</h2>
        <p>
          Our Smart Irrigation System is designed to bridge the gap between
          traditional farming and modern technology. By integrating farm data,
          sensor readings, and analytics into a single dashboard, we empower
          farmers to manage resources efficiently and grow crops sustainably.
        </p>
        <p>
          This platform acts as a digital control center for farms, helping users
          visualize field conditions, monitor devices, and take data-driven
          actions — anytime, anywhere.
        </p>
      </section>

      {/* FEATURES */}
      <section className="landing-section">
        <h2>🚀 Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            📊 <strong>Farm Dashboard</strong>
            <p>
              Get a quick overview of total farms, active farms, crops, and system
              health from a single place.
            </p>
          </div>
          <div className="feature-card">
            📡 <strong>Sensor Monitoring</strong>
            <p>
              Track soil moisture, temperature, humidity, and water flow in
              real-time using connected IoT sensors.
            </p>
          </div>
          <div className="feature-card">
            💧 <strong>Irrigation Control</strong>
            <p>
              Analyze irrigation methods and optimize water usage to reduce
              wastage and improve crop yield.
            </p>
          </div>
          <div className="feature-card">
            📈 <strong>Analytics & Insights</strong>
            <p>
              Visualize trends and patterns to understand farm performance and
              make smarter decisions.
            </p>
          </div>
          <div className="feature-card">
            🧾 <strong>Reports</strong>
            <p>
              Generate downloadable reports for farm data, sensor history, and
              performance tracking.
            </p>
          </div>
          <div className="feature-card">
            ⚙ <strong>Centralized Management</strong>
            <p>
              Manage multiple farms and devices efficiently from one secure web
              interface.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="landing-section light">
        <h2>⚙ How It Works</h2>
        <ul className="goals">
          <li>📍 Register and add your farms with location & crop details.</li>
          <li>📡 Connect sensors to monitor field conditions in real-time.</li>
          <li>📊 View live data and summaries on your dashboard.</li>
          <li>📈 Analyze trends and performance using analytics tools.</li>
          <li>🧾 Export reports for records and decision making.</li>
        </ul>
      </section>

      {/* BENEFITS */}
      <section className="landing-section">
        <h2>🌟 Why Choose Us?</h2>
        <ul className="goals">
          <li>💧 Save water through optimized irrigation planning.</li>
          <li>🌱 Improve crop health and productivity.</li>
          <li>⏱ Reduce manual monitoring and field visits.</li>
          <li>📊 Make data-driven farming decisions.</li>
          <li>🌍 Promote sustainable and eco-friendly agriculture.</li>
        </ul>
      </section>

      {/* FUTURE */}
      <section className="landing-section light">
        <h2>🔮 Our Future Goals</h2>
        <ul className="goals">
          <li>🤖 AI-powered irrigation recommendations.</li>
          <li>🌦 Weather-based smart automation.</li>
          <li>📱 Mobile app for farmers on the go.</li>
          <li>🛰 Advanced crop health monitoring.</li>
          <li>🔐 Role-based access for admins, managers, and farmers.</li>
          <li>🌐 Multi-language support for wider reach.</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="landing-section">
        <h2>🚀 Get Started with Smart Farming</h2>
        <p>
          Join us in transforming agriculture through technology. Start managing
          your farms smarter and build a more sustainable future today.
        </p>
        <div className="landing-buttons">
          <button onClick={() => navigate("/login")} className="btn primary">
  Get Started
</button>

        </div>
      </section>

      <footer className="landing-footer">
        <p>© 2025 Smart Irrigation System | Empowering Farmers with Technology 🌾</p>
      </footer>
    </div>
  );
}
