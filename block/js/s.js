document.addEventListener("DOMContentLoaded", ready);
function ready() {
    var block = new Block();
    block.init({
        headerId:'h_1',
        bodyId:'b_1'
    });

    BlockChild.prototype = new Block();

    var blockChild = new BlockChild();
    blockChild.init({
        headerId:'h_2',
        bodyId:'b_2'
    });

    console.log(blockChild);
}