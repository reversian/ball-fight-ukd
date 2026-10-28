const fs=require('fs');
let script=fs.readFileSync('analysis/simulate-all-fast.cjs','utf8');
script=script.replace("source+'\\nreturn '+simulation", "source+'\\nCHARACTERS.splice(CHARACTERS.findIndex(c=>c.name===\"이서안\"),1);\\nreturn '+simulation");
eval(script);
