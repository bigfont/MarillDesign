!function ($) {

    function populateCarousel() {
        var carouselSelector, indicators, indicator, items, item, cssClass, imgName, imgDir, imgSrc, imgCount;

        imgCount = 6;

        carouselSelector = '#myCarousel';

        indicators = $(carouselSelector).find('.carousel-indicators');
        items = $(carouselSelector).find('.carousel-inner');

        imgDir = 'assets-25/site/img/carousel/';

        for (var i = 0; i < imgCount; i++) {

            // reset image name inside the loop!
            imgName = 'photo_.png';

            // set the img src
            imgName = imgName.replace('_', i);
            imgSrc = imgDir + imgName;

            // add an indicator
            indicator = $('<li/>', { 'data-target': '#myCarousel', 'data-slide-to': i, 'class': cssClass });
            indicators.append(indicator);

            // add an item
            img = $('<img/>', { src: imgSrc });
            item = $('<div/>', { 'class': 'item' }).appendTo(items);
            item.append(img);
            items.append(item);

            if (i === 0) {
                indicator.addClass('active');
                item.addClass('active');
            }
        }
    }

    function enablePopover() {
        $("a[data-toggle=popover]")
        .popover({ delay: 500, trigger: 'hover' })
        .click(function (e) {
            e.preventDefault()
        })
    }

    function comingSoon() {
        $('a.coming-soon').click(
            function (e) {
            $(this).text('COMING SOON');
        });
    }

    $(function () {

        // enablePopover();

        comingSoon();

        populateCarousel();

        // initialize the carousel
        $('#myCarousel').carousel();
    })
}(window.jQuery)