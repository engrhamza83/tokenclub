import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta name="application-name" content="TokenClub" />
        <meta name="author" content="TokenClub" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="TokenClub" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-navbutton-color" content="#000000" />
        
        {/* Google Analytics - Load early in head */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YQPF87DGYM"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YQPF87DGYM', {
                page_path: window.location.pathname,
                page_title: document.title,
              });
            `,
          }}
        />
        
        {/* Google tag (gtag.js) - Google Ads Conversion Tracking */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17890958992"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-17890958992');
            `,
          }}
        />
        
        {/* Critical: Initialize util polyfill FIRST, before ANY modules load */}
        <script
          id="util-polyfill-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                'use strict';
                try{
                  if(typeof globalThis==='undefined'){var globalThis=window||global||self||{};}
                  if(typeof global==='undefined'){var global=globalThis;}
                  if(typeof process==='undefined'){var process={env:{},browser:true,version:'',versions:{}};}
                  
                  // Create util polyfill IMMEDIATELY
                  var utilPolyfill={
                    inspect:function(obj,options){
                      try{return JSON.stringify(obj,null,2);}catch(e){return String(obj);}
                    },
                    format:function(){
                      try{
                        const args=Array.prototype.slice.call(arguments);
                        const first=args.shift();
                        if(typeof first!=='string'){return args.join(' ');}
                        let i=0;
                        return String(first).replace(/%[sdj%]/g,function(x){
                          if(x==='%%')return '%';
                          if(i>=args.length)return x;
                          const arg=args[i++];
                          switch(x){
                            case '%s': return String(arg);
                            case '%d': return String(Number(arg));
                            case '%j': try{return JSON.stringify(arg);}catch(e){return '[Circular]';}
                            default: return String(x);
                          }
                        }) + args.slice(i).join(' ');
                      }catch(e){return '';}
                    }
                  };
                  
                  // Assign to ALL locations IMMEDIATELY
                  globalThis.util=utilPolyfill;
                  global.util=utilPolyfill;
                  window.util=utilPolyfill;
                  self.util=utilPolyfill;
                  
                  // Make require('util') work
                  if(typeof globalThis.require==='undefined'){
                    globalThis.require=function(module){
                      if(module==='util'){return utilPolyfill;}
                      throw new Error('Cannot find module: '+module);
                    };
                  }
                  
                  // Initialize Error.codes
                  if(typeof Error!=='undefined'&&!Error.codes){Error.codes={};}
                  ['TypeError','ReferenceError','SyntaxError','RangeError','EvalError','URIError'].forEach(function(errorName){
                    try{
                      if(typeof globalThis[errorName]!=='undefined'&&globalThis[errorName]&&!globalThis[errorName].codes){
                        globalThis[errorName].codes={};
                      }
                    }catch(e){}
                  });
                  if(typeof globalThis!=='undefined'&&!globalThis.codes){globalThis.codes={};}
                  if(typeof globalThis!=='undefined'&&!globalThis.statusCodes){globalThis.statusCodes={};}
                  if(typeof globalThis!=='undefined'&&!globalThis.http){globalThis.http={};}
                  if(typeof globalThis.http!=='undefined'&&!globalThis.http.STATUS_CODES){globalThis.http.STATUS_CODES={};}
                }catch(e){
                  console.error('[init] Failed to initialize polyfills:',e);
                }
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

