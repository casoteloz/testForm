$(document).ready(function(){
    function validate(){
        var email = $('#email').val().trim();
        var password = $('#password').val().trim();
    
        if(email == "" && password == ""){
            $('#msg').addClass('not-login').html('<i class="fa fa-times"></i><h3>Digite seu email e senhah</h3>');
        }else if(email.length > 0 && password.length > 0){  
            $('#msg').addClass('start-login').html('<i class="fa fa-check"></i><h3>Você foi logado com sucesso<h3>');
            $('.main-form__login').hide();
            $('.main-form__info').html('Usuário logado:' + ' ' + email).css({
                'padding-top': '30%'    
            });

            $('form')[0].reset();

        }
    }
    
    $('form').submit(function(event) {
        event.preventDefault();
        validate();
    });
});

