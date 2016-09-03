function validation(options){
    this.defaultParams = {
        class: "valItem",
        tagNameValPattern:"data-val",
        tagNameMessage: "data-msg"

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

     var validationElements = document.getElementsByClassName(this.options.class);
    for (var i=0;i<validationElements.length;i++){
        var pattern = validationElements[i].getAttribute(this.options.tagNameValPattern);

        if(pattern !== null){
            validationElements[i].onblur=function () {
                patjson= pattern.toJSON;
                if(this.value !== patjson){
                    this.style.border = "1px solid red";
                } else{
                    this.style.border = "1px solid transporent";
                    console.log("its ok");
                }
            };

        }
    }

}