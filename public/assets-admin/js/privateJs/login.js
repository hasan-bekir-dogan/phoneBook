

$('#adminLoginForm').on('submit', function (e){
    e.preventDefault();

    let _token = $('meta[name="csrf-token"]').attr('content');

    let email = $('#email').val();
    let password = $('#password').val();

    $('#successMsg').hide();

    $.ajax({
        url: "/adminLoginFormSubmit",
        type: "POST",
        data: {
            email: email,
            password: password,
            _token: _token
        },
        dataType:"json"
    }).done(function (response) {

        $('#successMsg').show();
        toastr.success('You have successfully logged in.');

    }).fail(function (response) {
        toastr.error('Something went wrong.');
    });

    e.stopImmediatePropagation();
});
