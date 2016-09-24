function Validation() {

    this.init = function (options) {
        this.defaultParams = {
            class: "valItem",
            tagNameErrorMessage: "data-msg",
            event: 'submit',
            eventElement: '#submit',
            errorClass: 'inputError',
            errorMessageClass: 'errorMsgClass'
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
        } else if (this.options.event == 'onblur') {
            var valElements = this.getValInput();
            for (var i = 0; i < valElements.length; i++) {
                valElements[i].onblur = this.customValidationOnblur.bind(this);
            }
        }
    }

    this.customSubmit = function (event) {
        event.preventDefault();
        var validationElements = document.getElementsByClassName(this.options.class);
        var form = this.getParent(this.getSubmitElement(), 'FORM');
        var flag = [];
        for (var i = 0; i < validationElements.length; i++) {
            var next = validationElements[i].nextSibling;
            if (next.classList.contains(this.options.errorMessageClass)) {
                next.parentNode.removeChild(next);
            }
            if (validationElements[i].hasAttribute('data-tpl')) {

            }
            else {
                if (!validationElements[i].checkValidity()) {
                    validationElements[i].classList.add(this.options.errorClass);
                    this.generateErrorMsg(validationElements[i]);
                    flag.push(false);
                }
                else {
                    validationElements[i].classList.remove(this.options.errorClass);
                    flag.push(true);
                }
            }

        }
        if (this.findFalse(flag)) {
            form.submit();
        }
    }
    //waryatav
    this.customValidationOnblur = function (event) {
        var validationElement = event.target;
        var next = validationElement.nextSibling;
        if (next.classList.contains(this.options.errorMessageClass)) {
            next.parentNode.removeChild(next);
        }
        if (validationElement.hasAttribute('data-tpl')) {

        }
        else {
            if (!validationElement.checkValidity()) {
                //validationElement.classList.add(this.options.errorClass);
                this.generateErrorMsg(validationElement);
            }
            else {
                this.ajaxValidPost(validationElement);
            }
        }
    }
    //waryatav

    this.getParent = function (obj, parentTagName) {
        return (obj.tagName == parentTagName) ? obj : this.getParent(obj.parentNode, parentTagName);

    }

    this.generateErrorMsg = function (vEl) {
        vEl.classList.add(this.options.errorClass);
        if (vEl.hasAttribute(this.options.tagNameErrorMessage)) {
            var errorMsg = document.createElement('span');
            errorMsg.classList.add(this.options.errorMessageClass);
            errorMsg.innerHTML = vEl.getAttribute(this.options.tagNameErrorMessage);
            this.insertAfter(errorMsg, vEl);
        }
    }

    this.generateAjaxErrorMsg = function (vEl, msg) {
        vEl.classList.add(this.options.errorClass);
        var errorMsg = document.createElement('span');
        errorMsg.classList.add(this.options.errorMessageClass);
        errorMsg.innerHTML = msg;
        this.insertAfter(errorMsg, vEl);
    }

    this.getSubmitElement = function () {
        var submitElement;

        if (this.options.eventElement[0] == '#') {
            submitElement = document.getElementById(this.options.eventElement.slice(1));
        }
        else {
            submitElement = document.getElementsByClassName(this.options.eventElement.slice(1));
        }
        return submitElement;
    }

    this.getValInput = function () {
        var valInput;

        valInput = document.getElementsByClassName(this.options.class);

        return valInput;
    }

    this.insertAfter = function (elem, refElem) {
        var parent = refElem.parentNode;
        var next = refElem.nextSibling;
        if (next) {
            return parent.insertBefore(elem, next);
        } else {
            return parent.appendChild(elem);
        }
    }

    this.findFalse = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === false) {
                return false;
            }
        }
        return true;
    }

    this.ajaxValidPost = function (validationElement) {
        if (validationElement.hasAttribute('data-url')) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', validationElement.getAttribute('data-url'), true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            var obj = this;
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) return;
                console.log(xhr.responseText);
                if (xhr.status == 200) {
                    var ans = JSON.parse(xhr.responseText);
                    if(ans.status == 0){
                        obj.generateAjaxErrorMsg(validationElement, ans.error_msg);
                    }
                    else {
                        obj.deleteErrorMsg(validationElement);
                    }
                }
                else {
                    //obj = {status: 0, error_msg: xhr.status};
                    obj.generateAjaxErrorMsg(validationElement, 'Ошибка ' + xhr.status);
                }
            };
            xhr.send(validationElement.getAttribute('name') + '=' + encodeURIComponent(validationElement.value));
        }
    }

    this.deleteErrorMsg = function(vEl){
        vEl.classList.remove(this.options.errorClass);
        if(vEl.nextSibling.classList.contains(this.options.errorMessageClass)){
            vEl.nextSibling.remove();
        }
    }
}