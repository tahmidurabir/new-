/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import Navbar from './components/layout/Navbar';
import SimpleBackground from './components/layout/SimpleBackground';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabase';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/auth" />;
  return <>{children}</>;
}

export default function App() {
  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data } = await supabase.from('site_content').select('*').eq('section', 'analytics').single();
      if (data?.content) {
        const { ga4Id, googleSearchConsole, microsoftClarity, metaPixel, tiktokPixel, hotjar, customHeadScripts } = data.content;
        
        // Add custom head scripts
        if (customHeadScripts) {
          const scriptEl = document.createElement('div');
          // Use a proper parser instead of innerHTML if possible, or just copy textContent
          scriptEl.innerHTML = customHeadScripts;
          Array.from(scriptEl.childNodes).forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node as Element;
              if (el.tagName === 'SCRIPT') {
                const newScript = document.createElement('script');
                if (el.textContent) {
                  newScript.textContent = el.textContent;
                }
                Array.from(el.attributes).forEach(attr => {
                  newScript.setAttribute(attr.name, attr.value);
                });
                document.head.appendChild(newScript);
              } else {
                document.head.appendChild(el.cloneNode(true));
              }
            }
          });
        }

        // Add GA4
        if (ga4Id) {
          const gtagScript = document.createElement('script');
          gtagScript.async = true;
          gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
          document.head.appendChild(gtagScript);

          const gtagInit = document.createElement('script');
          gtagInit.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga4Id}');
          `;
          document.head.appendChild(gtagInit);
        }

        // Google Search Console 
        if (googleSearchConsole) {
          const meta = document.createElement('meta');
          meta.name = 'google-site-verification';
          meta.content = googleSearchConsole;
          document.head.appendChild(meta);
        }

        // Microsoft Clarity
        if (microsoftClarity) {
          const clarityScript = document.createElement('script');
          clarityScript.innerHTML = `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${microsoftClarity}");
          `;
          document.head.appendChild(clarityScript);
        }

        // Hotjar
        if (hotjar) {
          const hotjarScript = document.createElement('script');
          hotjarScript.innerHTML = `
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${hotjar},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `;
          document.head.appendChild(hotjarScript);
        }

        // Meta Pixel
        if (metaPixel) {
          const fbScript = document.createElement('script');
          fbScript.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixel}');
            fbq('track', 'PageView');
          `;
          document.head.appendChild(fbScript);
        }

        // TikTok Pixel
        if (tiktokPixel) {
          const ttScript = document.createElement('script');
          ttScript.innerHTML = `
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${tiktokPixel}');
              ttq.page();
            }(window, document, 'ttq');
          `;
          document.head.appendChild(ttScript);
        }
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <AuthProvider>
      <SimpleBackground />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Navbar /><LandingPage /></>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/abir/*" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
