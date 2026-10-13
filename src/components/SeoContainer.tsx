import React from 'react';
import Head from 'next/head';

export interface SeoFeature {
  title: string;
  description: string;
}

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface SeoContainerProps {
  title: string;
  description: string;
  canonicalPath: string;
  h1: string;
  leadText: string;
  features?: SeoFeature[];
  faqs?: SeoFaq[];
  children?: React.ReactNode;
}

export const SeoContainer: React.FC<SeoContainerProps> = ({
  title,
  description,
  canonicalPath,
  h1,
  leadText,
  features = [],
  faqs = [],
  children,
}) => {
  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  const canonicalUrl = `https://tokenclub.fun${cleanPath === '/' ? '' : cleanPath}`;
  const ogImageUrl = 'https://tokenclub.fun/og-image.png';

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://tokenclub.fun/#organization',
        name: 'Token Club',
        alternateName: ['TokenClub', 'TokenClub Official', 'Token Club Solana'],
        url: 'https://tokenclub.fun/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://tokenclub.fun/apple-touch-icon.png',
          width: 180,
          height: 180,
        },
        sameAs: ['https://t.me/tokenlab00'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://tokenclub.fun/#website',
        url: 'https://tokenclub.fun/',
        name: 'Token Club',
        publisher: { '@id': 'https://tokenclub.fun/#organization' },
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebApplication',
        '@id': `${canonicalUrl}#webapp`,
        name: title,
        url: canonicalUrl,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Solana Blockchain',
        browserRequirements: 'Requires modern browser and Solana wallet extension',
        offers: {
          '@type': 'Offer',
          price: '0.1',
          priceCurrency: 'SOL',
          availability: 'https://schema.org/InStock',
        },
      },
      ...(faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${canonicalUrl}#faq`,
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.answer,
                },
              })),
            },
          ]
        : []),
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Token Club',
            item: 'https://tokenclub.fun/',
          },
          ...(cleanPath !== '/'
            ? [
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: h1,
                  item: canonicalUrl,
                },
              ]
            : []),
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Token Club (Official)" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </Head>

      {/* Main Interactive dApp */}
      {children}

      {/* Server-Rendered Semantic SEO & AEO Content */}
      <article
        className="tc-seo-static-section"
        aria-labelledby="tc-seo-main-heading"
        style={{
          position: 'relative',
          zIndex: 1,
          background: '#030305',
          color: '#c8cbd4',
          borderTop: '1px solid #1b1c22',
          padding: '64px 24px 56px',
          fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <div
            style={{
              color: '#26e6ce',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            Token Club on Solana (tokenclub.fun)
          </div>

          <h1
            id="tc-seo-main-heading"
            style={{
              color: '#f8f8fa',
              fontSize: 'clamp(28px, 4.5vw, 48px)',
              lineHeight: 1.15,
              fontWeight: 800,
              margin: '8px 0 16px',
              maxWidth: '850px',
            }}
          >
            {h1}
          </h1>

          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.75,
              color: '#aeb3c2',
              maxWidth: '850px',
              margin: '0 0 32px',
            }}
          >
            {leadText}
          </p>

          {/* Canonical Internal Navigation */}
          <nav
            aria-label="Token Club Platform Tools"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '44px',
            }}
          >
            {[
              { href: '/', label: 'Token Creator' },
              { href: '/swap', label: 'Swap' },
              { href: '/liquidity', label: 'Liquidity Manager' },
              { href: '/security', label: 'Security & Burn' },
              { href: '/portfolio', label: 'Portfolio' },
              { href: '/copy-trend', label: 'Copy Trend' },
              { href: '/more', label: 'More Tools' },
              { href: '/comparison', label: 'Competitor Comparison' },
              { href: '/tutorial', label: 'Video Guides' },
              { href: '/about', label: 'About Official' },
              { href: '/privacy', label: 'Privacy Policy' },
              { href: '/terms', label: 'Terms of Service' },
            ].map((navItem) => (
              <a
                key={navItem.href}
                href={navItem.href}
                style={{
                  color: cleanPath === navItem.href ? '#26e6ce' : '#e8e9ee',
                  textDecoration: 'none',
                  border: cleanPath === navItem.href ? '1px solid #26e6ce' : '1px solid #292b33',
                  borderRadius: '999px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  background: '#0b0c10',
                  transition: 'all 0.2s ease',
                }}
              >
                {navItem.label}
              </a>
            ))}
          </nav>

          {/* Feature Grid */}
          {features.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '18px',
                marginBottom: '36px',
              }}
            >
              {features.map((feat, idx) => (
                <section
                  key={idx}
                  style={{
                    background: '#090a0e',
                    border: '1px solid #1e2027',
                    borderRadius: '16px',
                    padding: '24px',
                  }}
                >
                  <h2
                    style={{
                      color: '#f2f3f6',
                      fontSize: '19px',
                      fontWeight: 700,
                      lineHeight: 1.3,
                      margin: '0 0 10px',
                    }}
                  >
                    {feat.title}
                  </h2>
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.7,
                      color: '#9ca3af',
                      margin: 0,
                    }}
                  >
                    {feat.description}
                  </p>
                </section>
              ))}
            </div>
          )}

          {/* FAQ Accordions */}
          {faqs.length > 0 && (
            <section
              style={{
                background: '#090a0e',
                border: '1px solid #1e2027',
                borderRadius: '16px',
                padding: '28px',
                marginBottom: '28px',
              }}
            >
              <h2
                style={{
                  color: '#f2f3f6',
                  fontSize: '24px',
                  fontWeight: 700,
                  margin: '0 0 16px',
                }}
              >
                Frequently Asked Questions
              </h2>
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  style={{
                    borderTop: idx > 0 ? '1px solid #24262e' : 'none',
                    padding: '16px 0',
                  }}
                >
                  <summary
                    style={{
                      cursor: 'pointer',
                      color: '#f0f1f4',
                      fontWeight: 600,
                      fontSize: '15px',
                    }}
                  >
                    {faq.question}
                  </summary>
                  <p
                    style={{
                      marginTop: '10px',
                      fontSize: '14px',
                      lineHeight: 1.7,
                      color: '#aeb3c2',
                      maxWidth: '850px',
                    }}
                  >
                    {faq.answer}
                  </p>
                </details>
              ))}
            </section>
          )}

          {/* Official Footnote & Brand Defense */}
          <div
            style={{
              marginTop: '28px',
              fontSize: '13px',
              color: '#6b7280',
              borderTop: '1px solid #181920',
              paddingTop: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <span>
              Transactions on Solana are irreversible. The only official Token Club platform is hosted at{' '}
              <a href="https://tokenclub.fun" style={{ color: '#26e6ce', textDecoration: 'none', fontWeight: 600 }}>
                tokenclub.fun
              </a>
              . Beware of unauthorized clone websites and third-party mirrors.
            </span>
            <span>
              Official Support: <a href="https://t.me/tokenlab00" style={{ color: '#26e6ce', textDecoration: 'none' }}>Telegram @tokenlab00</a>
            </span>
          </div>
        </div>
      </article>
    </>
  );
};
