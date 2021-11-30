

$('#deleteUserAccount').click(function (){

    Swal.fire({
        title: 'Do you want to delete the user?',
        text: 'When you delete this user, all of the user has information will be lost permanently!',
        showDenyButton: true,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
        customClass: {
            confirmButton: 'order-2',
            denyButton: 'order-3',
        }
    }).then((result) => {
        if (result.isConfirmed) {

            openAjaxLoader();

            let _token   = $('meta[name="csrf-token"]').attr('content');
            let user_id = $('#userId').val();

            $.ajax({
                url: "/admin/deleteUser",
                type:"POST",
                data:{
                    user_id: user_id,
                    _token: _token
                },
                dataType:"json"
            }).done(function (response) {

                closeAjaxLoader();

                toastr.success('The user has been successfully deleted.');


                setTimeout(function() {
                    let timerInterval
                    Swal.fire({
                        title: 'You are redirected to the user list page.',
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
                        location.replace('/admin/users');

                        if (result.dismiss === Swal.DismissReason.timer) {
                        }
                    })
                }, 300);

            }).fail(function (response) {
                closeAjaxLoader();

                toastr.error('Something went wrong.');
            });
        } else if (result.isDenied) {

        }
    })
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

