function animationLab(selector){

    if(typeof selector == "object"){
        this.obj = selector;
    }
    else {
        if(selector[0] == '#'){
            this.obj = document.getElementById(selector.slice(1));
        }
        else {
            this.obj = document.getElementsByClassName(selector.slice(1));
        }
    }


    this._animate = function(options, callback){
        var start = performance.now();

        requestAnimationFrame(function animate(time) {
            // timeFraction от 0 до 1
            var timeFraction = (time - start) / options.duration;
            if (timeFraction > 1) timeFraction = 1;

            // текущее состояние анимации
            var progress = options.timing(timeFraction);

            options.draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
            else {
                callback();
            }


        });
    }

    this.animate = function(param, duration){

    }

    this.fadeIn = function(duration, callback){
        callback = callback || function() {};
        var opacity = parseFloat(getComputedStyle(this.obj).opacity);
        var obj = this;
        this._animate({
            duration: duration,
            timing: function(timeFraction) {
                return timeFraction;
            },
            draw: function(progress) {
                console.log(opacity + (progress * (1 - opacity)));
                obj.obj.style.opacity = opacity + (progress * (1 - opacity));
            }
        }, function() {callback()});
    }

    this.fadeOut = function(duration, callback){
        callback = callback || function() {};
        var opacity = parseFloat(getComputedStyle(this.obj).opacity);
        var obj = this;
        this._animate({
            duration: duration,
            timing: function(timeFraction) {
                return timeFraction;
            },
            draw: function(progress) {
                obj.obj.style.opacity = opacity + (progress * (0 - opacity));
            }
        }, function() {callback()});
    }

    this.justNumber = ['width', 'height'];

}