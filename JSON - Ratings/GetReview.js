$.getJSON('https://hindi-devo.ptlp.co/api/userpratilipi/review/list?pratilipiId=5728283396145152&resultCount=5', function (data) {
    console.log(data);
    Display(data);
});

function Display(data)
{
    var review = new Object();
    var divHtml = $(".divReview:first-child").clone();
    for (var i = 0; i < data.reviewList.length;i++)
    {
        debugger;
        $(divHtml).find('.name').text(data.reviewList[i].userName);
        $(divHtml).find('.Review').text(data.reviewList[i].review);
        $(divHtml).find('.userImg').attr("src", "https://hindi-devo.ptlp.co" + data.reviewList[i].userImageUrl);
        $(divHtml).find('.like').text(data.reviewList[i].likeCount);
        $(divHtml).find('.comment').text(data.reviewList[i].commentCount);
        $(divHtml).find('.stars').text(data.reviewList[i].rating);
        var date = new Date(data.reviewList[i].reviewDateMillis);
        var mil = Math.abs(new Date() - date);
        var seconds = (mil / 1000) | 0;
        mil -= seconds * 1000;

        var minutes = (seconds / 60) | 0;
        seconds -= minutes * 60;
        var hours = (minutes / 60) | 0;
        minutes -= hours * 60;
        var days = (hours / 24) | 0;
        hours -= days * 24;
        var weeks = (days / 7) | 0;
        days -= weeks * 7;
        if (days == 0)
        {
            if (hours==0)
                $(divHtml).find('.time').text(minutes + " minutes ago");
            else
                $(divHtml).find('.time').text(hours + " hours ago");
        }
        else
            $(divHtml).find('.time').text(days + " days ago");

        $(divHtml).appendTo(".allReviews");
        divHtml = $(".divReview:first-child").clone();
        console.log(data.reviewList[i].userName);
    }
    $(".divReview:first-child").hide();
    $(function () {
        $('span.stars').stars();
    });
}

$.fn.stars = function () {
    return $(this).each(function () {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}

