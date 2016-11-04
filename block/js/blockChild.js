function BlockChild(){

    this.addEv = function(){
        document.getElementById(this.options.headerId).onclick = this._ta.bind(this);
    }

    this._animate = function (options, callback) {
        var start = performance.now();

        requestAnimationFrame(function animate(time) {
            var timeFraction = (time - start) / options.duration;
            if (timeFraction > 1) timeFraction = 1;

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

    this.slideUp = function (duration, callback) {
        callback = callback || function () {
            };
        var height = parseInt(getComputedStyle(this._body).height);
        var obj = this;
        this._animate({
            duration: duration,
            timing: function (timeFraction) {
                return timeFraction;
            },
            draw: function (progress) {
                obj._body.style.height = height + (progress * (0 - height)) + "px";
            }
        }, function () {
            obj._body.style.display = 'none';
            obj._body.style.height = height + 'px';
            callback()
        });
    }

    this.slideDown = function (duration, callback) {
        callback = callback || function () {
            };
        var height = parseInt(getComputedStyle(this._body).height);
        this._body.style.height = 0;
        this._body.style.display = 'block';
        var obj = this;
        this._animate({
            duration: duration,
            timing: function (timeFraction) {
                return timeFraction;
            },
            draw: function (progress) {
                obj._body.style.height = progress * height + "px";
            }
        }, function () {
            callback()
        });
    }

    this._ta = function(){
        this.toggleAnimate(1000);
    }

    this.toggleAnimate = function (duration, callback) {
        var display = getComputedStyle(this._body).display;
        if (display == 'block') {
            this.slideUp(duration, callback);
        } else {
            this.slideDown(duration, callback);
        }
    }
}