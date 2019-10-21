$( document ).ready(function() {
    $('.cta-open').on('click', function() {
      $('.toggle-form, .formwrap, .toggle-bg').addClass('active');
      $('.icon-close').addClass('open');
  });
   $('.icon-close').on('click', function() {
      $('.toggle-form, .formwrap, .toggle-bg').removeClass('active');
      $('.icon-close').removeClass('open');
  });
});