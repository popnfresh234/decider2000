$(() => {
  $('#menu-links').on('click', '.item', function(event) {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    if ($(this).text() === "Share"){
      $('#content-share').removeClass('hidden-link').addClass('visible-link')
      $('#content-result').removeClass('visible-link').addClass('hidden-link');
    } else {
      $('#content-result').removeClass('hidden-link').addClass('visible-link');
      $('#content-share').removeClass('visible-link').addClass('hidden-link')
    }
  })
});
