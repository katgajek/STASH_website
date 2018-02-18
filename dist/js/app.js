$(function(){

    function slideIn() {
        setTimeout(function () {
            $(".slideInText").addClass("active");
        }, 500)
    }
    slideIn();


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