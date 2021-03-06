
var _requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;                           

Llaneza.Animation = {}; 

Llaneza.Animation.init = function(item) {

  return Object.assign({}, Llaneza.Animation);
}

Llaneza.Animation.animate = function(item) {

    var self = this;

    this.options = {};

    this.options = {
        duration: 500,
        ease: false,
        waiting: false,
        delay: false
    }

    this.prevPromise = this.prevPromise || null;

    const promise = new Promise((resolve, reject) => self.resolve = resolve );

    Object.assign(self.options, item.options)
  
    this.step = () => {

        var current = +new Date(),
            remaining = self.end - current;

        if(remaining < 50) {

          item.run(1);  //1 = progress is at 100%
          self.resolve();
          return;
        } 
        else {

          var rate = remaining / self.options.duration;

          if ( self.options.ease) { rate = Math.sqrt((1-rate) *(2-(1-rate))); }
          else { rate = 1- rate; } 

          item.run(rate);
        }

        _requestAnimationFrame(self.step);
    }

    this.start = () => {

        if (self.options.delay) {
          
          setTimeout(() => {
            self.end = +new Date() + this.options.duration;
            self.step();
          }, self.options.delay);
        }
        else {

          self.end = +new Date() + this.options.duration;
          self.step();
        }

    }

    if (self.prevPromise) {

        if (self.options.waiting) { 

          self.prevPromise.then(() => self.start() ); 
        }
        else {
          
          self.start();
        }
    }
    else {

      self.start();
    }

    let nextAnimation = Object.assign({}, Llaneza.Animation);
    nextAnimation.prevPromise = promise;

    return nextAnimation;
}


Llaneza.ScrollTo = {}; 

Llaneza.ScrollTo.animate = function(item) {

    var self = this;

    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop

    var scrollBy = item.to.getBoundingClientRect().top;

    this.options = {
        duration: 500,
        ease: false
    }

    Llaneza.Animation.animate({
      options : self.options,
      run: function(rate) { 
          window.scrollTo(0, scrollTop + scrollBy*rate);
      }
    })
}


Llaneza.Animation.animateStaggered = function(items) { 

    var obj =  Object.assign({}, Llaneza.Animation);

    [].forEach.call(items.elements, el => {

        obj = obj.animate({
          options : items.options,
          run: function(rate) { 
                el.style[items.attribute] = 1-rate;
            }
        });
    }); 

    return obj;
};

//var objScrollAni = Llaneza.Animation.init();

// setTimeout(function() { 
//   objScrollAni.animate({
//      options : { duration : 400, ease : true },
//      to : document.querySelector("#section-2")
//   });
// }, 1000);

// setTimeout(function() {

//   var obj1 = Llaneza.Animation.init();
//   var obj2 = Llaneza.Animation.init();
//   obj1.animate({
//     options : { duration : 500, ease : false },
//     run: function(rate) { 
//           document.querySelector("h1").style.transform = "translateY("+ (100 * rate) + "px)";
//       }
//     }).animate({
//     options : { duration : 500, ease : true, waiting : true },
//     run: function(rate) { 
//           document.querySelector("h1").style.transform = "translateY(100px) translateX("+ (100 * rate) + "px)";
//       }
//     }).animate({
//     options : { duration : 500, ease : true, delay : 500 },
//     run: function(rate) { 
//           document.querySelector("h1").style.opacity = 1-rate;
//       }
//   });

//   obj2.animateStaggered({
//     options : { duration : 200, ease : true, delay : 500, waiting : true },
//     elements : document.querySelectorAll("p"), 
//     attribute : "opacity"
//   }).animate({
//     options : { duration : 500, ease : false, waiting : true },
//     run: function(rate) { 
//           document.querySelector("h1").style.opacity = rate;
//       }
//   });  

// },1000);



