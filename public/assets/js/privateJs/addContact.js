
var phoneCounter = 1;
var phoneIDArray = [];
var emailCounter = 1;
var emailIDArray = [];
var addressCounter = 1;
var addressIDArray = [];

$('#addContactForm').on('submit', function (e) {

    e.preventDefault();

    if (phoneIDArray.length === 0) {
        e.stopImmediatePropagation();

        Swal.fire({
            icon: 'warning',
            title: 'Something went wrong!',
            text: 'You have to add at least one phone number!'
        })
    }
    else {

        $('#successMsg').hide();

        openAjaxLoader();

        var formData = new FormData(this);
        formData.append('phoneIds', phoneIDArray);
        formData.append('emailIds', emailIDArray);
        formData.append('addressIds', addressIDArray);

        $('#firstNameErrorMsg').text('');
        $('#lastNameErrorMsg').text('');
        $('#companyErrorMsg').text('');
        $('#birthdayErrorMsg').text('');
        $('#profilePhotoErrorMsg').text('');

        for (var k = 0; k < phoneIDArray.length; k++) {
            $('#phoneValueErrorMsg' + phoneIDArray[k].toString()).text('');
            $('#phoneLabelErrorMsg' + phoneIDArray[k].toString()).text('');
        }
        for (var j = 0; j < emailIDArray.length; j++) {
            $('#emailValueErrorMsg' + emailIDArray[j].toString()).text('');
            $('#emailLabelErrorMsg' + emailIDArray[j].toString()).text('');
        }
        for (var h = 0; h < addressIDArray.length; h++) {
            $('#addressValueErrorMsg' + addressIDArray[h].toString()).text('');
            $('#addressLabelErrorMsg' + addressIDArray[h].toString()).text('');
        }


        $.ajax({
            url: "/contacts",
            type: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json"
        }).done(function (response) {

            closeAjaxLoader();

            $('#successMsg').show();

            toastr.success('The contact has been successfully created!');

            let timerInterval
            Swal.fire({
                title: 'You are redirected to the contact list page.',
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
                window.location.href = '/contact/list';

                if (result.dismiss === Swal.DismissReason.timer) {
                }
            })

        }).fail(function (response) {

            closeAjaxLoader();

            $('#firstNameErrorMsg').text(response.responseJSON.errors.firstName);
            $('#lastNameErrorMsg').text(response.responseJSON.errors.lastName);
            $('#companyErrorMsg').text(response.responseJSON.errors.company);
            $('#birthdayErrorMsg').text(response.responseJSON.errors.birthday);
            $('#profilePhotoErrorMsg').text(response.responseJSON.errors.photo);

            for (var m = 0; m < phoneIDArray.length; m++) {
                $('#phoneValueErrorMsg' + phoneIDArray[m].toString()).text(response.responseJSON.errors['phoneValue' + phoneIDArray[m].toString()]);
                $('#phoneLabelErrorMsg' + phoneIDArray[m].toString()).text(response.responseJSON.errors['phoneLabel' + phoneIDArray[m].toString()]);
            }
            for (var i = 0; i < emailIDArray.length; i++) {
                $('#emailValueErrorMsg' + emailIDArray[i].toString()).text(response.responseJSON.errors['emailValue' + emailIDArray[i].toString()]);
                $('#emailLabelErrorMsg' + emailIDArray[i].toString()).text(response.responseJSON.errors['emailLabel' + emailIDArray[i].toString()]);
            }
            for (var p = 0; p < addressIDArray.length; p++) {
                $('#addressValueErrorMsg' + addressIDArray[p].toString()).text(response.responseJSON.errors['addressValue' + addressIDArray[p].toString()]);
                $('#addressLabelErrorMsg' + addressIDArray[p].toString()).text(response.responseJSON.errors['addressLabel' + addressIDArray[p].toString()]);
            }
        });

        e.stopImmediatePropagation();
    }
});

$('#profilePhoto').on('change', function() {
    imgPreview($(this)[0]);
});

$('#phoneAddButtonId').click(function(){
    addPhone();
});
$('#emailAddButtonId').click(function(){
    addEmail();
});
$('#addressAddButtonId').click(function(){
    addAddress();
});

// this function deletes the image. But, this function works before submit the form
function deleteImage (){

    Swal.fire({
        title: 'Do you want to remove the photo?',
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

            var fileInput = $('#profilePhoto')[0];

            //After FileList converts to array, deleting item
            var imagesAray = Array.from($('#profilePhoto')[0].files);
            imagesAray.splice(0,1);

            $('#profilePhotoArea').prop('src', '/assets/images/profile-default-photo.png');
            $('#deleteProfilePhotoCross').remove();
            $('#editPhotoButton').html('Add Photo');

            //update FileList
            fileInput.files = new FileListItems(imagesAray)

            closeAjaxLoader();

            toastr.success('The photo has been successfully removed.');

        } else if (result.isDenied) {

        }
    })

}

// this method preview the images that uploaded
function imgPreview(input) {
    if (input.files && input.files[0]) {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            $('#profilePhotoArea').prop('src', event.target.result);

            var deleteImageButtonHtml = ' <a id="deleteProfilePhotoCross" class="deleteImageButton" href="javascript:void(0)" onclick="deleteImage()" title="Delete Photo"> ' +
                '                             <i class="fal fa-times"></i> ' +
                '                         </a> \n';

            $($.parseHTML(deleteImageButtonHtml)).appendTo('.chooseImagesSection');
            $('#editPhotoButton').html('Update Photo');
        };
        fileReader.readAsDataURL(input.files[0]);
    }
}

// this method add new phone
function addPhone(){

    var newPhoneHtml = ' <div id="phone'+phoneCounter+'" class="form-group addedFormGroups">\n' +
        '                    <div class="row">\n' +
        '                        <div class="col-lg-3">\n' +
        '                            <label for="phoneLabelForm'+phoneCounter+'">Label Name <span>*</span></label>\n' +
        '                            <select name="phoneLabel'+phoneCounter+'" id="phoneLabelForm'+phoneCounter+'" class="form-control">\n' +
        '                                <option value="0" disabled selected>Select Label Name</option>\n' +
        '                                <option value="1">Mobile</option>\n' +
        '                                <option value="2">Home</option>\n' +
        '                                <option value="3">Work</option>\n' +
        '                                <option value="4">School</option>\n' +
        '                                <option value="5">Fax</option>\n' +
        '                                <option value="6">Other</option>\n' +
        '                            </select>\n' +
        '                            <div class="errorMessageArea">\n' +
        '                                <span class="text-danger" id="phoneLabelErrorMsg'+phoneCounter+'"></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-lg-8">\n' +
        '                            <label for="phoneValueForm'+phoneCounter+'">Value <span>*</span></label>\n' +
        '                            <input type="text" name="phoneValue'+phoneCounter+'" id="phoneValueForm'+phoneCounter+'" class="form-control">\n' +
        '                            <div class="errorMessageArea">\n' +
        '                                <span class="text-danger" id="phoneValueErrorMsg'+phoneCounter+'"></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-lg-1">' +
        '                            <div class="deleteBtnArea">' +
        '                                <a href="javascript:void(0)" onclick="deletePhone('+phoneCounter+')" title="Delete Phone">' +
        '                                    <i class="fas fa-trash-alt"></i>' +
        '                                </a>' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div> \n';

    $($.parseHTML(newPhoneHtml)).insertBefore('#phonesAddButtonArea');

    phoneIDArray.push(phoneCounter);

    phoneCounter ++;
}
// this method add new email
function addEmail(){

    var newEmailHtml = ' <div id="email'+emailCounter+'" class="form-group addedFormGroups">\n' +
        '                    <div class="row">\n' +
        '                        <div class="col-lg-3">\n' +
        '                            <label for="emailLabelForm'+emailCounter+'">Label Name <span>*</span></label>\n' +
        '                            <select name="emailLabel'+emailCounter+'" id="emailLabelForm'+emailCounter+'" class="form-control">\n' +
        '                                <option value="0" disabled selected>Select Label Name</option>\n' +
        '                                <option value="2">Home</option>\n' +
        '                                <option value="3">Work</option>\n' +
        '                                <option value="4">School</option>\n' +
        '                                <option value="6">Other</option>\n' +
        '                            </select>\n' +
        '                            <div class="errorMessageArea">\n' +
        '                                <span class="text-danger" id="emailLabelErrorMsg'+emailCounter+'"></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-lg-8">\n' +
        '                            <label for="emailValueForm'+emailCounter+'">Value <span>*</span></label>\n' +
        '                            <input type="text" name="emailValue'+emailCounter+'" id="emailValueForm'+emailCounter+'" class="form-control">\n' +
        '                            <div class="errorMessageArea">\n' +
        '                                <span class="text-danger" id="emailValueErrorMsg'+emailCounter+'"></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-lg-1">' +
        '                            <div class="deleteBtnArea">' +
        '                                <a href="javascript:void(0)" onclick="deleteEmail('+emailCounter+')" title="Delete Email">' +
        '                                    <i class="fas fa-trash-alt"></i>' +
        '                                </a>' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div> \n';

    $($.parseHTML(newEmailHtml)).insertBefore('#emailsAddButtonArea');

    emailIDArray.push(emailCounter);

    emailCounter ++;
}
// this method add new address
function addAddress(){

    var newAddressHtml = ' <div id="address'+addressCounter+'" class="form-group addedFormGroups">\n' +
        '                    <div class="row">\n' +
        '                        <div class="col-lg-3">\n' +
        '                            <label for="addressLabelForm'+addressCounter+'">Label Name <span>*</span></label>\n' +
        '                            <select name="addressLabel'+addressCounter+'" id="addressLabelForm'+addressCounter+'" class="form-control">\n' +
        '                                <option value="0" disabled selected>Select Label Name</option>\n' +
        '                                <option value="2">Home</option>\n' +
        '                                <option value="3">Work</option>\n' +
        '                                <option value="4">School</option>\n' +
        '                                <option value="6">Other</option>\n' +
        '                            </select>\n' +
        '                            <div class="errorMessageArea">\n' +
        '                                <span class="text-danger" id="addressLabelErrorMsg'+addressCounter+'"></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-lg-8">\n' +
        '                            <label for="addressValueForm'+addressCounter+'">Value <span>*</span></label>\n' +
        '                            <textarea name="addressValue'+addressCounter+'" id="addressValueForm'+addressCounter+'" class="form-control"></textarea>\n' +
        '                            <div class="errorMessageArea">\n' +
        '                                <span class="text-danger" id="addressValueErrorMsg'+addressCounter+'"></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-lg-1">' +
        '                            <div class="deleteBtnArea">' +
        '                                <a href="javascript:void(0)" onclick="deleteAddress('+addressCounter+')" title="Delete Address">' +
        '                                    <i class="fas fa-trash-alt"></i>' +
        '                                </a>' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div> \n';

    $($.parseHTML(newAddressHtml)).insertBefore('#addressesAddButtonArea');

    addressIDArray.push(addressCounter);

    addressCounter ++;
}

// this method delete the phone
function deletePhone(id){
    Swal.fire({
        title: 'Do you want to remove the phone number?',
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

            $('#phone'+id.toString()).remove();

            const index = phoneIDArray.indexOf(id);
            phoneIDArray.splice(index, 1);

            closeAjaxLoader();

            toastr.success('The phone number has been successfully removed.');

        } else if (result.isDenied) {

        }
    })
}
// this method delete the email
function deleteEmail(id){
    Swal.fire({
        title: 'Do you want to remove the email address?',
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

            $('#email'+id.toString()).remove();

            const index = emailIDArray.indexOf(id);
            emailIDArray.splice(index, 1);

            closeAjaxLoader();

            toastr.success('The email address has been successfully removed.');

        } else if (result.isDenied) {

        }
    })
}
// this method delete the address
function deleteAddress(id){
    Swal.fire({
        title: 'Do you want to remove the address?',
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

            $('#address'+id.toString()).remove();

            const index = addressIDArray.indexOf(id);
            addressIDArray.splice(index, 1);

            closeAjaxLoader();

            toastr.success('The address has been successfully removed.');

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

