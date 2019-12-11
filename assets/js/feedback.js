$(document).ready(function () {
    $('.cta-open').on('click', function () {
        $('.toggle-form, .formwrap, .toggle-bg').addClass('active');
        $('.feedback-close').addClass('open');
        $('.beta-feedback-link').addClass('beta-feedback-link-disabled');
        $('.beta-feedback-icon').addClass('beta-feedback-icon-disabled');
        $('.grecaptcha-badge').addClass('grecaptcha-badge-enable');
    });
    $('.feedback-close').on('click', function () {
        $('.toggle-form, .formwrap, .toggle-bg').removeClass('active');
        $('.feedback-close').removeClass('open');
        $('.beta-feedback-link').removeClass('beta-feedback-link-disabled');
        $('.beta-feedback-icon').removeClass('beta-feedback-icon-disabled');
        $('.grecaptcha-badge').removeClass('grecaptcha-badge-enable');
    });
    $('#feedback').on('submit', function (e) {
        event.preventDefault();

        document.getElementById('error-alert').style.display = 'none';
        var email= $('#email').val();
        var comment = $('#comment').val();

        grecaptcha.ready(function() {
            grecaptcha.execute('6LdBDscUAAAAAAQrcc0cyKbKPCZ__w7AxhKNLCED', {action: 'feedback'}).then(function (token) {                
                var feedbackData = {
                    query: 'mutation{createFeedback(appID:"' + feedbackAppId + '",email:"' + email + '", comment:"' + comment + '",token:"' + token + '"){id}}'
                };
        
                $.ajax({
                    type: 'POST',
                    url: feedbackMsUrl,
                    data: JSON.stringify(feedbackData),
                    success: function () {},
                    dataType: 'json',
                    contentType: 'application/json'
                });
            });
        });


        $('.toggle-form, .formwrap, .toggle-bg').removeClass('active');
        $('.feedback-close').removeClass('open');
        $('.beta-feedback-link').removeClass('beta-feedback-link-disabled');
        $('.beta-feedback-icon').removeClass('beta-feedback-icon-disabled');
        $('#feedback')[0].reset();
        $('#success-notification').fadeIn(300).delay(4000).fadeOut(400);
        $('.grecaptcha-badge').removeClass('grecaptcha-badge-enable');
    });
});