var MyHelper = {};
MyHelper.Framework = {};

MyHelper.Framework = function () {

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

    var getElem = function getElem(name) {

        var con = new MyHelper.Framework.DomContainer();
        con.elements = document.querySelectorAll(name);
        return con;
    };

    return {
        all: all,
        one: one,
        getElem: getElem,
        mergeNodeLists: mergeNodeLists,
        closest: closest
    };
};

MyHelper.Framework.DomContainer = function () {
    var _this = this;

    this.elements = null;

    this.on = function (event, fn) {

        Array.from(_this.elements).forEach(function (el) {

            el.addEventListener(event, fn, false);
        });

        return _this;
    };

    this.off = function (event, fn) {

        Array.from(_this.elements).forEach(function (el) {

            el.removeEventListener(event, fn);
        });

        return _this;
    };
};


var LL = MyHelper.Framework();

