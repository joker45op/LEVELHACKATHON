import "./InfoCard.css";
import AstraImage from "../assets/c.png";

function SecondSection() {
  return (
    <div className="info-card">
      <div className="image-container">
        <img src={AstraImage} alt="TechGain" />
      </div>
      <div
        className="right-section"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
      >
        <h1 className="text-3xl mb-3">What We Offer</h1>
        <ul className="">
          <li>
            <strong>Personalized Kundali & Horoscope:</strong> Gain deep
            insights into your life’s journey. Your birth chart will reveal key
            aspects related to your career, relationships, personal growth, and
            more.
          </li>
          <li>
            <strong>AI-Powered Recommendations:</strong> Receive personalized
            gemstone suggestions, Pooja (rituals) practices, and essential Do’s
            and Don’ts based on your unique astrological profile.
          </li>
          <li>
            <strong>Spiritual Content for Every Need:</strong> From guided
            meditations and wellness practices to sleep rituals, our platform
            tailors spiritual content to your needs.
          </li>
          <li>
            <strong>Interactive Spiritual Chatbot:</strong> Chat with our
            AI-driven bot for spiritual advice, detailed explanations of your
            horoscope, and quick answers to your questions.
          </li>
        </ul>
        <p>
          Embark on a transformative journey toward enlightenment and balance.
          Let the stars guide you today.
        </p>
      </div>
    </div>
  );
}

export default SecondSection;
