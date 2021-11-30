

$('#addProductForm').on('submit', function (e){
    e.preventDefault();

    $('#successMsg').hide();

    openAjaxLoader();

    let price = $('#productPriceForm').val();
    let discount_rate = $('#discountForm').val();
    let discounted_price = $('#productDiscountedPriceForm').val();
    let cargo_price = $('#cargoPriceForm').val();
    let stock = $('#stockForm').val();
    let brand = $('#brandForm').val();
    let category = $('#categoryForm').val();
    let name_en = $('#productNameEnForm').val();
    let description_en = tinymce.get('descriptionsEnForm').getContent();
    let detail_en = tinymce.get('detailsEnForm').getContent();
    let name_tr = $('#productNameTrForm').val();
    let description_tr = tinymce.get('descriptionsTrForm').getContent();
    let detail_tr = tinymce.get('detailsTrForm').getContent();

    if(category === null)
        category = '';
    if(brand === null)
        brand = '';

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

    $('#priceErrorMsg').text('');
    $('#discountRateErrorMsg').text('');
    $('#discountedPriceErrorMsg').text('');
    $('#cargoPriceErrorMsg').text('');
    $('#stockErrorMsg').text('');
    $('#brandErrorMsg').text('');
    $('#categoryErrorMsg').text('');
    $('#nameEnErrorMsg').text('');
    $('#nameTrErrorMsg').text('');
    $('#imagesErrorMsg').text('');


    $.ajax({
        url: "/admin/addProductFormSubmit",
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

        let timerInterval
        Swal.fire({
            title: 'You are redirected to the product list page.',
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
            window.location.href='/admin/products';

            if (result.dismiss === Swal.DismissReason.timer) {
            }
        })


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
        $('#imagesErrorMsg').text(response.responseJSON.errors.images);

    });

    e.stopImmediatePropagation();
});


$('#images').on('change', function() {
    multiImgPreview($(this)[0], '.imgPreview');
});

$('#productPriceForm').change(function (){
    var price = parseFloat($(this).val());

    if(price < 0) {
        price = 0;
        $(this).val(price);
    }

    var discount_rate = parseFloat($('#discountForm').val());
    var discounted_price = (price * ((100 - discount_rate) / 100)).toFixed(2);
    $('#productDiscountedPriceForm').val(discounted_price);
});

$('#discountForm').change(function (){
    var discount_rate = parseFloat($(this).val());

    if(discount_rate < 0) {
        discount_rate = 0;
        $(this).val(discount_rate);
    }
    else if(discount_rate > 100) {
        discount_rate = 100;
        $(this).val(discount_rate);
    }

    var price = parseFloat($('#productPriceForm').val());
    var discounted_price = (price * ((100 - discount_rate) / 100)).toFixed(2);
    $('#productDiscountedPriceForm').val(discounted_price);
});

$('#productDiscountedPriceForm').change(function (){
    var discounted_price = parseFloat($(this).val());

    if(discounted_price < 0) {
        discounted_price = 0;
        $(this).val(discounted_price);
    }

    var discount_rate = parseFloat($('#discountForm').val());
    var price = (discounted_price * ((100 + discount_rate) / 100)).toFixed(2);
    $('#productPriceForm').val(price);
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


//tinymce for en description
tinymce.init({
    selector: '#descriptionsEnForm',
    menubar: false,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code wordcount'
    ],
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | link | fullscreen | code'
});

//tinymce for en details
tinymce.init({
    selector: '#detailsEnForm',
    menubar: false,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist checklist | table | link image media | fullscreen | code'
});

//tinymce for tr description
tinymce.init({
    selector: '#descriptionsTrForm',
    menubar: false,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code wordcount'
    ],
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | link | fullscreen | code'
});

//tinymce for tr details
tinymce.init({
    selector: '#detailsTrForm',
    menubar: false,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist checklist | table | link image media | fullscreen | code'
});
