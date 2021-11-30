

$('#addBrandForm').on('submit', function (e){
    e.preventDefault();

    $('#nameErrorMsg').text('');

    $('#successMsg').hide();

    openAjaxLoader();

    let _token = $('meta[name="csrf-token"]').attr('content');

    let name = $('#brandNameForm').val();



    $.ajax({
        url: "/admin/addBrandFormSubmit",
        type: "POST",
        data: {
            name: name,
            _token: _token
        },
        dataType:"json"
    }).done(function (response) {

        closeAjaxLoader();

        $('#successMsg').show();

        toastr.success('The brand information has been successfully updated!');

        let timerInterval
        Swal.fire({
            title: 'You are redirected to the brand list page.',
            timer: 4000,
            timerProgressBar: false,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            window.location.href='/admin/brands';

            if (result.dismiss === Swal.DismissReason.timer) {
            }
        })


    }).fail(function (response) {

        closeAjaxLoader();

        $('#nameErrorMsg').text(response.responseJSON.errors.name);

    });

    e.stopImmediatePropagation();
});


function openAjaxLoader(){
    $ajaxLoaderAllScreen = ajaxLoaderAllScreen();
    $($.parseHTML($ajaxLoaderAllScreen)).insertBefore($('#pcoded'));

    $('.ajaxLoaderAllScreen').fadeIn(300);
}
function closeAjaxLoader(){
    $('.ajaxLoaderAllScreen').fadeOut(300);

    setTimeout(function() {
        $('.ajaxLoaderAllScreen').remove();
    }, 300);
}


