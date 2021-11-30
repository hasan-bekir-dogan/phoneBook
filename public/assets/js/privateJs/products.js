


productList();

function productList() {
    $(function () {
        let _token = $('meta[name="csrf-token"]').attr('content');

        var table = $('#productTable').DataTable({
            processing: true,
            serverSide: true,
            pageLength: 10,
            lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
            ajax: {
                url: "/admin/showProducts",
                type: "POST",
                data: {
                    _token: _token
                },
                dataType: "json"
            },
            columns: [
                {data: 'id', name: 'id'},
                {data: 'sku', name: 'sku'},
                {data: 'image', name: 'image'},
                {data: 'name', name: 'name'},
                {data: 'price', name: 'price'},
                {data: 'stock', name: 'stock'},
                {data: 'created_at', name: 'created_at'},
                {data: 'transaction', name: 'transaction', orderable: false, searchable: false},
            ]
        });
    });
}



$(document).on('click', '.deleteButton', function (){
    let id = $(this).attr('data-id');
    deleteProduct(id);
});

function deleteProduct(productId){
    let _token   = $('meta[name="csrf-token"]').attr('content');

    Swal.fire({
        title: 'Do you want to delete the product?',
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
                url: "/admin/deleteProduct",
                type:"POST",
                data:{
                    productId: productId,
                    _token: _token
                },
                dataType:"json"
            }).done(function (response) {

                $('#productTable').DataTable().clear().destroy();

                productList();

                closeAjaxLoader();

                toastr.success('The product has been successfully deleted.');



            }).fail(function (response) {

                closeAjaxLoader();

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



