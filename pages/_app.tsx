import React, { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { AppContext, ContextProvider } from "@/utils/AppContext"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../app/globals.css";

function App({ Component, pageProps }: AppProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <NextUIProvider>
      <ContextProvider>
        <AppContext.Provider value={{ isNavOpen }}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>VetMemos</title>
            <link rel="icon" href="/favicon.png" />
            <meta
              name="description"
              content="VetMemos - A platform for structured medical notes from your encounters, in seconds."
            />
            <meta
              name="keywords"
              content="vetmemos, medical notes, structured notes, healthcare, consultations"
            />
            <meta name="author" content="Your Name" />
            
            {/* Google Tag Manager */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){
                    w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                    j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                    f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-58377THJ');
                `
              }}
            />
          </Head>
          
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-58377THJ"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          
          <Component {...pageProps} />
          <ToastContainer />
        </AppContext.Provider>
      </ContextProvider>
    </NextUIProvider>
  );
}

export default App;
