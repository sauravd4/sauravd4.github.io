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
            $('.contentpage').load('/Contact.html');
        }

        function Home(ele)
        {
                        if(window.screen.width < 768 )
                iconToggle();
                        $(ele).parent().siblings().removeClass('active');
            $(ele).parent().addClass('active');

            $('.contentpage').load('/Home.html');

        }

function iconToggle()
{
      $(".mobilenav").fadeToggle(500);
      $(".top-menu").toggleClass("top-animate");
      $(".mid-menu").toggleClass("mid-animate");
      $(".bottom-menu").toggleClass("bottom-animate");
}


