
var _requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;                           

Llaneza.Animation = {}; 

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



