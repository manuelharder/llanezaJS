

var compose = function () {
  var fns = arguments;

  return function (result) {
    for (var i = fns.length - 1; i > -1; i--) {
      result = fns[i].call(this, result);
    }

    return result;
  };
};


function curry(fx) {
  var arity = fx.length;

  return function f1() {
    var args = Array.prototype.slice.call(arguments, 0);
    if (args.length >= arity) {
      return fx.apply(null, args);
    }
    else {
      return function f2() {
        var args2 = Array.prototype.slice.call(arguments, 0);
        return f1.apply(null, args.concat(args2)); 
      }
    }
  };
}


var log = x => { console.log(x); return x; };

var notNumber = x => { 

    try {

      if (isNaN(x)) throw (x + " is not a number");

      else return x
    }
    catch(err) { console.log(err); }
};









