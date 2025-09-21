// pages/index.tsx - Next.js example
import React from 'react';
import { AdSlot } from '@nlcyber/adslot';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>My Website with NLCyber Ads</title>
        <meta name="description" content="Example Next.js page with NLCyber ad integration" />
      </Head>

      <div className="container">
        <header className="header">
          <h1>Welcome to My Website</h1>
          <p>This page demonstrates NLCyber ad integration with Next.js</p>
        </header>

        {/* Homepage top banner ad */}
        <div className="ad-section">
          <AdSlot 
            placement="homepage_top"
            className="homepage-banner"
            style={{ margin: '20px 0' }}
          />
        </div>

        <main className="main-content">
          <div className="content-grid">
            <article className="article">
              <h2>Main Article</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              
              {/* Mid-content ad */}
              <div className="mid-content-ad">
                <AdSlot 
                  placement="homepage_top"
                  width={728}
                  height={90}
                  debug={process.env.NODE_ENV === 'development'}
                />
              </div>

              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </article>

            <aside className="sidebar">
              <h3>Sidebar</h3>
              
              {/* Sidebar ads */}
              <div className="sidebar-ad">
                <AdSlot 
                  placement="article_sidebar"
                  className="sidebar-ad-slot"
                />
              </div>

              <div className="sidebar-content">
                <p>Related content and additional sidebar ads...</p>
              </div>

              <div className="sidebar-ad">
                <AdSlot 
                  placement="article_sidebar"
                  className="sidebar-ad-slot"
                />
              </div>
            </aside>
          </div>
        </main>

        {/* Footer ad */}
        <footer className="footer">
          <div className="footer-ad">
            <AdSlot 
              placement="homepage_top"
              width={728}
              height={90}
              showLabel={true}
              labelText="Sponsored Content"
            />
          </div>
          <p>&copy; 2025 My Website. All rights reserved.</p>
        </footer>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .ad-section {
          text-align: center;
          margin: 20px 0;
        }

        .main-content {
          margin: 40px 0;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 30px;
        }

        .article {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 8px;
        }

        .mid-content-ad {
          text-align: center;
          margin: 30px 0;
        }

        .sidebar {
          background: #f0f0f0;
          padding: 20px;
          border-radius: 8px;
        }

        .sidebar-ad {
          margin: 20px 0;
          text-align: center;
        }

        .sidebar-content {
          margin: 20px 0;
        }

        .footer {
          margin-top: 60px;
          text-align: center;
          border-top: 1px solid #e0e0e0;
          padding-top: 20px;
        }

        .footer-ad {
          margin: 20px 0;
        }

        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          
          .sidebar {
            margin-top: 30px;
          }
        }

        .homepage-banner {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .sidebar-ad-slot {
          border: 1px solid #d0d0d0;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
}
