const SOURCE = `(function(){try{var s=localStorage.getItem('desk-mode');if(s==='reading')return;if(s!=='desk'){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;if(navigator.connection&&navigator.connection.saveData)return;if(/bot|crawl|spider|lighthouse|headless/i.test(navigator.userAgent))return}if(!document.createElement('canvas').getContext('webgl2'))return;document.documentElement.dataset.desk='pending'}catch(e){}})()`;

export function DeskBootScript() {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: SOURCE }}
    />
  );
}
