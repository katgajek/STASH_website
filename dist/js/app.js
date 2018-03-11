$(function(){

    function fadeIn() {
        setTimeout(function () {
            $(".slideInText").addClass("active");
        }, 500)
    }
    fadeIn();


    function scrollAfterClick(){
        $(".navbar a").on("click tap", function(e){
        e.preventDefault();

        const href = $(this).attr("href");
        const $section = $(href);

        $('html').animate({
            scrollTop: $section.offset().top
        },1000);

    });
    }

    scrollAfterClick();

    function boxSlideIn(){

        $(window).scroll(()=>{
            const bottomOfItem = $(".services").offset().top + $(".services").outerHeight();
            const bottomOfWindow = $(window).scrollTop() + $(window).height();

            if (bottomOfWindow > bottomOfItem) {
                $(".services-box").each(function (index) {
                    $(this).delay(500 * index).addClass("active2");
                })
            }
        })
    }
    boxSlideIn();

});