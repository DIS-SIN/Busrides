$( document ).ready(function() {
    $('.cta-open').on('click', function() {
      $('.toggle-form, .formwrap, .toggle-bg').addClass('active');
      $('.icon-close').addClass('open');
  });
   $('.icon-close').on('click', function() {
      $('.toggle-form, .formwrap, .toggle-bg').removeClass('active');
      $('.icon-close').removeClass('open');
  });
  $('#feedback').on('submit',(function(e) {
    var formData = $("#feedback").serializeArray();
    var feedbackData = {
      "feedback":[{"comment":formData[0].value,"email":formData[1].value}]       
    }
    $.ajax({
      type: "POST",
      url: "/ghost/api/v2/content/beta/feedback?key=6d95c73663e7a0cef99607a8a0",
      data: JSON.stringify(feedbackData),
      success: function(){},
      dataType: "json",
      contentType : "application/json"
    });
    $('.toggle-form, .formwrap, .toggle-bg').removeClass('active');
    $('.icon-close').removeClass('open');


  }))
});