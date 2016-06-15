"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


var Llaneza = {}; 


Llaneza = function () {

    var mergeNodeLists = function mergeNodeLists(a, b) {

        var slice = Array.prototype.slice;
        return slice.call(a).concat(slice.call(b));
    };

    var closest = function closest(elem, find) {

        var firstChar = find.charAt(0);

        while (elem && elem !== document) {

            elem = elem.parentNode;
            // If selector is a class
            if (firstChar === '.') {
                if (elem.classList.contains(find.substr(1))) {
                    return elem;
                }
            }
            // If selector is an id
            if (firstChar === '#') {

                if (elem.id === find.substr(1)) {
                    return elem;
                }
            }
            // If selector is a tag
            if (elem.tagName.toLowerCase() === find) {
                return elem;
            }
        }
        return false;
    };

    var all = function all(name) {

        return document.querySelectorAll(name);
    };

    var one = function one(name) {

        return document.querySelector(name);
    };

    var byId = function byId(id) {

        return document.getElementById(id);
    };

    // used to add classes and event listener to several element + looping them
    var getElem = function getElem(name) {

        var con = new Llaneza.DomContainer();
        con.elements = document.querySelectorAll(name);
        return con;
    };

    return {
        all: all,
        one: one,
        byId: byId,
        getElem: getElem,
        mergeNodeLists: mergeNodeLists,
        closest: closest
    };
}();

Llaneza.DomContainer = function () {
    var _this = this;

    this.elements = null;

    this.on = function (event, fn) {

        [].forEach.call(_this.elements, function (el) {

            el.addEventListener(event, fn, false);
        });

        return _this;
    };

    this.off = function (event, fn) {

        [].forEach.call(_this.elements, function (el) {

            el.removeEventListener(event, fn);
        });

        return _this;
    };

    this.addClass = function (cl) {

        [].forEach.call(_this.elements, function (el) {

            el.classList.add(cl);
        });

        return _this;
    };

    this.removeClass = function (cl) {

        [].forEach.call(_this.elements, function (el) {

            el.classList.remove(cl);
        });

        return _this;
    };
};


var _requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

Llaneza.Animation = {};

Llaneza.Animation.animate = function (item) {
    var _this2 = this;

    var self = this;

    this.options = {};

    this.options = {
        duration: 500,
        ease: false,
        waiting: false,
        delay: false
    };

    this.prevPromise = this.prevPromise || null;

    var promise = new Promise(function (resolve, reject) {
        return self.resolve = resolve;
    });

    _extends(self.options, item.options);

    this.step = function () {

        var current = +new Date(),
            remaining = self.end - current;

        if (remaining < 50) {

            item.run(1); //1 = progress is at 100%
            self.resolve();
            return;
        } else {

            var rate = remaining / self.options.duration;

            if (self.options.ease) {
                rate = Math.sqrt((1 - rate) * (2 - (1 - rate)));
            } else {
                rate = 1 - rate;
            }

            item.run(rate);
        }

        _requestAnimationFrame(self.step);
    };

    this.start = function () {

        if (self.options.delay) {

            setTimeout(function () {
                self.end = +new Date() + _this2.options.duration;
                self.step();
            }, self.options.delay);
        } else {

            self.end = +new Date() + _this2.options.duration;
            self.step();
        }
    };

    if (self.prevPromise) {

        if (self.options.waiting) {

            self.prevPromise.then(function () {
                return self.start();
            });
        } else {

            self.start();
        }
    } else {

        self.start();
    }

    var nextAnimation = _extends({}, Llaneza.Animation);
    nextAnimation.prevPromise = promise;

    return nextAnimation;
}

// setTimeout(function() {

//   Llaneza.Animation.animate({
//     options : { duration : 500, ease : false },
//     run: function(rate) {
//           document.querySelector("h1").style.transform = "translateY("+ (100 * rate) + "px)";
//       }
//     }).animate({
//     options : { duration : 500, ease : true, waiting : true },
//     run: function(rate) {
//           document.querySelector("h1").style.transform = "translateX("+ (100 * rate) + "px)";
//       }
//     }).animate({
//     options : { duration : 500, ease : true, delay : 500 },
//     run: function(rate) {
//           document.querySelector("h1").style.opacity = 1-rate;
//       }
//   });

// },1000);
