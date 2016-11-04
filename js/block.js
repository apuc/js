function Block(){

    this.init = function(options){
        this.defaultParams = {
            headerId:'header',
            bodyId:'body'
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

        this._body = document.getElementById(this.options.bodyId);

        this.addEv();
    }

    this.addEv = function(){
        document.getElementById(this.options.headerId).onclick = this._toggle.bind(this);
    }

    this._hide = function(){
        this._body.style.display = 'none';
    }

    this._show = function(){
        this._body.style.display = 'block';
    }

    this._toggle = function () {
        var display = getComputedStyle(this._body).display;
        if (display == 'block') {
            this._hide();
        } else {
            this._show();
        }
    }
}