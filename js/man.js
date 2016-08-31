function Man(options){
    this.defaultParams = {
        name: "первая строка",
        lastName: "вторая строка"
    };
    this.finalParams = this.defaultParams;

    // Перебираем все свойства paramObject
    for (var key in options) {
        // Если текущее свойство было унаследовано от цепочки прототипов, пропускаем его
        if (options.hasOwnProperty(key)) {
            // Если текущее свойство определено,
            // добавляем его в finalParams
            if (options[key] !== undefined) {
                this.finalParams[key] = options[key];
            }
        }
    }
    this.options = this.finalParams;

    this.name = this.options.name;
    this.lastName = this.options.lastName;

    this.say = function(msg){
        alert(msg);
    }
}