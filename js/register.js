$('.contact-form').find('.form-control').each(function() {
  var targetItem = $(this).parent();
  if ($(this).val()) {
    $(targetItem).find('label').css({
      'top': '10px',
      'fontSize': '14px'
    });
  }
});
$('.contact-form').find('.form-control').focus(function() {
  $(this).parent('.input-block').addClass('focus');
  $(this).parent().find('label').animate({
    'top': '10px',
    'fontSize': '14px'
  }, 300);
});
$('.contact-form').find('.form-control').blur(function() {
  if ($(this).val().length == 0) {
    $(this).parent('.input-block').removeClass('focus');
    $(this).parent().find('label').animate({
      'top': '25px',
      'fontSize': '18px'
    }, 300);
  }
});

//Ajax calls


$(
    $form = $("#reg_form"),

    $(".remove-item").click(function() {
    	$(this).text('Removing').css('color','red');
        var action = $(this).attr("data-action");
        var id = $(this).attr("data-event-id");
        $.ajax({
            type : "GET",
            dataType : "xml",
            url : "handleCart.php?id=" + id + "&action=" + action,
            success : function (data) {
                if(action =='remove') {
                    $("tr[data-event-id ='" + id+ "'").remove();
                }
            }
        })
    }),

    //pre-populating form details
    $form.find("input[name='email']").blur(function validator() {
        var email = $form.find("input[name='email']").val();
        if(validateEmail(email)){
            $form.find("input[name='name']").val('').removeAttr('readonly');
            $form.find("select[name='gender']").val('male').removeAttr('disabled');
            $form.find("input[name='DOB']").val('').removeAttr('readonly');
            $form.find("input[name='college']").val('').removeAttr('readonly');
            $form.find("input[name='city']").val('').removeAttr('readonly');
            $form.find("input[name='phone']").val('').removeAttr('readonly');
            prePopulateForm(email);
        }
    }),
    // Form submission
    $form.submit(function(e) {
        e.preventDefault();

        $form.find("#reg_butt").text("Submitting...").attr('disabled','disabled');
        $form.find("select[name='gender']").removeAttr('disabled');
        if(formValidate())
        {
            $.ajax({
                type: "POST",
                dataType : "xml",
                url : "registercall.php",
                data : $form.serialize(),
                success : handleRegistrationResponse
            }).complete(function () {
                $form.find("#reg_butt").text("Register").removeAttr('disabled');
                $form.find('.form-control').parent('.input-block').removeClass('focus');
            });
        }
        else
        {
            $form.find("#reg_butt").text('Register').removeAttr('disabled');
        }
    }),
    
    $("#payment_butt").click(function () {
        window.open('http://bits-pearl.org/payment/index.php');
    })
);

// function to validate Email-id
function validateEmail(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

function DateValidate(DOB) {
    var dateRegex = /^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/;
    return dateRegex.test(DOB)
}
function phoneValidate(phone)
{
    var phoneRegex = /^[789]\d{9}$/;
    return phoneRegex.test(phone);
}
//
function prePopulateForm(email)
{
    $.ajax({
        type: "POST",
        dataType: "xml",
        url: "userdata.php",
        data: {'email': email},
        success : handlePrePopulateFormResponse
    });
}

handlePrePopulateFormResponse = function(data){
    var text = $(data).find("status").text();
    if(text == 'registered'){
        var $details = $(data).find("details"),
            email = $details.find("email").text(),
            name = $details.find("name").text(),
            gender = $details.find("gender").text(),
            DOB = $details.find("DOB").text(),
            college = $details.find("college").text(),
            city = $details.find("city").text(),
            phone = $details.find("phone").text(),
            $form_input = $('.contact-form').find('.form-control');

        $form_input.parent('.input-block').addClass('focus');
        $form_input.parent().find('label').animate({
            'top': '10px',
            'fontSize': '14px'
        }, 300);

        $form.find("input[name='email']").val(email);
        $form.find("input[name='name']").val(name).attr("readonly","readonly");
        $form.find("select[name='gender']").val(gender).attr("disabled","disabled");
        $form.find("input[name='DOB']").val(DOB).attr("readonly","readonly");
        $form.find("input[name='college']").val(college).attr("readonly","readonly");
        $form.find("input[name='city']").val(city).attr("readonly","readonly");
        $form.find("input[name='phone']").val(phone).attr("readonly","readonly");
        //displaying registered events
        // var $eventsRegd = $(data).find("eventsRegd").find("event");
        // $eventsRegd.each(function() {
        //     var name = $(this).find("name").text();
        //     console.log(name);
        //     $("#events_registered").append("<li>"+name+"</li>").css("display","block");
        // });
    }
};

function formValidate()
{
    var errorFlag = 0;
    var email = $form.find("input[name='email']").val(),
        name = $form.find("input[name='name']").val(),
        DOB = $form.find("input[name='DOB']").val(),
        college = $form.find("input[name='college']").val(),
        city = $form.find("input[name='city']").val(),
    phone = $form.find("input[name='phone']").val();
    if(!validateEmail(email))
    {
        errorFlag = 1;
        $('.email').css('display', 'block');
    }
    else
    {
        $('.email').css('display', 'none');
    }

    if($.trim(name).length == 0)
    {
        $('.fullname').css('display', 'block');
    }
    else
    {
        $('.fullname').css('display', 'none');
    }

    if(!DateValidate(DOB))
    {
        errorFlag =1;
        $('.DOB').css('display', 'block');
    }
    else
    {
        $('.DOB').css('display', 'none');
    }

    if($.trim(college).length == 0)
    {
        $('.college').css('display', 'block');
    }
    else
    {
        $('.college').css('display', 'none');
    }

    if($.trim(city).length == 0)
    {
        $('.city').css('display', 'block');
    }
    else
    {
        $('.city').css('display', 'none');
    }

    if(!phoneValidate(phone))
    {
        errorFlag =1;
        $('.phoneNumber').css('display', 'block');
    }
    else
    {
        $('.phoneNumber').css('display', 'none');
    }
    if(errorFlag == 0)
    {
        $('.validate').css('display','none');
        return true;
    }
    else if(errorFlag == 1)
    {
        return false;
    }
}

handleRegistrationResponse = function (data)
{
    var messageType,messageTitle,messageText;
    var $user_status = $(data).find("userRegistration").text();
    var $errors = $(data).find("eventErrors").find("eventErrorMessage").length;
    var userRegStatus = $(data).find("userRegistration").attr("status");
    var $mail_status = $(data).find("mailer").find("mailerMessage").text();
    if(!$errors && userRegStatus!=0)
    {
        var $pearl_id = $(data).find("pearlId").text();
        messageType = "success";
        messageTitle = "Successfully Registered";
        messageText = "Your pearl-id is " + $pearl_id + ". " + $mail_status+ "\n";
        swal({
            title : messageTitle,
            text : messageText,
            type : messageType
        });
        $form.find('input').each(function () {
            $(this).val('');
        });
    }
    else if(userRegStatus == 0)
    {
        messageType = "error";
        messageTitle = "Registration failed";
        messageText = $user_status;
    }
};
