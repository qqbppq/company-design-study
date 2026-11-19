(() => {
  'use strict';
  let draft=structuredClone(window.SITE_CONFIG);
  const frame=document.getElementById('preview-frame'),fields=document.getElementById('fields'),selector=document.getElementById('section-select');
  const names={name:'名前・社名',suffix:'社名の後ろの表記',short:'略称',logo:'ロゴ画像のパス（空欄で文字ロゴ）',title:'見出し・タイトル',description:'説明文',ink:'文字色',muted:'補足文字の色',paper:'白い部分の背景色',panel:'カードの背景色',mint:'背景の始まりの色',ice:'背景の終わりの色',accent:'アクセントカラー',dark:'フッターの背景色',imageHue:'画像の色相（0〜360）',eyebrow:'小見出し',button:'ボタンの文言',href:'リンク先',image:'画像ファイルのパス',imageAlt:'画像の説明',video:'背景動画のパス（未使用は空欄）',text:'本文',role:'肩書き',diptych:'2枚組の仮画像',position:'写真の位置（left / right）',firstLabel:'前半の小見出し',firstText:'前半の本文',secondLabel:'後半の小見出し',link:'リンクの文言',label:'表示する文字',date:'日付の表示',category:'カテゴリ',id:'記事ID（半角英数字・ハイフン）',email:'代表メールアドレス',pressEmail:'広報メールアドレス',partnerEmail:'パートナーメールアドレス',emptyContact:'メール未設定時の表示',copyright:'著作権欄の社名',enabled:'有効にする',expand:'ミッションを開くボタンの説明',lead:'導入文',reference:'参考サイトのURL',language:'言語（日本語は ja）'};
  const get=path=>path.split('.').reduce((v,k)=>v[k],draft);
  const set=(path,value)=>{const parts=path.split('.');const key=parts.pop();parts.reduce((v,k)=>v[k],draft)[key]=value;};
  let timer;
  function update(){clearTimeout(timer);timer=setTimeout(()=>frame.contentWindow.postMessage({type:'site-editor-preview',config:draft},location.protocol==='file:'?'*':location.origin),120);}
  function renderFields(){
    fields.replaceChildren();const root=selector.value;
    document.getElementById('preset-row').hidden=root!=='theme';
    const add=(value,path)=>{
      if(value!==null&&typeof value==='object'){
        if(path!==root){const h=document.createElement('h2');h.className='field-section';h.textContent=path.replace(root+'.','');fields.append(h);}
        Object.entries(value).forEach(([key,val])=>add(val,`${path}.${key}`));return;
      }
      const key=path.split('.').at(-1),label=document.createElement('label');label.className='edit-field';
      const title=document.createElement('span');title.className='field-label';title.textContent=names[key]||(/^[0-9]+$/.test(key)?`文章 ${Number(key)+1}`:key);
      const pathText=document.createElement('span');pathText.className='field-path';pathText.textContent=path;
      let input;
      if(typeof value==='string'&&(value.length>90||value.includes('\n'))){input=document.createElement('textarea');input.rows=Math.min(7,Math.max(3,Math.ceil(value.length/50)));input.value=value;}
      else{input=document.createElement('input');if(typeof value==='boolean'){input.type='checkbox';input.checked=value;}else if(typeof value==='number'){input.type='number';input.value=value;if(key==='imageHue'){input.min='0';input.max='360';}}else if(/^#[\da-f]{6}$/i.test(value)){input.type='color';input.value=value;}else{input.type='text';input.value=value??'';}}
      input.name=path;input.addEventListener('input',()=>{let v=input.type==='checkbox'?input.checked:input.type==='number'?Number(input.value):input.value;set(path,v);update();document.getElementById('status').textContent='プレビューを更新しました。変更を残すには設定ファイルを保存してください。';});
      label.append(title,pathText,input);fields.append(label);
    };add(get(root),root);
  }
  const presets={mint:{mint:'#e7fce6',ice:'#e5f5ff',accent:'#38b9a8',ink:'#252b28',dark:'#272b29',imageHue:0},rose:{mint:'#fce8ec',ice:'#f1e6fb',accent:'#b6597c',ink:'#35282e',dark:'#35272f',imageHue:145},blue:{mint:'#e5f0ff',ice:'#e9e8fc',accent:'#547fce',ink:'#273044',dark:'#222c41',imageHue:55},mono:{mint:'#eeeeee',ice:'#dce3e1',accent:'#5a6f67',ink:'#262b28',dark:'#242826',imageHue:0}};
  document.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>{Object.assign(draft.theme,presets[b.dataset.preset]);renderFields();update();}));
  selector.addEventListener('change',renderFields);
  frame.addEventListener('load',update);
  document.getElementById('preview-page').addEventListener('change',e=>{frame.src='./'+e.target.value;});
  document.getElementById('mobile-button').addEventListener('click',()=>{document.querySelector('.iframe-shell').classList.add('mobile');document.getElementById('mobile-button').setAttribute('aria-pressed','true');document.getElementById('desktop-button').setAttribute('aria-pressed','false');});
  document.getElementById('desktop-button').addEventListener('click',()=>{document.querySelector('.iframe-shell').classList.remove('mobile');document.getElementById('mobile-button').setAttribute('aria-pressed','false');document.getElementById('desktop-button').setAttribute('aria-pressed','true');});
  document.getElementById('export-button').addEventListener('click',()=>{
    const text='/* このファイルを同名の site.config.js に置き換えてください。 */\nwindow.SITE_CONFIG = '+JSON.stringify(draft,null,2)+';\n';
    const url=URL.createObjectURL(new Blob([text],{type:'text/javascript;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='site.config.js';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
    document.getElementById('status').textContent='設定ファイルのダウンロードを開始しました。公開中のサイトはまだ変更されていません。';
  });
  document.getElementById('import-button').addEventListener('click',()=>document.getElementById('import-file').click());
  document.getElementById('import-file').addEventListener('change',async e=>{
    const file=e.target.files[0];if(!file)return;
    try{let text=await file.text();const assignment=text.indexOf('window.SITE_CONFIG');if(assignment!==-1)text=text.slice(text.indexOf('=',assignment)+1).trim().replace(/;\s*$/,'');const value=JSON.parse(text);if(value.version!==1||!value.home||!value.brand||!value.theme||!value.footer)throw new Error();draft=value;renderFields();update();document.getElementById('status').textContent='設定を読み込みました。';}catch{document.getElementById('status').textContent='読み込めませんでした。この編集画面から保存した設定ファイルを選択してください。';}
    e.target.value='';
  });
  fields.addEventListener('submit',e=>e.preventDefault());renderFields();
})();
