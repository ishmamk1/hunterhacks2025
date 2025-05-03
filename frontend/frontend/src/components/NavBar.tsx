import './NavBar.css';

export default function Navbar() {
  return (
    <main className="navbar-container">
      <header className="navbar-header">
        {/* Left: About Us and Home */}
        <div className="navbar-left">
        <a href = "/about"> <button className="about-us-button">About Us</button> </a>
        <a href="/chat" className="home-button">Chat</a>
        <a href="/events" className="home-button">Events</a>
        <a href="/" className="home-button">Home</a>
        </div>

        {/* Right: GitHub Icon Button */}
        <div className="navbar-right">
          <a href="https://github.com/ishmamk1/hunterhacks2025">
            <button className="github-button">
              <svg
                className="github-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </button>
          </a>
        </div>
      </header>
    </main>
  );
}
