

$('#productEditForm').on('submit', function (e){
    e.preventDefault();

    $('#priceErrorMsg').text('');
    $('#discountRateErrorMsg').text('');
    $('#discountedPriceErrorMsg').text('');
    $('#cargoPriceErrorMsg').text('');
    $('#stockErrorMsg').text('');
    $('#brandErrorMsg').text('');
    $('#categoryErrorMsg').text('');
    $('#nameEnErrorMsg').text('');
    $('#nameTrErrorMsg').text('');

    $('#successMsg').hide();

    openAjaxLoader();

    let price = $('#productPriceEditForm').val();
    let discount_rate = $('#discountEditForm').val();
    let discounted_price = $('#productDiscountedPriceEditForm').val();
    let cargo_price = $('#cargoPriceEditForm').val();
    let stock = $('#stockEditForm').val();
    let brand = $('#brandEditForm').val();
    let category = $('#categoryEditForm').val();
    let name_en = $('#productNameEditEnForm').val();
    let description_en = tinymce.get('descriptionsEditEnForm').getContent();
    let detail_en = tinymce.get('detailsEditEnForm').getContent();
    let name_tr = $('#productNameEditTrForm').val();
    let description_tr = tinymce.get('descriptionsEditTrForm').getContent();
    let detail_tr = tinymce.get('detailsEditTrForm').getContent();
    let id = $('#productId').val();


    var formData = new FormData(this);
    let TotalImages = $('#images')[0].files.length; //Total Images
    let images = $('#images')[0];
    for (let i = 0; i < TotalImages; i++) {
        formData.append('images' + i, images.files[i]);
    }
    formData.append('TotalImages', TotalImages);


    formData.append('price', price);
    formData.append('discount_rate', discount_rate);
    formData.append('discounted_price', discounted_price);
    formData.append('cargo_price', cargo_price);
    formData.append('stock', stock);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('name_en', name_en);
    formData.append('description_en', description_en);
    formData.append('detail_en', detail_en);
    formData.append('name_tr', name_tr);
    formData.append('description_tr', description_tr);
    formData.append('detail_tr', detail_tr);
    formData.append('id', id);


    $.ajax({
        url: "/admin/updateProductFormSubmit",
        type: "POST",
        data: formData,
        cache:false,
        contentType: false,
        processData: false,
        dataType:"json"
    }).done(function (response) {

        closeAjaxLoader();

        $('#successMsg').show();

        toastr.success('The product information has been successfully updated!');

    }).fail(function (response) {

        closeAjaxLoader();

        $('#priceErrorMsg').text(response.responseJSON.errors.price);
        $('#discountRateErrorMsg').text(response.responseJSON.errors.discount_rate);
        $('#discountedPriceErrorMsg').text(response.responseJSON.errors.discounted_price);
        $('#cargoPriceErrorMsg').text(response.responseJSON.errors.cargo_price);
        $('#stockErrorMsg').text(response.responseJSON.errors.stock);
        $('#brandErrorMsg').text(response.responseJSON.errors.brand);
        $('#categoryErrorMsg').text(response.responseJSON.errors.category);
        $('#nameEnErrorMsg').text(response.responseJSON.errors.name_en);
        $('#nameTrErrorMsg').text(response.responseJSON.errors.name_tr);

    });

    e.stopImmediatePropagation();
});


$('#images').on('change', function() {
    multiImgPreview($(this)[0], '.imgPreview');
});

$('#productPriceEditForm').change(function (){
    var price = parseFloat($(this).val());

    if(price < 0) {
        price = 0;
        $(this).val(price);
    }

    var discount_rate = parseFloat($('#discountEditForm').val());
    var discounted_price = (price * ((100 - discount_rate) / 100));
    $('#productDiscountedPriceEditForm').val(discounted_price);
});

$('#discountEditForm').change(function (){
    var discount_rate = parseFloat($(this).val());

    if(discount_rate < 0) {
        discount_rate = 0;
        $(this).val(discount_rate);
    }
    else if(discount_rate > 100) {
        discount_rate = 100;
        $(this).val(discount_rate);
    }

    var price = parseFloat($('#productPriceEditForm').val());
    var discounted_price = (price * ((100 - discount_rate) / 100));
    $('#productDiscountedPriceEditForm').val(discounted_price);
});

$('#productDiscountedPriceEditForm').change(function (){
    var discounted_price = parseFloat($(this).val());

    if(discounted_price < 0) {
        discounted_price = 0;
        $(this).val(discounted_price);
    }

    var discount_rate = parseFloat($('#discountEditForm').val());
    var price = (price * ((100 + discount_rate) / 100));
    $('#productEditForm').val(price);
});

$('.previewDeleteButton').click(function (){
    let image_id = $(this).attr('data-id');
    deleteDbImage(image_id);
});

//this function deletes the image. But, this function works before submit the form
function deleteImage (product_image_id){

    Swal.fire({
        title: 'Do you want to delete the image?',
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


            function FileListItems (files) {
                var b = new ClipboardEvent("").clipboardData || new DataTransfer()

                for (var i = 0, len = files.length; i<len; i++)
                    b.items.add(files[i])

                return b.files
            }

            var fileInput = $('#images')[0];

            //After FileList converts to array, deleting item
            var imagesAray = Array.from($('#images')[0].files);
            imagesAray.splice(product_image_id,1);

            for (var k=0; k<fileInput.files.length; k++){
                $('#previewImg'+k).remove();
            }

            //update FileList
            fileInput.files = new FileListItems(imagesAray)

            multiImgPreview($('#images')[0], '.imgPreview');


            closeAjaxLoader();

            toastr.success('The image has been successfully deleted.');

        } else if (result.isDenied) {

        }
    })

}

//this deletion operation to delete from database
function deleteDbImage(product_image_id){

    Swal.fire({
        title: 'Do you want to delete the image?',
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

            $.ajax({
                url: "/admin/deleteImage",
                type:"POST",
                data:{
                    productImageId: product_image_id,
                    _token: _token
                },
                dataType:"json"
            }).done(function (response) {

                closeAjaxLoader();

                if(response.result === 'success') {
                    $('#permanentPreviewImgArea' + product_image_id.toString()).remove();

                    toastr.success('The image has been successfully deleted.');
                }
                else{
                    toastr.error('You can delete the image because of there is 1 image.');
                }

            }).fail(function (response) {

                closeAjaxLoader();

                toastr.error('Something went wrong.');

            });

        } else if (result.isDenied) {

        }
    })
}

//this method preview the images that uploaded
function multiImgPreview(input, imgPreviewPlaceholder) {

    if (input.files) {
        var filesAmount = input.files.length;
        $('.previewImgSection').remove();
        var counter = 0;
        for (var i = 0; i < filesAmount; i++) {
            var reader = new FileReader();

            reader.onload = function(event) {

                var imgHtml = ' <li id="previewImg'+counter+'" class="previewImgSection"> \n' +
                    '               <div class="previewImgArea"> \n' +
                    '                   <img src="'+event.target.result+'" alt=""> \n' +
                    '               </div> \n' +
                    '               <div class="previewDeleteButtonArea"> \n' +
                    '                   <a href="javascript:void(0)" onclick="deleteImage('+counter+')">' +
                    '                       <i class="far fa-trash-alt"></i>' +
                    '                   </a> \n' +
                    '               </div> \n' +
                    '           </li>\n';

                counter ++;

                $($.parseHTML(imgHtml)).appendTo(imgPreviewPlaceholder);

            }

            reader.readAsDataURL(input.files[i]);
        }
    }

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


//tinymce for description
tinymce.init({
    selector: '#descriptionsEditEnForm',
    menubar: false,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code wordcount'
    ],
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | link | fullscreen | code'
});

//tinymce for details
tinymce.init({
    selector: '#detailsEditEnForm',
    menubar: false,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist checklist | table | link image media | fullscreen | code'
});

//tinymce for description
tinymce.init({
    selector: '#descriptionsEditTrForm',
    menubar: false,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code wordcount'
    ],
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | link | fullscreen | code'
});

//tinymce for details
tinymce.init({
    selector: '#detailsEditTrForm',
    menubar: false,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist checklist | table | link image media | fullscreen | code'
});
