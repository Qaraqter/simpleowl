module.exports = function($args) {
    var dotsContainer = {};

    $.each( $('[' + this.settings.dataSelectors.dots + ']'), function(idx, elm) {
        dotsContainerElm = $(elm);

        if(dotsContainerElm.attr(this.settings.dataSelectors.forContainer) === this.container.attr("id")) {
            dotsContainerElm.attr('data-indentifier', this.guid);

            dotsContainer.active = true;
            dotsContainer.elm = '[data-indentifier="' + this.guid + '"]';
        }
    }.bind(this));

    return dotsContainer;
};
