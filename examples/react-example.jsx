// src/App.jsx - Create React App example
import React, { useState } from 'react';
import { AdSlot } from '@nlcyber/adslot';
import './App.css';

function App() {
  const [debugMode, setDebugMode] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>My React App with NLCyber Ads</h1>
        <p>Example integration of NLCyber AdSlot component</p>
        
        <div className="debug-controls">
          <label>
            <input 
              type="checkbox" 
              checked={debugMode}
              onChange={(e) => setDebugMode(e.target.checked)}
            />
            Enable Debug Mode
          </label>
        </div>
      </header>

      <main className="App-main">
        {/* Homepage top banner */}
        <section className="banner-section">
          <h2>Homepage Banner Ad</h2>
          <AdSlot 
            placement="homepage_top"
            className="homepage-banner"
            debug={debugMode}
            style={{ 
              margin: '20px auto',
              display: 'block'
            }}
          />
        </section>

        <div className="content-layout">
          <article className="main-article">
            <h2>Main Content</h2>
            <p>
              This is the main content area of your website. The NLCyber AdSlot 
              component can be placed anywhere within your React application.
            </p>

            {/* Mid-content ad */}
            <div className="mid-content-ad">
              <AdSlot 
                placement="homepage_top"
                width={728}
                height={90}
                debug={debugMode}
                showLabel={true}
                labelText="Sponsored Content"
              />
            </div>

            <p>
              The component automatically handles ad fetching, frequency capping, 
              and tracking. It's fully responsive and accessible.
            </p>

            <h3>Features</h3>
            <ul>
              <li>Smart ad selection with weighted rotation</li>
              <li>Frequency capping per user</li>
              <li>Secure JWT-based tracking</li>
              <li>Responsive design</li>
              <li>TypeScript support</li>
              <li>Debug mode for development</li>
            </ul>
          </article>

          <aside className="sidebar">
            <h3>Sidebar</h3>
            
            {/* Sidebar ads */}
            <div className="sidebar-ad">
              <h4>Sidebar Advertisement</h4>
              <AdSlot 
                placement="article_sidebar"
                debug={debugMode}
                className="sidebar-ad-slot"
              />
            </div>

            <div className="sidebar-content">
              <p>Additional sidebar content...</p>
            </div>

            <div className="sidebar-ad">
              <h4>Another Sidebar Ad</h4>
              <AdSlot 
                placement="article_sidebar"
                debug={debugMode}
                className="sidebar-ad-slot"
              />
            </div>
          </aside>
        </div>

        {/* Custom styled ad */}
        <section className="custom-ad-section">
          <h2>Custom Styled Ad</h2>
          <div className="custom-ad-container">
            <AdSlot 
              placement="homepage_top"
              width={300}
              height={250}
              debug={debugMode}
              className="custom-ad"
              style={{
                border: '2px solid #007bff',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,123,255,0.2)',
                transition: 'box-shadow 0.3s ease'
              }}
            />
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <div className="footer-ad">
          <AdSlot 
            placement="homepage_top"
            width={728}
            height={90}
            debug={debugMode}
            showLabel={true}
            labelText="Advertisement"
          />
        </div>
        <p>&copy; 2025 My React App. Powered by NLCyber AdSlot.</p>
      </footer>
    </div>
  );
}

export default App;
