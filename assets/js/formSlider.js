$(document).ready(function () {
    $('.cta-open').on('click', function () {
        $('.toggle-form, .formwrap, .toggle-bg').addClass('active');
        $('.feedback-close').addClass('open');
        $('.beta-feedback-link').addClass('beta-feedback-link-disabled');
        $('.beta-feedback-icon').addClass('beta-feedback-icon-disabled');
    });
    $('.feedback-close').on('click', function () {
        $('.toggle-form, .formwrap, .toggle-bg').removeClass('active');
        $('.feedback-close').removeClass('open');
        $('.beta-feedback-link').removeClass('beta-feedback-link-disabled');
        $('.beta-feedback-icon').removeClass('beta-feedback-icon-disabled');
    });
    $('#feedback').on('submit', function (e) {
        var formData = $('#feedback').serializeArray();
        var feedbackData = {
            feedback: [{ comment: formData[0].value, email: formData[1].value }]
        };
        $.ajax({
            type: 'POST',
            url: '/ghost/api/v2/content/beta/feedback?key=' + process.env('GHOST_FEEDBACK_API_KEY'),
            data: JSON.stringify(feedbackData),
            success: function () {},
            dataType: 'json',
            contentType: 'application/json'
        });
        $('.toggle-form, .formwrap, .toggle-bg').removeClass('active');
        $('.feedback-close').removeClass('open');
        $('.beta-feedback-link').removeClass('beta-feedback-link-disabled');
        $('.beta-feedback-icon').removeClass('beta-feedback-icon-disabled');
    });
});
