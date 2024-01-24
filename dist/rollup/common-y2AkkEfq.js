const lib = 'lib';
globalThis.lib = lib;
console.log('lib.js execute');

let common = 2;
globalThis.common = common;
console.log("common.js execute");
