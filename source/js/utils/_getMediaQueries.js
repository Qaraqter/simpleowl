/**
*/
module.exports = function(selector) {
/*
    // Remove applied styles to get the current responsive width
    this.container.find('.' + this.settings.itemSelector).attr('style', '');

    // Calculate percentage based on parent width (no percentage!)
    this.itemWidth = Math.round(100 * parseFloat($(selector).css('width')) / parseFloat($(selector).parent().css('width')));

    // How many items fits within 100%
    this.items = 100 / this.itemWidth;

    // Apply 100% to the item class (Owl will clone this and set an absolute width)
    this.container.find('.' + this.settings.itemSelector).css('width', "100%");

    // Apply calculations to owlCarousel
    this.instances[this.guid].owl.options.responsive[0].items = this.items;
    this.instances[this.guid].owl.refresh();
    */


    var item = parseFloat(this.itemResponsive.css('width')),
        container = parseFloat(this.container.css('width'));

    // Calculate percentage based on parent width (no percentage!)
    this.itemWidth = Math.round((100 * item) / container);

    // How many items fits within 100%
    this.items = Math.round(100 / this.itemWidth);

    // Apply 100% to the item class (Owl will clone this and set an absolute width)
    this.container.find(this.settings.itemSelector).css('width', "100%");

    // Apply calculations to owlCarousel
    this.instances[this.guid].owl.options.responsive[0].items = this.items;
    this.instances[this.guid].owl.refresh();

};
