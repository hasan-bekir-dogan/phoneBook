
function deleteGroup(groupId){
    let _token   = $('meta[name="csrf-token"]').attr('content');

    Swal.fire({
        title: 'Do you want to delete the group?',
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

            $.ajax({
                url: "/groups/"+groupId.toString(),
                type:"DELETE",
                data:{
                    _token: _token
                },
                dataType:"json"
            }).done(function (response) {
                groupList();

                closeAjaxLoader();

                toastr.success('The group has been successfully deleted.');
            }).fail(function (response) {

                toastr.error('Something went wrong.');
            });
        } else if (result.isDenied) {

        }
    })
}

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



