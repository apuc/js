function animationLab(selector) {

    if (typeof selector == "object") {
        this.obj = selector;
    }
    else {
        if (selector[0] == '#') {
            this.obj = document.getElementById(selector.slice(1));
        }
        else {
            this.obj = document.getElementsByClassName(selector.slice(1));
        }
    }


    this._animate = function (options, callback) {
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

    this.animate = function (param, duration) {

    }

    this.fadeIn = function (duration, callback) {
        callback = callback || function () {
            };
        var opacity = parseFloat(getComputedStyle(this.obj).opacity);
        var obj = this;
        this._animate({
            duration: duration,
            timing: function (timeFraction) {
                return timeFraction;
            },
            draw: function (progress) {
                obj.obj.style.opacity = opacity + (progress * (1 - opacity));
            }
        }, function () {
            callback()
        });
    }

    this.fadeOut = function (duration, callback) {
        callback = callback || function () {
            };
        var opacity = parseFloat(getComputedStyle(this.obj).opacity);
        var obj = this;
        this._animate({
            duration: duration,
            timing: function (timeFraction) {
                return timeFraction;
            },
            draw: function (progress) {
                obj.obj.style.opacity = opacity + (progress * (0 - opacity));
            }
        }, function () {
            callback()
        });
    }

    this.slideUp = function (duration, callback) {
        callback = callback || function () {
            };
        var height = parseInt(getComputedStyle(this.obj).height); //Полчаем высоту элемента
        var obj = this; // присваиваем текущий элемент в переменную для дальнейшего использования
        this._animate({
            duration: duration, //длительность анимации
            timing: function (timeFraction) { // формула анимации
                return timeFraction;
            },
            draw: function (progress) { // шац анимации
                obj.obj.style.height = height + (progress * (0 - height)) + "px"; // формула расчета высоты элемента по шагу анимации
            }
        }, function () {
            obj.obj.style.display = 'none';
            obj.obj.style.height = height + 'px'; // возвращаем исходную высоту элементу
            callback()
        });
    }

    this.slideDown = function (duration, callback) {
        callback = callback || function () {
            };
        var height = parseInt(getComputedStyle(this.obj).height);
        this.obj.style.height = 0;
        this.obj.style.display = 'block';
        var obj = this;
        this._animate({
            duration: duration,
            timing: function (timeFraction) {
                return timeFraction;
            },
            draw: function (progress) {
                obj.obj.style.height = progress * height + "px";
            }
        }, function () {
            callback()
        });
    }

    this.toggle = function(duration, callback){
        callback = callback || function () {
            };
    }

    this.justNumber = ['width', 'height'];

}