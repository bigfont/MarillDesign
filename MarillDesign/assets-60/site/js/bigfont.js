(function ($) {

    "use strict";
    /*global $, jQuery, window*/

    function createPictureFillMarkup(imgDir, imgFullName, altText) {
        var imgSrc, resizedDir, resizedFullName, resizedSrc, spanPicture, spanDefault, spanResized, spanNoScript, dictionary;

        // TODO Ensure that this dictionary stays in ascending order
        // Is it better to use an array for this? Do objects have non-guarenteed order?
        dictionary = {
            resizePhone: 320,
            resizePhoneToTablet: 480,
            resizePortraitTablet: 768,
            resizeDesktop: 980,
            resizeLarge: 1200
        };

        spanPicture = $('<span data-picture data-alt="' + altText + '">');

        imgSrc = imgDir + imgFullName;
        spanDefault = $('<span data-src="' + imgSrc + '"></span>');
        spanPicture.append(spanDefault);

        resizedDir = imgDir + 'resized/';
        jQuery.each(dictionary, function (mediaName, mediaWidth) {

            resizedFullName = imgFullName.replace('.', '-' + mediaName + '.');
            resizedSrc = resizedDir + resizedFullName;
            spanResized = $('<span data-src="' + resizedSrc + '" data-media="(min-width:' + mediaWidth + 'px)"></span>');
            spanPicture.append(spanResized);

        });

        // the last resizedSrc should be the smallest
        spanNoScript = $('<noscript>' +
            '<img data-src="' + resizedSrc + '" alt="' + altText + '">' +
            '</noscript>');

        spanPicture.append(spanNoScript);

        return spanPicture;
    }

    function populateCarousel() {
        var i, carouselSelector, indicators, indicator, items, item, cssClass, img, imgName, imgDir, imgCount;

        imgCount = 6;

        carouselSelector = '#myCarousel';

        indicators = $(carouselSelector).find('.carousel-indicators');
        items = $(carouselSelector).find('.carousel-inner');

        imgDir = 'assets-60/site/img/carousel/';

        for (i = 0; i < imgCount; i += 1) {

            // reset image name inside the loop!
            imgName = 'photo_.png';

            // set the img src
            imgName = imgName.replace('_', i);

            // add an indicator
            cssClass = ''; // required by bootstrap carousel
            indicator = $('<li/>', { 'data-target': '#myCarousel', 'data-slide-to': i, 'class': cssClass });
            indicators.append(indicator);

            // add an item
            img = createPictureFillMarkup(imgDir, imgName);
            item = $('<div/>', { 'class': 'item' }).appendTo(items);
            item.append(img);
            items.append(item);

            if (i === 0) {
                indicator.addClass('active');
                item.addClass('active');
            }
        }
    }

    function comingSoon() {
        $('a.coming-soon').click(
            function () {
                $(this).text('COMING SOON');
            }
        );
    }

    $(function () {

        // enablePopover();

        comingSoon();

        populateCarousel();

        // initialize the carousel
        $('#myCarousel').carousel();
    });
}(window.jQuery));