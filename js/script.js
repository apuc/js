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

    var slider = new SimpleSlider({
        selector:'mySlider'
        , width:900
        , loop:false
    });
    slider.init();


    var form = document.getElementById('myForm');
    var input = document.getElementsByClassName('myInput');
    //console.log(input[0]);
    for (var i=0;i<input.length;i++){
        input[i].onblur = onblurFunc;
    }
    function onblurFunc(){
        //console.log(form.checkValidity());
    }
}