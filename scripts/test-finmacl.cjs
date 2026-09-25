const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(require('node:path').join(__dirname,'../public/finmacl.html'),'utf8');
const items=JSON.parse(html.match(/id="checklist-data"[^>]*>(.*?)<\/script>/s)[1]);
const code=html.match(/<script>([\s\S]*?)<\/script><\/body>/)[1].split('const fresh=')[0].split('function relevantItems').map((part,i)=>i?'function relevantItems'+part:'').join('');
const context={URL};vm.createContext(context);vm.runInContext(code,context);
const state={role:'',site:'',health:false,project:'https://example.test',client:'Testfirma',answers:{}};
assert.equal(context.relevantItems(items,state).length,0);
for(const role of ['gebunden','ungebunden'])for(const site of ['website','landingpage']){
 state.role=role;state.site=site;
 const visible=context.relevantItems(items,state);
 assert.equal(visible.length,site==='website'?15:19);
 assert(!visible.some(x=>x.section===(role==='gebunden'?3:2)));
 const chosen=visible[0];state.answers[context.scopeKey(state)]={[chosen.id]:{status:'missing',note:'Konkreter Testhinweis'}};
 const tasks=context.selectedTasks(items,state);assert.equal(tasks.length,1);
 const prompt=context.taskPrompt(items,state);assert(prompt.includes(chosen.title));assert(prompt.includes('Konkreter Testhinweis'));assert(prompt.includes('https://example.test'));
 state.answers[context.scopeKey(state)][chosen.id].status='done';assert.equal(context.taskPrompt(items,state),'');
 state.health=true;assert.equal(context.relevantItems(items,state).length,visible.length+1);state.health=false;
}
state.answers={'gebunden:website':{p1:{status:'missing'}}};state.role='ungebunden';state.site='landingpage';assert.equal(context.selectedTasks(items,state).length,0);
console.log('PASS: four combinations, health filter, explicit missing-only export, notes, domain and scenario isolation.');
state.infoUrl='https://main.example/kundeninformation';state.privacyUrl='https://main.example/datenschutz';
for(const role of ['gebunden','ungebunden'])for(const site of ['website','landingpage']){
 state.role=role;state.site=site;
 const groups=context.groupedItems(items,state);
 assert.equal(groups.flatMap(g=>g.items).length,context.relevantItems(items,state).length);
 assert.equal(new Set(groups.flatMap(g=>g.items.map(x=>x.id))).size,context.relevantItems(items,state).length);
}
state.role='ungebunden';state.site='landingpage';state.answers={'ungebunden:landingpage':{p14:{status:'missing'},p3:{status:'missing'}}};
const routed=context.taskPrompt(items,state);
assert(routed.includes(state.infoUrl));assert(routed.includes(state.privacyUrl));
assert.equal(context.placement(items.find(x=>x.id==='p14'),state).key,'info');
assert.equal(context.placement(items.find(x=>x.id==='p22'),state).key,'process');
assert.equal(context.placement(items.find(x=>x.id==='p4'),state).key,'it');
assert(routed.includes('Angaben zur Vergütung gehören nicht automatisch in den Werbetext'));
assert(html.includes('id="infoUrl"'));assert(html.includes('id="privacyUrl"'));
console.log('PASS: cluster coverage, URL routing, remuneration placement and process separation.');

assert.equal(context.releaseReadiness(items,state).ready,false);
state.reviewer='Technik Test';state.releaseVersion='Teststand';
state.answers[context.scopeKey(state)]=Object.fromEntries(context.relevantItems(items,state).map(item=>[item.id,{status:'done',note:'Beleg vorhanden'}]));
assert.equal(context.releaseReadiness(items,state).ready,true);
state.answers[context.scopeKey(state)].p4.note='';assert.equal(context.releaseReadiness(items,state).ready,false);
state.answers[context.scopeKey(state)].p4={status:'na',note:'Begründung'};assert.equal(context.releaseReadiness(items,state).ready,true);
state.answers[context.scopeKey(state)].p4.status='review';assert.equal(context.releaseReadiness(items,state).ready,false);
assert.equal(context.safeUrl('javascript:alert(1)'),'');assert.equal(context.safeUrl('https://user:secret@example.test'),'');
assert.equal(context.safeUrl('praemien2027.ch'),'https://praemien2027.ch/');
assert(html.includes('id="tour-start"'));assert(html.includes('id="release-confirm"'));
console.log('PASS: approval blocked for incomplete evidence, justified exclusions, IT cluster and safe links.');

assert(!context.ownWorkItems(items,state).some(item=>[2,3].includes(item.section)||['p18','p22','p23'].includes(item.id)));
assert(!html.includes('Unterschrift Kunde'));assert(!html.includes('id="customerApprover"'));
