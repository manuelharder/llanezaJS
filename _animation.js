
var _requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

MyHelper.Framework.animation = function(item) {

    var self = this;

    self.options = {};

    self.options = {
        duration: 500,
        ease: false
    }

    Object.assign(self.options, item.options)

    
    this.end = +new Date() + this.options.duration;

          
    this.step = function() {

        var current = +new Date(),
            remaining = self.end - current;

        if(remaining < 50) {

          item.run(1);  //1 = progress is at 100%
          return;
        } 
        else {

          var rate = remaining / self.options.duration;

          if ( self.options.ease) { rate = 1 - Math.pow(rate, 1.5); }
          else { rate = 1- rate; } 

          item.run(rate);
        }

        _requestAnimationFrame(self.step);
    }
    this.step();
}


// MyHelper.Framework.animation({
//   options : { duration : 400, ease : true },
//   run: function(rate) { 

//         console.log(rate);
//     }
// });



