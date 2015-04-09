module.exports = function(container) {
    var $self = this;

    // Recalculate layout
    this.container.on('resize.owl.carousel', function(event) {
        $self.utils._getMediaQueries.call($self, '.item');
    });

    // Set events to data-carousel-prev and data-carousel-next
    $('[' + $self.settings.dataSelectors.next + '], [' + $self.settings.dataSelectors.prev + ']').off('click').on('click', function(e) {
        var $elm = $(e.delegateTarget),
            forContainer = $elm.attr($self.settings.dataSelectors.forContainer),
            isNext = ( $elm.attr($self.settings.dataSelectors.next) !== null && $elm.attr($self.settings.dataSelectors.next) !== undefined );

        if( forContainer === null || forContainer === undefined ) {

            $.each($self.instances, function(idx, elm) {
                if(isNext) {
                    elm.owl.next();
                } else {
                    elm.owl.prev();
                }
            });

        } else {

            if(isNext) {
                container.owl.next();
            } else {
                container.owl.prev();
            }

        }

    });

};
