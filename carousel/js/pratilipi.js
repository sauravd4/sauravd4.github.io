$(document).ready(function () {
    simplecarousel('mycarousel');
    simplecarousel('mycarousel2');
    simplecarousel('mycarousel3');
    simplecarousel('mycarousel4');
    simplecarousel('mycarousel5');
    simplecarousel('mycarousel6');
    simplecarousel('mycarousel7');
})



function simplecarousel(setting) {
    var gallerydefaults = {
        navhtml: ['<div class="btnnav"><span>&#65513;</span></div>', '<div class="btnnav right"><span>&#65515;</span></div>'],
        dragleeway: 40, // number of pixels users can drag when at the start/end of carousel before it bounces back
        bounceduration: 0.5 // the duration in seconds for the carousel to bounce back

    }
    var $ = jQuery
    var s = $.extend({}, gallerydefaults, setting)
    s.bounceduration = parseFloat(s.bounceduration) + 's'
    var $carousel = $('#' + setting)
    var $belt = $carousel.find('.belt:eq(0)')
    var mousemoveevtstr = 'mousemove.dragstart' + setting + ' touchmove.dragstart' + setting
    var cal = { carouselw: null, beltw: null }
    var bounds = [, ]
    var contentloaded = false
    var $btnnav = $(s.navhtml.join('')).appendTo($carousel)
    contentloaded = true
    setbounds()
    bounceback()
    showhidenav()



    function setbounds() {
        cal = { carouselw: $carousel.width(), beltw: $belt.outerWidth() }
        bounds = [0, Math.min(cal.carouselw - cal.beltw, 0)]
    }

    function bounceback() {
        $belt.css({ transitionDuration: s.bounceduration })
        if (parseInt($belt.css('left')) > bounds[0])
            $belt.css({ left: bounds[0] })
        if (parseInt($belt.css('left')) < bounds[1])
            $belt.css({ left: bounds[1] })
    }

    function showhidenav() {
        var beltleft = parseInt($belt.css('left'))
        if ($belt.outerWidth() < $carousel.width()) {
            $btnnav.hide()
            return
        }
        if (beltleft >= bounds[0])
            $btnnav.eq(0).hide()
        else
            $btnnav.eq(0).show()
        if ((beltleft <= bounds[1]))
            $btnnav.eq(1).hide()
        else
            $btnnav.eq(1).show()
    }

    $belt.on('transitionend webkitTransitionEnd', function (e) {
        var $target = $(e.target) // target
        if (/left/i.test(e.originalEvent.propertyName)) { // check event fired on "left" prop
            showhidenav()
        }
    })

    $btnnav.bind('click touchstart', function (e) {
        var e = (e.type.indexOf('touch') != -1) ? e.originalEvent.changedTouches[0] : e
        var $target = $(e.target)
        $target = ($target.hasClass('btnnav')) ? $target : $target.parent('.btnnav')
        var initialx = parseInt($belt.css('left'))
        var dir = ($target.hasClass('right')) ? 'right' : 'left'
        var newx = (dir == 'left') ? Math.min(initialx + cal.carouselw, bounds[0]) : Math.max(initialx - cal.carouselw, bounds[1])
        $belt.css('left', newx)
    })

    $belt.bind('click', function (e) {
        if ($belt.data('dx') != 0) // if dragging on belt instead of clicking on it
            e.preventDefault() // prevent default action
    })

    $belt.bind('mousedown touchstart', function (e) {
        var e = (e.type.indexOf('touch') != -1) ? e.originalEvent.changedTouches[0] : e
        var initialx = parseInt($belt.css('left'))
        var mousex = e.pageX
        $belt.css({ transitionDuration: '0s' }).data({ dx: 0 })
        setbounds()
        $(document).bind(mousemoveevtstr, function (e) {
            var e = (e.type.indexOf('touch') != '-1') ? e.originalEvent.changedTouches[0] : e
            var dx = e.pageX - mousex //distance to move horizontally
            var newx = (dx < 0) ? Math.max(bounds[1] - s.dragleeway, initialx + dx) : Math.min(bounds[0] + s.dragleeway, initialx + dx) // dx<0 = dragging left
            $belt.css({ left: newx }).data({ dx: dx })
            return false //cancel default drag action
        })
        if (e.type == "mousedown")
            return false //cancel default drag action
    })

    $(document).bind('mouseup touchend', function (e) {
        var e = (e.type.indexOf('touch') != -1) ? e.originalEvent.changedTouches[0] : e
        $(document).unbind(mousemoveevtstr)
        bounceback()
        showhidenav()
        if (e.type == "mouseup")
            return false
    })

    $(window).bind('resize', function (e) {
        setbounds()
        bounceback()
        showhidenav()
    })

}