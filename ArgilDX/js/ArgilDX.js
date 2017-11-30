            $(document).ready(function () {
            $(".icon").click(function () {
                iconToggle();
            });
            });

        function Contact(ele)
        {
                        if(window.screen.width < 768 )
                iconToggle();
            $(ele).parent().siblings().removeClass('active');
            $(ele).parent().addClass('active');
            $('.contentpage').load('ArgilDX/Contact.html');
        }

        function Home(ele)
        {
                        if(window.screen.width < 768 )
                iconToggle();
                        $(ele).parent().siblings().removeClass('active');
            $(ele).parent().addClass('active');

            $('.contentpage').load('ArgilDX/Home.html');

        }

function iconToggle()
{
      $(".mobilenav").fadeToggle(500);
      $(".top-menu").toggleClass("top-animate");
      $(".mid-menu").toggleClass("mid-animate");
      $(".bottom-menu").toggleClass("bottom-animate");
      $('body').toggleClass("stop-scrolling");
        }

function logoClick()
{
    $('.btnContact').removeClass("active");
    $('.btnHome').addClass("active");
    $('.contentpage').load('ArgilDX/Home.html');
}


