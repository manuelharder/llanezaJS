# llanezaJS - a Vanilla JS library to replace jQuery

the library only supports modern browsers

there is an ECMAScript 6 version in the folder and a ECMAScript 5 version in one file,
ES5 (uses promises, not supported in all browser, i.e. IE11)



Usage Example:

// gets all elements with the class "link" and adds an eventlistener

var Llaneza.getElem(".link").on("click", someFunction);

// get the ancestor with the class "ancestor" of the element with the id "id" (like jQuery clostest function but faster)

var ancestor = Llaneza.closest(Llaneza.one("#id"), ".ancestor");



Basic function examples:

Llaneza.all("a"); // to get all links

Llaneza.one(".one"); // to get the element with the class "one" (if there is only one on the page)

Llaneza.byId("#one"); // to get the element with the id "one" (faster than previous function)

Llaneza.getElem(".many"); // to get the elements with the class "many" and return them rapped in an object (with extra functions) 

Llaneza.closest(Llaneza.one("#id"), ".ancestor") // see usage example


// functionality that can be added to the return value of Llaneza.getElem
.on()
.off()
.addClass()
.removeClass()


For the animation example check out the ES6 folder

