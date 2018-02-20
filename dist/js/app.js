$(function(){

    function fadeIn() {
        setTimeout(function () {
            $(".slideInText").addClass("active");
        }, 500)
    }
    fadeIn();


    function scrollAfterClick(){
        $(".navbar a").on("click", function(e){
        e.preventDefault();

        const href = $(this).attr("href");
        const $section = $(href);

        $('html').animate({
            scrollTop: $section.offset().top
        },1000);

    });
    }

    scrollAfterClick();

});