function SimpleSlider(options){
    this.defaultParams = {
        selector: "slider",
        width: 700,
        height: 400,
        loop:false,
        nextArrow:'NEXT',
        prevArrow:'PREV',
        nextArrowClass:'nextClass',
        prevArrowClass:'prevClass'
    };

    this.finalParams = this.defaultParams;

    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            if (options[key] !== undefined) {
                this.finalParams[key] = options[key];
            }
        }
    }
    this.options = this.finalParams;

    this.slider = document.getElementById(this.options.selector);

    this.init = function(){
        this.slider.style.width = this.options.width + "px";
        this.slider.style.height = this.options.height + "px";
        var countSlids = this.slider.getElementsByTagName('div').length;
        this.slider.innerHTML += "<div class='arrows'><span class='"+ this.options.prevArrowClass +"' id='prev'>Пред.</span><span class='"+ this.options.nextArrowClass +"' id='next'>След.</span></div>";

        document.getElementById('next').onclick = this.next.bind(this);
        document.getElementById('prev').onclick = this.prev.bind(this);

        for (var i=0;i<countSlids;i++){
            this.slider.getElementsByTagName('div')[i].className = "simpleSlide";
            if(i == 0) {
                this.slider.getElementsByTagName('div')[i].className += " activeSimpleSlider";
                this.slider.getElementsByTagName('div')[i].style.display = "block";
            }
        }
    };

    this.next = function(event){
        var activeSlide = document.getElementsByClassName('activeSimpleSlider')[0];//находим активный слайд
        var nextSlide = activeSlide.nextElementSibling; // получаем следующий слайд

        if(!nextSlide.classList.contains('arrows')){ // если следующий элемент не содеожит класс "arrows"
            this.classRemove(activeSlide, 'activeSimpleSlider'); // удаляем класс активный класс у активного слайда
            activeSlide.style.display = 'none';

            this.addClass(nextSlide, 'activeSimpleSlider'); // добавляем класс следующему слайду
            nextSlide.style.display = 'block';
        }
        else {
            if(this.options.loop){ //  провеверяем на петлю
                this.classRemove(activeSlide, 'activeSimpleSlider'); // удаляем класс активный класс у активного слайда
                activeSlide.style.display = 'none';

                nextSlide = this.slider.getElementsByTagName('div')[0]; // находим первый слайд
                this.addClass(nextSlide, 'activeSimpleSlider'); // добавляем класс первому слайду
                nextSlide.style.display = 'block';
            }
        }
    };

    this.prev = function(event){
        var activeSlide = document.getElementsByClassName('activeSimpleSlider')[0];
        var prevSlide = activeSlide.previousElementSibling;

        if(prevSlide !== null){
            this.classRemove(activeSlide, 'activeSimpleSlider');
            activeSlide.style.display = 'none';
            this.addClass(prevSlide, 'activeSimpleSlider');
            prevSlide.style.display = 'block';
        }
        else {
            if(this.options.loop){
                this.classRemove(activeSlide, 'activeSimpleSlider');
                activeSlide.style.display = 'none';
                prevSlide = this.slider.getElementsByTagName('div')[this.slider.getElementsByTagName('div').length-2];
                this.addClass(prevSlide, 'activeSimpleSlider');
                prevSlide.style.display = 'block';
            }
        }
    };

    this.nextFade = function(event){
        var activeSlide = document.getElementsByClassName('activeSimpleSlider')[0];//находим активный слайд
        var nextSlide = activeSlide.nextElementSibling; // получаем следующий слайд

        var alAS = new animationLab(activeSlide);
        var slider = this;

        if(!nextSlide.classList.contains('arrows')){ // если следующий элемент не содеожит класс "arrows"
            this.classRemove(activeSlide, 'activeSimpleSlider'); // удаляем класс активный класс у активного слайда

            alAS.fadeOut(1000, function(){
                activeSlide.style.display = 'none';
                slider.addClass(nextSlide, 'activeSimpleSlider'); // добавляем класс следующему слайду
                nextSlide.style.opacity = '0';
                nextSlide.style.display = 'block';
                var alNS = new animationLab(nextSlide);
                alNS.fadeIn(1000);
            });
        }
        else {
            if(this.options.loop){ //  провеверяем на петлю
                this.classRemove(activeSlide, 'activeSimpleSlider'); // удаляем класс активный класс у активного слайда
                alAS.fadeOut(1000, function(){
                    activeSlide.style.display = 'none';
                    nextSlide = slider.slider.getElementsByTagName('div')[0]; // находим первый слайд
                    slider.addClass(nextSlide, 'activeSimpleSlider'); // добавляем класс следующему слайду
                    nextSlide.style.opacity = '0';
                    nextSlide.style.display = 'block';
                    var alNS = new animationLab(nextSlide);
                    alNS.fadeIn(1000);
                });
            }
        }
    }

    this.prevFade = function(event){

    }

    this.classRemove = function(obj, className){
        obj.className =
            obj.className.replace(new RegExp('\\b' + className + '\\b'),'');
    }

    this.addClass = function(obj, className){
        obj.className += " " + className;
    }

}