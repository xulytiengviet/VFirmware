(() => {
  "use strict";
  const tabs=[...document.querySelectorAll('[role="tab"]')];
  tabs.forEach((tab,idx)=>{
    tab.addEventListener('click',()=>activate(idx));
    tab.addEventListener('keydown',e=>{
      if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;
      e.preventDefault();const next=(idx+(e.key==="ArrowRight"?1:tabs.length-1))%tabs.length;activate(next);tabs[next].focus();
    });
  });
  function activate(i){
    tabs.forEach((t,k)=>{
      const on=i===k;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;
      const panel=document.getElementById(t.getAttribute('aria-controls'));
      if(panel)panel.hidden=!on;
    });
  }
  document.querySelectorAll('pre[data-copy]').forEach(pre=>{
    const btn=document.createElement('button');btn.type='button';btn.className='copy-btn';btn.textContent='Sao chép';btn.setAttribute('aria-label','Sao chép lệnh');
    btn.addEventListener('click',async()=>{
      const content=pre.querySelector('code')?.textContent||'';
      try {await navigator.clipboard.writeText(content);btn.textContent='Đã chép';}
      catch {btn.textContent='Chọn mã để sao chép';}
      setTimeout(()=>btn.textContent='Sao chép',1800);
    });pre.appendChild(btn);
  });
})();