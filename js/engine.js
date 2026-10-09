/* TextTools — offline processing engine. All functions run locally in the browser. */
const STOP=new Set("the,a,an,and,or,of,to,in,on,for,with,is,are,was,were,be,been,it,this,that,these,those,as,at,by,from,up,about,into,over,after,before,you,we,they,he,she,i".split(","));
const SYN={good:"excellent",big:"huge",small:"tiny",fast:"rapid",important:"crucial",happy:"joyful",love:"adore",use:"utilize",make:"create",help:"assist",show:"demonstrate",beautiful:"gorgeous",smart:"intelligent",idea:"concept",text:"content",tool:"utility",program:"application"};
const FLIP={a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ƃ",h:"ɥ",i:"ᴉ",j:"ɾ",k:"ʞ",l:"l",m:"ɯ",n:"u",o:"o",p:"d",q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",y:"ʎ",z:"z",A:"∀",E:"Ǝ",H:"H",M:"W",T:"⊥","?":"¿","!":"¡","(":")",")":"(",".":"˙"," ":" "};

const Engine={
opts(slug){
switch(slug){
case "find-replace":return `<label>Find <input id="o1" value="word"></label><label>Replace with <input id="o2" value="replacement"></label><label><input type="checkbox" id="o3"> Case sensitive</label><label><input type="checkbox" id="o4"> Regex</label>`;
case "word-wrap":return `<label>Max length <input id="o1" type="number" value="80" style="width:80px"></label>`;
case "text-case":return `<label>Style <select id="o1"><option value="upper">UPPER</option><option value="lower">lower</option><option value="title">Title Case</option><option value="sentence">Sentence case</option><option value="camel">camelCase</option><option value="snake">snake_case</option><option value="kebab">kebab-case</option><option value="alt">aLtErNaTiNg</option><option value="inv">iNVERSE</option></select></label>`;
case "sort-lines":return `<label><select id="o1"><option value="asc">Ascending A-Z</option><option value="desc">Descending</option><option value="rev">Reverse order</option><option value="rand">Random</option><option value="len">By length</option></select></label>`;
case "line-numbers":return `<label><select id="o1"><option value="n">1. 2. 3.</option><option value="a">a. b. c.</option><option value="r">I. II. III.</option></select></label><label>Separator <input id="o2" value=". " style="width:60px"></label>`;
case "prefix-suffix":return `<label>Before <input id="o1" value="&quot;"></label><label>After <input id="o2" value="&quot;"></label>`;
case "add-line-breaks":return `<label>Delimiter <input id="o1" value=","></label>`;
case "remove-line-breaks":return `<label>Separator <input id="o1" value=" "></label>`;
case "justify-text":case "center-text":return `<label>Width <input id="o1" type="number" value="60" style="width:70px"></label>${slug==="center-text"?`<label>Char <input id="o2" value=" " style="width:50px"></label>`:""}`;
case "pad-text":return `<label><select id="o1"><option value="l">Left</option><option value="r">Right</option></select></label><label>Length <input id="o2" type="number" value="30" style="width:70px"></label><label>Char <input id="o3" value=" " style="width:50px"></label>`;
case "dedup-lines":return `<label><input type="checkbox" id="o1"> Trim before compare</label>`;
case "remove-unwanted":return `<label>Strip pattern (regex) <input id="o1" value="[^A-Za-z0-9\\s.,!?:-]" style="width:220px"></label>`;
case "conditional-remove":return `<label>Word <input id="o1" value="error"></label><label><select id="o2"><option value="del">Delete lines containing it</option><option value="keep">Keep only lines containing it</option></select></label>`;
case "swap-columns":return `<label>Delimiter <input id="o1" value="," style="width:50px"></label><label>Col 1 <input id="o2" type="number" value="1" style="width:55px"></label><label>Col 2 <input id="o3" type="number" value="2" style="width:55px"></label>`;
case "extract-column":return `<label>Delimiter <input id="o1" value="," style="width:50px"></label><label>Column <input id="o2" type="number" value="1" style="width:55px"></label>`;
case "split-columns":return `<label>Delimiter <input id="o1" value="," style="width:50px"></label>`;
case "spaces-to-tabs":case "tabs-to-spaces":return `<label>N <input id="o1" type="number" value="4" style="width:60px"></label>`;
case "text-repeater":return `<label>Times <input id="o1" type="number" value="5" style="width:70px"></label><label>Separator <input id="o2" value="\\n"></label>`;
case "insert-symbol":return `<label>Symbol <input id="o1" value="★" style="width:50px"></label>`;
case "normalize-numbers":return `<label><select id="o1"><option value="lat">To Latin 123</option><option value="ar">To Arabic ٠١٢٣</option><option value="fa">To Persian ۰۱۲۳</option></select></label>`;
case "translator":return `<label>Direction <select id="o1"><option value="en-ar">English to Arabic</option><option value="ar-en">Arabic to English</option><option value="fr-en">French to English</option></select></label>`;
case "summarizer":return `<label>Sentences <input id="o1" type="number" value="3" style="width:60px"></label>`;
case "keywords":case "hashtags":return `<label>Count <input id="o1" type="number" value="10" style="width:60px"></label>`;
case "email-generator":return `<label>Type <select id="o1"><option>Formal</option><option>Apology</option><option>Request</option><option>Thanks</option><option>Marketing</option></select></label>`;
default:return "";
}
},
run(slug,t,o){
o=o||{};
const g=k=>o[k];
switch(slug){
case "word-counter":{const w=(t.trim().match(/\S+/g)||[]).length;return `Words: ${w}\nCharacters: ${t.length}\nWithout spaces: ${t.replace(/\s/g,"").length}\nLines: ${t?t.split("\n").length:0}\nParagraphs: ${t.split(/\n\s*\n/).filter(x=>x.trim()).length}`;}
case "word-frequency":{const m={};(t.toLowerCase().match(/[\p{L}\p{N}']+/gu)||[]).forEach(w=>m[w]=(m[w]||0)+1);return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,100).map(([w,c])=>`${w}: ${c}`).join("\n")||"No words";}
case "find-replace":{const f=g("o1"),r=g("o2");if(!f)return "Type a search word.";if(o.o4)return t.replace(new RegExp(f,o.o3?"g":"gi"),r);return t.replace(new RegExp(f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),o.o3?"g":"gi"),r);}
case "word-wrap":{const n=+g("o1")||80;return t.split("\n").map(l=>{const w=l.split(/\s+/);let line="",res=[];w.forEach(x=>{if((line+" "+x).trim().length>n){res.push(line.trim());line=x;}else line+=" "+x;});res.push(line.trim());return res.join("\n");}).join("\n");}
case "text-case":{const m=g("o1");if(m==="upper")return t.toUpperCase();if(m==="lower")return t.toLowerCase();if(m==="title")return t.replace(/\w\S*/g,x=>x[0].toUpperCase()+x.slice(1).toLowerCase());if(m==="sentence")return t.toLowerCase().replace(/(^\s*[a-z]|[.!?]\s+[a-z])/g,x=>x.toUpperCase());if(m==="camel")return t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g,(a,b)=>b.toUpperCase());if(m==="snake")return t.trim().replace(/\s+/g,"_").toLowerCase();if(m==="kebab")return t.trim().replace(/\s+/g,"-").toLowerCase();if(m==="alt")return t.split("").map((c,i)=>i%2?c.toUpperCase():c.toLowerCase()).join("");if(m==="inv")return t.split("").map(c=>c===c.toUpperCase()?c.toLowerCase():c.toUpperCase()).join("");return t;}
case "sort-lines":{const L=t.split("\n"),m=g("o1");if(m==="asc")L.sort((a,b)=>a.localeCompare(b));else if(m==="desc")L.sort((a,b)=>b.localeCompare(a));else if(m==="rev")L.reverse();else if(m==="rand")L.sort(()=>Math.random()-.5);else if(m==="len")L.sort((a,b)=>a.length-b.length);return L.join("\n");}
case "line-numbers":{const m=g("o1"),s=g("o2");const rom=n=>{const v=[1000,900,500,400,100,90,50,40,10,9,5,4,1],s2=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];let r="";v.forEach((x,i)=>{while(n>=x){r+=s2[i];n-=x;}});return r;};return t.split("\n").map((l,i)=>{let p=i+1;if(m==="a")p=String.fromCharCode(97+(i%26));if(m==="r")p=rom(i+1);return p+s+l;}).join("\n");}
case "prefix-suffix":return t.split("\n").map(l=>g("o1")+l+g("o2")).join("\n");
case "add-line-breaks":return t.split(g("o1")).join("\n");
case "remove-line-breaks":return t.split("\n").map(x=>x.trim()).join(g("o1"));
case "justify-text":{const n=+g("o1")||60;return t.split("\n").map(l=>{const w=l.split(/\s+/).filter(Boolean);if(w.length<2)return l;let res=w.join(" ");while(res.length<n)res=res.replace(/ /g,"  ").slice(0,n);return res.slice(0,n);}).join("\n");}
case "center-text":{const n=+g("o1")||60,ch=g("o2")||" ";return t.split("\n").map(l=>{const p=Math.max(0,Math.floor((n-l.length)/2));return ch.repeat(p)+l;}).join("\n");}
case "pad-text":{const n=+g("o2")||30,ch=g("o3")||" ";return t.split("\n").map(l=>g("o1")==="l"?l.padStart(n,ch):l.padEnd(n,ch)).join("\n");}
case "dedup-words":{const seen=new Set();return t.split(/(\s+)/).map(w=>{if(/^\s+$/.test(w))return w;const k=w.toLowerCase();if(seen.has(k))return "";seen.add(k);return w;}).join("").replace(/ +/g," ");}
case "dedup-lines":{const seen=new Set();return t.split("\n").filter(l=>{let k=o.o1?l.trim():l;if(seen.has(k))return false;seen.add(k);return true;}).join("\n");}
case "remove-empty-lines":return t.split("\n").filter(l=>l.trim()!=="").join("\n");
case "clean-spaces":return t.replace(/[ \t]+/g," ").replace(/^[ \t]+|[ \t]+$/gm,"").trim();
case "remove-unwanted":try{return t.replace(new RegExp(g("o1"),"gu"),"");}catch(e){return t.replace(/[^\p{L}\p{N}\s.,!?:-]/gu,"");}
case "remove-emojis":return t.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}]/gu,"");
case "remove-unicode":return t.replace(/[^\x00-\x7F\s]/g,"");
case "shuffle-lines":{const L=t.split("\n");L.sort(()=>Math.random()-.5);return L.join("\n");}
case "conditional-remove":{const k=g("o1"),m=g("o2");return t.split("\n").filter(l=>m==="del"?!l.includes(k):l.includes(k)).join("\n");}
case "reverse-words":return t.split("\n").map(l=>l.split(/\s+/).reverse().join(" ")).join("\n");
case "reverse-letters":return t.split("").reverse().join("");
case "swap-columns":{const d=g("o1"),a=(+g("o2")||1)-1,b=(+g("o3")||2)-1;return t.split("\n").map(l=>{const c=l.split(d);if(c.length>Math.max(a,b)){const tmp=c[a];c[a]=c[b];c[b]=tmp;}return c.join(d);}).join("\n");}
case "extract-column":{const d=g("o1"),a=(+g("o2")||1)-1;return t.split("\n").map(l=>l.split(d)[a]||"").join("\n");}
case "split-columns":{const d=g("o1");return t.split("\n").map(l=>l.split(d).map((c,i)=>`Column ${i+1}: ${c}`).join(" | ")).join("\n");}
case "spaces-to-tabs":return t.replace(new RegExp(" {"+(+g("o1")||4)+"}","g"),"\t");
case "tabs-to-spaces":return t.replace(/\t/g," ".repeat(+g("o1")||4));
case "smart-quotes":return t.replace(/[“”«»]/g,'"').replace(/[‘’]/g,"'");
case "thousand-separator":return t.replace(/\d+/g,n=>Number(n).toLocaleString("en-US"));
case "text-repeater":{const n=+g("o1")||5;const sep=(g("o2")||"").replace(/\\n/g,"\n");return Array(n).fill(t).join(sep);}
case "extract-urls":return (t.match(/https?:\/\/[^\s"'<>]+/g)||[]).join("\n")||"No URLs found";
case "extract-emails":return (t.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)||[]).join("\n")||"No emails found";
case "html-to-text":{const d=document.createElement("div");d.innerHTML=t;return d.textContent;}
case "json-to-text":try{const j=JSON.parse(t);return JSON.stringify(j,null,2).replace(/[{}\[\]"]/g,"");}catch(e){return "Invalid JSON: "+e.message;}
case "xml-to-text":return t.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
case "base64-encode":return btoa(unescape(encodeURIComponent(t)));
case "base64-decode":try{return decodeURIComponent(escape(atob(t.trim())));}catch(e){return "Invalid Base64";}
case "url-encode":return encodeURIComponent(t);
case "url-decode":try{return decodeURIComponent(t);}catch(e){return "Invalid URL encoding";}
case "html-encode":return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
case "html-decode":{const d=document.createElement("div");d.innerHTML=t;return d.textContent;}
case "mirror-text":return t.split("").reverse().join("");
case "flip-text":return t.toLowerCase().split("").map(c=>FLIP[c]||c).reverse().join("");
case "bold-text":return t.replace(/[A-Za-z0-9]/g,c=>{if(c>="A"&&c<="Z")return String.fromCodePoint(0x1D400+c.charCodeAt(0)-65);if(c>="a"&&c<="z")return String.fromCodePoint(0x1D41A+c.charCodeAt(0)-97);return String.fromCodePoint(0x1D7CE+c.charCodeAt(0)-48);});
case "italic-text":return t.replace(/[A-Za-z]/g,c=>c>="A"&&c<="Z"?String.fromCodePoint(0x1D434+c.charCodeAt(0)-65):String.fromCodePoint(0x1D44E+c.charCodeAt(0)-97));
case "cursive-text":return t.replace(/[A-Za-z]/g,c=>c>="A"&&c<="Z"?String.fromCodePoint(0x1D49C+c.charCodeAt(0)-65):String.fromCodePoint(0x1D4B6+c.charCodeAt(0)-97));
case "old-english":return t.replace(/[A-Za-z0-9]/g,c=>{if(c>="A"&&c<="Z")return String.fromCodePoint(0x1D504+c.charCodeAt(0)-65);if(c>="a"&&c<="z")return String.fromCodePoint(0x1D51E+c.charCodeAt(0)-97);return c;});
case "cool-fonts":{const b=t.replace(/[A-Za-z]/g,c=>c>="A"&&c<="Z"?String.fromCodePoint(0x1D400+c.charCodeAt(0)-65):String.fromCodePoint(0x1D41A+c.charCodeAt(0)-97));const it=t.replace(/[A-Za-z]/g,c=>c>="A"&&c<="Z"?String.fromCodePoint(0x1D434+c.charCodeAt(0)-65):String.fromCodePoint(0x1D44E+c.charCodeAt(0)-97));return `${[...t].join("★")} ★\nBOLD ${b}\nITALIC ${it}\n=== ${t} ===\n[ ${t} ]\n*+ ${t} +*`;}
case "insert-symbol":return [...t].join(g("o1")||"★");
case "remove-accents":return t.normalize("NFD").replace(/[\u0300-\u036f]/g,"");
case "normalize-numbers":{const m=g("o1");const ar="٠١٢٣٤٥٦٧٨٩",fa="۰۱۲۳۴۵۶۷۸۹";const toLat=t.replace(/[٠-٩۰-۹]/g,d=>{let i=ar.indexOf(d);if(i<0)i=fa.indexOf(d);return i;});if(m==="lat")return toLat;if(m==="ar")return toLat.replace(/\d/g,d=>ar[d]);if(m==="fa")return toLat.replace(/\d/g,d=>fa[d]);return toLat;}
case "grammar-check":{const iss=[];if(/  +/.test(t))iss.push("- Double spaces found");if(/\b(\w+)\s+\1\b/i.test(t))iss.push("- Repeated word detected");if(t.trim()&&!/[.!?]$/.test(t.trim()))iss.push("- Missing end punctuation");const fixed=t.replace(/ +/g," ").replace(/\s+([.,!?])/g,"$1").trim();return (iss.length?iss.join("\n"):"No obvious issues found")+"\n\n--- Cleaned text ---\n"+fixed;}
case "translator":{const dict={hello:"hello",love:"love",book:"book",water:"water",bonjour:"hello",merci:"thank you",amour:"love"};return t.split(/\s+/).map(w=>dict[w.toLowerCase()]||w).join(" ")+"\n\n(Offline mini-dictionary — use the Google button for full translation)";}
case "summarizer":{const n=+g("o1")||3;const sent=t.match(/[^.!?]+[.!?]/g)||[t];const freq={};(t.toLowerCase().match(/[a-z]+/g)||[]).forEach(w=>{if(!STOP.has(w)&&w.length>2)freq[w]=(freq[w]||0)+1;});return sent.map(s=>({s,sc:(s.toLowerCase().match(/[a-z]+/g)||[]).reduce((a,w)=>a+(freq[w]||0),0)/s.split(" ").length})).sort((a,b)=>b.sc-a.sc).slice(0,n).map(x=>x.s.trim()).join("\n");}
case "paraphraser":return t.split(/(\s+)/).map(w=>/^\s+$/.test(w)?w:(SYN[w.toLowerCase()]||w)).join(" ");
case "keywords":{const n=+g("o1")||10;const f={};(t.toLowerCase().match(/[a-z0-9]+/g)||[]).forEach(w=>{if(!STOP.has(w)&&w.length>2)f[w]=(f[w]||0)+1;});return Object.entries(f).sort((a,b)=>b[1]-a[1]).slice(0,n).map(([w,c])=>`${w} (${c})`).join(", ")||"No keywords found";}
case "hashtags":{const n=+g("o1")||10;const f={};(t.match(/[A-Za-z0-9]+/g)||[]).forEach(w=>{if(w.length>2)f[w]=(f[w]||0)+1;});return Object.entries(f).sort((a,b)=>b[1]-a[1]).slice(0,n).map(([w])=>"#"+w).join(" ")||"Type some text first";}
case "title-generator":{const k=t.slice(0,80)||"Your Topic";return [`How to Master ${k} in 5 Steps`,`Secrets of ${k} Nobody Tells You`,`The Complete Guide to ${k}`,`${k}: Everything You Need to Know`,`10 Amazing Facts About ${k}`,`Why ${k} Is the Future`,`${k} for Beginners: Start Here`,`Common ${k} Mistakes to Avoid`,`${k} vs Traditional: Which Is Best?`,`${k} Explained in One Minute`].join("\n");}
case "email-generator":return `Subject: Regarding ${t.slice(0,50)}\n\nDear Sir/Madam,\nI am writing about (${t}) [Type: ${g("o1")}].\nKindly review it and reply at your earliest convenience.\n\nBest regards,\n[Your Name]`;
case "article-writer":return `# ${t}\n\n## Introduction\n${t} is gaining attention in today's world...\n\n## Key Insights\nTo understand ${t}, we analyze causes and context...\n\n## Practical Application\nApply ${t} in three steps: plan, execute, evaluate.\n\n## Challenges & Solutions\nDespite benefits, challenges require creative solutions.\n\n## Conclusion\nIn short, ${t} is an opportunity worth pursuing.`;
case "essay-writer":return `Introduction: The topic of (${t}) deserves serious research...\n\nBody: First... Second... Third... Evidence shows ${t} has a major impact...\n\nConclusion: Therefore, ${t} merits continuous attention.`;
case "story-generator":return `Once upon a time, a hero dreamed of ${t}...\nOne stormy day, the adventure began... facing the dragon (the challenge), learning patience, and finally achieving ${t}.`;
case "paragraph-generator":return `${t} represents a central idea in modern life, shaping our daily priorities. Reflecting on ${t} reveals new dimensions that inspire deeper thinking and stronger action toward a better future.`;
case "slogan-generator":return [`${t}... Simply the Best`,`Live ${t}`,`${t} Suits You`,`The Power of ${t}`,`${t} First`,`Discover New ${t}`,`${t} Without Limits`,`Trust ${t}`].join("\n");
case "business-names":return [`${t} Pro`,`${t} Star`,`${t} House`,`${t} Plus`,`Golden ${t}`].map(n=>`${n} — ${n.replace(/\s/g,"").toLowerCase()}.com`).join("\n");
case "tweet-generator":return `${t.slice(0,150)} 🚀\n#${(t.split(" ")[0]||"new").replace(/[^A-Za-z0-9]/g,"")} #success #motivation`;
case "video-script":return `Video script: ${t}\n0-5s HOOK: "Stop! Do you know the secret of ${t}?"\n5-30s: 3 key points about ${t}\n30-50s: real example + story\n50-60s CTA: subscribe and comment your thoughts on ${t}!`;
case "qa-generator":{const sent=t.match(/[^.!?]+[.!?]/g)||[t];return sent.slice(0,5).map((s,i)=>`Q${i+1}: What is the main idea of: "${s.trim().slice(0,60)}...?"\nA${i+1}: ${s.trim()}`).join("\n\n");}
default:return t;
}
}
};
