/* A small original canvas point cloud. No WebGL or third-party dependencies. */
window.startSiteMotion = function(config) {
  const canvas=document.querySelector('.molecule-canvas');
  const hero=document.querySelector('.hero-art');
  let raf=0,visible=true,angle=0,last=0,size=0,dpr=1;
  const points=[];
  const ctx=canvas?.getContext('2d');
  for(let i=0;i<1250;i++) {
    const y=1-2*(i+.5)/1250;
    const a=i*Math.PI*(3-Math.sqrt(5));
    const r=Math.sqrt(1-y*y);
    const bump=1+.055*Math.sin(a*3)*Math.sin(y*8);
    points.push([Math.cos(a)*r*bump,y*bump,Math.sin(a)*r*bump]);
  }
  function resize(){if(!canvas)return;size=Math.min(canvas.clientWidth,canvas.clientHeight);dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(size*dpr);canvas.height=Math.round(size*dpr);}
  function draw(now){
    raf=requestAnimationFrame(draw);
    if(now-last<40 || document.hidden || !visible || !ctx || !size)return;
    const paused=document.documentElement.classList.contains('motion-off');
    if(!paused)angle+=.003;
    last=now;
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,size,size);
    const radius=size*.34,co=Math.cos(angle),si=Math.sin(angle);
    const hue=Number(config.theme.imageHue)||0;
    const transformed=points.map(([x,y,z])=>[x*co+z*si,y,z*co-x*si]).sort((a,b)=>a[2]-b[2]);
    for(const [x,y,z] of transformed){
      const persp=2.9/(2.9-z*.3),xx=size/2+x*radius*persp,yy=size/2+y*radius*persp;
      const dot=size*.006*(1.1+z*.3);
      ctx.globalAlpha=.23+(z+1)*.27;
      ctx.fillStyle=`hsl(${168+hue} 38% ${57+(1-z)*13}%)`;
      ctx.fillRect(xx,yy,dot,dot);
    }
    ctx.globalAlpha=1;
  }
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});
  if(canvas){resize();observer.observe(canvas);raf=requestAnimationFrame(draw);}
  const ro=canvas ? new ResizeObserver(resize):null;if(canvas)ro.observe(canvas);
  const move=e=>{if(!hero||document.documentElement.classList.contains('motion-off'))return;hero.style.setProperty('--pointer-x',`${(e.clientX/innerWidth-.5)*8}px`);hero.style.setProperty('--pointer-y',`${(e.clientY/innerHeight-.5)*5}px`);};
  if(matchMedia('(pointer:fine)').matches)document.querySelector('.hero')?.addEventListener('pointermove',move);
  return ()=>{cancelAnimationFrame(raf);observer.disconnect();ro?.disconnect();document.querySelector('.hero')?.removeEventListener('pointermove',move);};
};
