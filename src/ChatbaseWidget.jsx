import React, { useEffect } from 'react';

export default function ChatbaseWidget({ id = 'fY4wATu3QWQUaQvkI0OIa' }) {
  useEffect(() => {
    try {
      // Avoid adding multiple times
      if (document.getElementById(id)) return;

      // Create a script element that contains the initializer IIFE
      const inline = document.createElement('script');
      inline.id = id + '-init';
      inline.type = 'text/javascript';
      inline.text = `(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="${id}";script.dataset.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`;

      document.body.appendChild(inline);

      return () => {
        // Clean up initializer script only (don't remove the remote embed script automatically)
        const initEl = document.getElementById(inline.id);
        initEl?.parentNode?.removeChild(initEl);
      };
    } catch (err) {
      // fail silently
      console.error('ChatbaseWidget error:', err);
    }
  }, [id]);

  // The Chatbase embed script will render its own floating UI. We return null.
  return null;
}
