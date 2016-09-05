function Validation() {

    this.init = function (options) {
        this.defaultParams = {
            class: "valItem",
            tagNameErrorMessage: "data-msg",
            event: 'submit',
            eventElement: '#submit',
            errorClass:'inputError',
            errorMessageClass:'errorMsgClass'
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



        if (this.options.event == 'submit') {
            var submitElement = this.getSubmitElement();
            submitElement.onclick = this.customSubmit.bind(this);
        }else if(this.options.event == 'onblur'){
            var valElements = this.getValInput();
            for (var i = 0; i < valElements.length; i++) {
                console.log(valElements);
                valElements.onblur  = this.customValidationOnblur.bind(this);

            }

        }
    }

    this.customSubmit = function (event) {
        event.preventDefault();
        var validationElements = document.getElementsByClassName(this.options.class);
        var form = this.getParent(this.getSubmitElement(), 'FORM');
        var flag = true;
        for (var i = 0; i < validationElements.length; i++) {
            var next = validationElements[i].nextSibling;
            if(next.classList.contains(this.options.errorMessageClass)){
                next.parentNode.removeChild(next);
            }
            if (validationElements[i].hasAttribute('data-tpl')) {

            }
            else {
                if (!validationElements[i].checkValidity()) {
                    validationElements[i].classList.add(this.options.errorClass);
                    if(validationElements[i].hasAttribute(this.options.tagNameErrorMessage)){
                        var errorMsg = document.createElement('span');
                        errorMsg.classList.add(this.options.errorMessageClass);
                        errorMsg.innerHTML = validationElements[i].getAttribute(this.options.tagNameErrorMessage);
                        //var errorMsg = '<span class="' + this.errorMessageClass + '">' + validationElements[i].getAttribute(this.options.tagNameErrorMessage) + '</span>';
                        this.insertAfter(errorMsg,validationElements[i])
                    }
                    flag = false;
                }
                else {
                    validationElements[i].classList.remove(this.options.errorClass);
                    flag = true
                }
            }

        }
        if(flag){
            form.submit();
        }
    }
    //waryatav
    this.customValidationOnblur = function (event) {
        console.log("its ok");


    }
    //waryatav

    this.getParent = function (obj, parentTagName) {
        return (obj.tagName==parentTagName)?obj:this.getParent(obj.parentNode, parentTagName);

    }

    this.getSubmitElement = function(){
        var submitElement;

        if (this.options.eventElement[0] == '#') {
            submitElement = document.getElementById(this.options.eventElement.slice(1));
        }
        else {
            submitElement = document.getElementsByClassName(this.options.eventElement.slice(1));
        }
        return submitElement;
    }
//Waryatav
    this.getValInput = function(){
        var submitElement;

        if (this.options.class[0] == '#') {
            submitValInput = document.getElementById(this.options.class);
        }
        else {
            submitValInput = document.getElementsByClassName(this.options.class);
        }

        return submitValInput;
    }
    //Waryatav
    this.insertAfter = function (elem, refElem) {
        console.log(refElem);
        var parent = refElem.parentNode;
        console.log(parent);
        var next = refElem.nextSibling;
        console.log(next);
        if (next) {
            return parent.insertBefore(elem, next);
        } else {
            return parent.appendChild(elem);
        }
    }

}