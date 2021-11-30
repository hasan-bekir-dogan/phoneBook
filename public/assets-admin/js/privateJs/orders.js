


orderList();

function orderList() {
    $(function () {
        let _token = $('meta[name="csrf-token"]').attr('content');

        var table = $('#orderTable').DataTable({
            processing: true,
            serverSide: true,
            pageLength: 10,
            lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
            ajax: {
                url: "/admin/showOrders",
                type: "POST",
                data: {
                    _token: _token
                },
                dataType: "json"
            },
            columns: [
                {data: 'id', name: 'id'},
                {data: 'order_code', name: 'order_code'},
                {data: 'status', name: 'status'},
                {data: 'total_price', name: 'total_price'},
                {data: 'created_at', name: 'created_at'},
                {data: 'transaction', name: 'transaction', orderable: false, searchable: false},
            ]
        });
    });
}




