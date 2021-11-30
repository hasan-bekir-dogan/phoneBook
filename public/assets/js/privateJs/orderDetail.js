

var counter = 0;

showOrderItems();

function showOrderItems(){
    let _token   = $('meta[name="csrf-token"]').attr('content');
    let order_id = $('#orderDetailOrderId').val();

    var orderItemsHtml = $('#orderDetailItems').html();
    var orderTotalPricesHtml = $('#orderDetailTotalPrices').html();


    $.ajax({
        url: "/admin/showOrderItems",
        type:"POST",
        data:{
            order_id: order_id,
            _token: _token
        },
        dataType:"json"
    }).done(function (response) {

        $data = response.data;
        $subTotal = response.subTotal;
        $total = response.total;
        $totalCargoPrice = response.totalCargoPrice;

        orderItemsHtml = '';
        orderTotalPricesHtml = '';

        for(i in $data){
            orderItemsHtml += ' <tr>\n' +
                '                   <td>\n' +
                '                       <div class="adminProductSection">\n' +
                '                           <div class="adminProductImgArea">\n' +
                '                               <img src="/uploads/'+$data[i]['image_path']+'" class="adminProductImage" alt="">\n' +
                '                           </div>\n' +
                '                           <ul class="productInfoArea">\n' +
                '                               <li>'+$data[i]['name']+'</li>\n' +
                '                               <li>SKU: '+$data[i]['sku']+'</li>\n' +
                '                           </ul>\n' +
                '                       </div>\n' +
                '                   </td>\n' +
                '                   <td>$ '+number_format($data[i]['product_price'], 2 ,',', '.')+'</td>\n' +
                '                   <td>'+$data[i]['quantity']+'</td>\n' +
                '                   <td>$ '+number_format($data[i]['sub_total'], 2 ,',', '.')+'</td>\n' +
                '               </tr> \n';
        }

        orderTotalPricesHtml += ' <tr>\n' +
            '                         <td colspan="2"></td>\n' +
            '                         <td class="titleSection">Sub Total:</td>\n' +
            '                         <td>$ '+$subTotal+'</td>\n' +
            '                     </tr> \n' +
            '                     <tr>\n' +
            '                         <td colspan="2"></td>\n' +
            '                         <td class="titleSection">Cargo Price:</td>\n' +
            '                         <td>$ '+$totalCargoPrice+'</td>\n' +
            '                     </tr> \n' +
            '                     <tr>\n' +
            '                         <td colspan="2"></td>\n' +
            '                         <td class="totalSectionTitle">Total:</td>\n' +
            '                         <td class="totalSectionPrice">$ '+$total+'</td>\n' +
            '                     </tr> \n';

        $('#orderDetailItems').html(orderItemsHtml);
        $('#orderDetailTotalPrices').html(orderTotalPricesHtml);

    }).fail(function (response) {

        counter ++;

        if(counter <= 3){
            showOrderItems();
        }
        else{
            $('#orderDetailItems').html(orderItemsHtml);
            $('#orderDetailTotalPrices').html(orderTotalPricesHtml);

            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: 'You must refresh the page!'
            })

            toastr.error('Something went wrong.');
        }

    });
}

// this function the money convert to european currency unit
function number_format (number, decimals, dec_point, thousands_sep) {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

$('#orderStatusForm').on('submit', function (e){
    e.preventDefault();

    $('#orderStatusErrorMsg').text('');

    $('#orderStatus').attr('readonly', true);

    $('#successMsg').hide();

    let _token = $('meta[name="csrf-token"]').attr('content');
    let orderId = $('#orderDetailOrderId').val();

    let orderStatus = $('#orderStatus').val();

    $.ajax({
        url: "/admin/orderStatusFormSubmit",
        type: "POST",
        data: {
            orderStatus: orderStatus,
            orderId: orderId,
            _token: _token
        },
        dataType: "json"
    }).done(function (response) {

        $('#orderStatus').attr('readonly', false);

        $('#successMsg').show();

        toastr.success('Your order status has been updated successfully!');

    }).fail(function (response) {

        $('#orderStatus').attr('readonly', false);

        $('#orderStatusErrorMsg').text(response.responseJSON.errors.orderStatus);

    });

    e.stopImmediatePropagation();
});
