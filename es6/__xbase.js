
Llaneza = (function() {

    let mergeNodeLists = (a, b) => {

      let slice = Array.prototype.slice;
      return slice.call(a).concat(slice.call(b));
    };


    let closest = (elem, find) => {

        let firstChar = find.charAt(0);

        while (elem && elem !== document) {

            elem = elem.parentNode;
            // If selector is a class
            if ( firstChar === '.' ) {
                if (elem.classList.contains(find.substr(1))) { return elem; }
            }
            // If selector is an id
            if ( firstChar === '#' ) {

                if (elem.id === find.substr(1)) { return elem; }
            } 
            // If selector is a tag
            if ( elem.tagName.toLowerCase() === find ) { return elem; }
        }
        return false;
    };

    
    let all = name => {

        return document.querySelectorAll(name);
    };
    
    let one = name => {

        return document.querySelector(name);
    };

    let byId = id => {

        return document.getElementById(id);
    };

    // used to add classes and event listener to several element + looping them
    let getElem = name => {

        let con = new Llaneza.DomContainer();
        con.elements = document.querySelectorAll(name);
        return con
    }
    
    return { 
        all: all, 
        one: one,
        byId: byId, 
        getElem: getElem, 
        mergeNodeLists: mergeNodeLists, 
        closest: closest 
    };
})();


Llaneza.DomContainer = function() {

    this.elements = null;

    this.on = (event, fn) => {

        [].forEach.call(this.elements, el => {

            el.addEventListener(event, fn, false);
        });

        return this;
    };

    this.off = (event, fn) => {

        [].forEach.call(this.elements, el => {

            el.removeEventListener(event, fn);
        });

        return this;
    };

    this.addClass = cl => {

        [].forEach.call(this.elements, el => {

            el.classList.add(cl);
        });

        return this;
    };

    this.removeClass = cl => {

        [].forEach.call(this.elements, el => {

            el.classList.remove(cl);
        });

        return this;
    };
}




