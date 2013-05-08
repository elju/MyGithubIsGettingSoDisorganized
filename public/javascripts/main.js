$(document).on('ready', function() {
    var $slices, $artwork, $activeHeap, undoInvert, pullUpViewer, Inverter;
    $slices = $('.slice');
    $slices.on('click', function alternate (e) {
        console.log(e);
        if (!$(document.documentElement).hasClass('inverted')) { 

            e.stopPropagation();
            var $this, $right, $left, $others;

            if ($(this).data('clicked')) {
                $('#warp').removeClass('go goone gotwo gothree gofour')
                $('.slice').removeClass('right1 right2 right3 left1 left2 left3 scrollEnabled');
                $(this).data('clicked', false);
            } else {
                $right = $slices.filter('#' + this.id + ' ~ a');
                $left = $slices.not($right).not(this);
                $left.each(function(i) {
                    $(this).addClass('left' + ($left.length - i));} );
                $right.each(function(i) {
                    $(this).addClass('right' + (i + 1)); });
                $('#warp').addClass('go').addClass('go' + this.id);
                $(this).data('clicked', true);
                var that = this;
                if (this.id === "two") { // dumb hack to catch the art subwindow right now.
                    ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd'].forEach(function (evnt, i) {
                    // set timeout is functional, so I have to make a wrapper function to attach an event. The plot thickens...
                        console.log("about to call set timeout!");
                        $(that).on(evnt, function(e) {
                            setTimeout(function () {
                                if (!$(that).data('clicked')) {
                                    return; }
                                console.log("done with set timeout.");                         // apparently I already made it so that
                                $(that).children().addClass('scrollEnabled'); }, 1500);});} ); // overflow-y get's added :-/
                }
                                                                                                        // learn something new everyday!
            }
        } else {
            e.preventDefault();
        }
    } );

    Inverter =
    {
        pullUpViewer : function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            $('.artwork').off('click');
            ($activeHeap = $this.parent().parent()).addClass('art-front-and-center');     // This triggers the necessary classes to invert everything else.
            $(document.documentElement).addClass('inverted');
            $(document.body).on('click', Inverter.undoInvert);
            var $artscont = $('#one > .subwindow');
            $('<div>').attr('id','screen').height($("#arts-container").height()).click(
                function(e) {
                    $(this).off('click').remove();
                    $('.art-front-and-center').removeClass('art-front-and-center');
                    $(document.documentElement).removeClass('inverted');
                    $('.artwork').click(pullUpViewer);
                    return null;
                }).appendTo($artscont);
        },

        undoInvert : function undoInvert (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).off('click');
            $('.artwork').on('click', Inverter.pullUpViewer).parent().parent().removeClass('art-front-and-center');
            $(document.documentElement).removeClass('inverted'); 
            return false;
        }
    };

    $('.artwork').on('click', Inverter.pullUpViewer);

});
