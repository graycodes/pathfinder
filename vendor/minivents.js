var wrapper = function() {function Events(a){var c,d,e,b={},f=Array;a=a||this,a.on=function(a,c,d){b[a]||(b[a]=[]),b[a].push({f:c,c:d})},a.off=function(a,e){for(d=b[a]||[],c=d.length=e?d.length:0;~--c<0;)e==d[c].f&&d.splice(c,1)},a.emit=function(){for(e=f.apply([],arguments),d=b[e.shift()]||[],c=d.length,j=0;c>j;j++)d[j].f.apply(d[j].c,e)}} return Events;}

if (typeof module !== 'undefined') {
    module.exports = wrapper();
} else if (typeof define !== 'undefined') {
    define([], wrapper);
}
