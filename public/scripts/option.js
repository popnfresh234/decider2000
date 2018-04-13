$(() => {

  function postOptions(optionArray){
    let id = $('h1').data('id');

    $.ajax({
      url: '/polls/' + id + '/options/',
      method: 'POST',
      data: {options: optionArray},
      dataType: 'json',
      success: function(data) {
        if (typeof data.redirect == 'string'){
          window.location = data.redirect;
        }
      }
    });
  }

  var optionArray = [];
  var hidden = true;

  $('#button-add-option').on('click', function(event){
    var optionName = $('#input-option').find('input').val();
    var description = $('#input-description').find('input').val();

    //Build and appendlist item
    var item = $('<div class="item">');
    var leftFloatedContent = $('<div class="left floated content">')
    leftFloatedContent.append('<div class="header option-name">' + optionName + '</div>')
    leftFloatedContent.append('<span class="option-description">' + description + '</span>');
    item.append(leftFloatedContent);
    var rightFloatedContent = $('<div class="right floated content">');
    rightFloatedContent.append('<div class="ui button basic icon"><i class="times icon"></i></div>');
    item.append(rightFloatedContent);
    $('#list-options').append(item);
  });

  $('#list-options').on('click', '.button', function(event) {
    $(this).closest('.item').remove();
  })

  $('#button-next-step').on('click', function(event){
    $( ".item" ).each(function( index , element) {
      var title = $(element).find('.option-name').text();
      var description = $(element).find('.option-description').text();
      optionArray.push({title, description});
    });
    postOptions(optionArray)
    optionArray = [];
  });
});
