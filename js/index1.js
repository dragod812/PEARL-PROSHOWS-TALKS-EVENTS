
$(document).ready(function () {
	swal({
  title: "Registration Guidelines!",
  text: '1. Click View more to see event description<br>2. Check the Docs for rules and contacts<br>3. CLick "Add to Cart" to register for Events<br>4. Click on " Cart" option in bottom right corner to  finish registration<br>5. To confirm your registration pay the fees, <b>Except pro shows</b> for which you\'ll have to buy a separate ticket<br>6. Check out for mail from Pearl after registration that you need to enter while making payments <br>',
  html: true
});

	$("#added_notif").css('display','none');


    $('#nav li').click(function(){
        $(this).removeClass('stacked').addClass('open').siblings().removeClass('open').addClass('stacked');
    });
    $('#nav li .escape').click(function(e){
        $(this).parent().removeClass('open').siblings().removeClass('stacked');
        e.stopPropagation();
    });
    $('ul.navigation > li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('#nav > li.enabled').removeClass('enabled');
        var category = ($(this).data('category'));
        console.log(category);
        $("#nav > li[data-category=" + category + "]").addClass('enabled').removeClass('open').removeClass('stacked');
        if(category == 13)
        {
        	$('body').css({'overflow':'visible'});
        }
        else
        {
        	$('body').css({'overflow':'hidden'});
        	$('body').animate({
        		scrollTop:0
        	}, 100);
        }
    })
		$(".accrd").click(function(){
			$(".one").slideToggle(700);
			$(".two").removeClass('active');
			$("#nav > li[data-category=0]").addClass('enabled').removeClass('open').removeClass('stacked');
			$('ul.navigation > li[data-category=0]').addClass('active').siblings().removeClass('active');
		});
		$(".prshow, .talks").click(function(){
			$(".one").slideUp(700);
		})
		$

    // Ajax call

    $(".add_button").click(function() {
        var action = $(this).attr("data-action");
        var id = $(this).attr("data-event-id");
        $.ajax({
            type : "GET",
            dataType : "xml",
            url : "handleCart.php?id=" + id + "&action=" + action,
            success : function (data) {
                var status = $(data).find("status").text();
                $("#added_notif").text(status).fadeIn(200).fadeOut(2500);
            }
        })
    })
});
