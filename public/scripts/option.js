$(() => {

  let inputTitle = $('#input-option')
  let inputDescription = $('#input-description')

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
    var optionName = inputTitle.find('input').val();
    var description = inputDescription.find('input').val();

    //Validate input for option name, desc not required
    if(optionName === ''){
      inputTitle.addClass('error');
    } else {
      inputTitle.removeClass('error');

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

      //Show submit if more htan two options
      if($('.item').length === 2) {
        $('#button-next-step').transition("slide up")
      }

      //Clear out fields
      inputTitle.find('input').val('');
      inputDescription.find('input').val('');
    }

  });

  $('#list-options').on('click', '.button', function(event) {
    $(this).closest('.item').remove();
    if($('.item').length === 1) {
      $('#button-next-step').transition("slide down")
    }
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
