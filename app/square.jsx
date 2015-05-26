/*global define, module, require*/
var wrapper = function() {
    return function () {
        console.log('square');
    };
};

if (typeof define !== 'undefined') {
    define([], wrapper);
} else {
    if (typeof module !== 'undefined') {
        module.exports = wrapper();
    }
}
