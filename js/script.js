document.addEventListener("DOMContentLoaded", ready);
function ready() {
    //vars
    /*var getClass = document.getElementsByClassName('class_el');
    var getClassOne = document.getElementsByClassName('class_el_1');
    var getId = document.getElementById('el_1');
    console.log(getClass);
    console.log(getClassOne);
    console.log(getId);*/

    //functions
    //test_1();
    //test_for();
    //test_args('Hello 123', null);

    //classes
    /*var testClass = new TestClass();
    console.log(testClass.name);
    testClass.testMethod();*/

    //man.say("Привет");

    var al = new animationLab('#test');
    /*al.fadeIn(3000, function(){
        al.fadeOut(3000);
    });*/

/*     al.slideUp(1000, function(){
         al.slideDown(1000);
     });*/

     al.toggle(3000, function(){
        al.toggle(3000); 
     });


    var slider = new SimpleSlider({
        selector:'mySlider'
        , width:900
        , loop:false
        , nextArrow: '<img src="https://cdn0.iconfinder.com/data/icons/website-kit-2/512/icon_403-16.png">'
        , prevArrow: '<img src="https://cdn0.iconfinder.com/data/icons/website-kit-2/512/icon_402-16.png">'
    });
    slider.init();

    var valid = new Validation();
    valid.init({
        class: "valItem",
        eventElement:'#sub',
        event:'onblur',
        ajaxUrl:'ajax.php',
        ajax:false
        /*ajaxOnblurSuccess: function(responseText, err, form) {
            if(err){
                alert('Ошибка');
            }
            else {
                alert('Ура');
            }
        }*/
        /*ajaxSubmitSuccess: function(responseText, err, form){
            console.log(err);
        }*/
    });

    var form = document.getElementById('myForm');
    var input1 = document.getElementById('myInput1');
    var input = document.getElementsByClassName('myInput_');// сломал waryataw

    //console.log(input[0]);
    for (var i=0;i<input.length;i++){
        input[i].onblur = onblurFunc;
    }
    function onblurFunc(){
        if(!this.checkValidity()){
            this.style.border = "1px solid red";
            this.setCustomValidity(this.getAttribute('data-msg'));
        }
        else {
            this.style.border = "1px solid green";
        }
    }
}