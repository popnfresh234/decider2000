$(() => {

  let inputTitle = $('#input-title');
  let inputEmail = $('#input-email');
  let title = '';
  let email = '';

  function handleState(){
    inputTitle.transition('slide up');
    inputEmail.transition('slide down');
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function postPoll(email, ptitle){
    $.ajax({
      url: '/polls/',
      method: 'POST',
      data: {ptitle, email},
      dataType: 'json',
      success: function(data) {
        if (typeof data.redirect == 'string'){
          window.location = data.redirect;
        }
      }
    });
  }


  $('#button-title-go').on('click', function(event){

    title = inputTitle.find('input').val().trim();

    //validate title
    if(title === ''){
      inputTitle.addClass('error');
    } else {
      inputTitle.removeClass('error');
    }

    if(title !== ''){
      handleState();
    }
  });

  $('#button-back').on('click', function(event){
    handleState();
  });

  $('#button-email-go').on('click', function(event){
    email = inputEmail.find('input').val().trim();

    if(!validateEmail(email)){
      inputEmail.addClass('error');
    } else{
      inputEmail.removeClass('error');
      postPoll(email,title);
    }
  });

});
