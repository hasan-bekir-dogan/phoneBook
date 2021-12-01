@extends('layouts.general')

@section('metaSeo')
    <title>technoshop | laravel </title>
    <meta name="description" content="technoshop |  laravel">
    <meta name="keywords" content='technoshop | laravel'>
@endsection

@section('content')

    @include('admin.blocks.loader')

    <div id="pcoded" class="pcoded">
        <div class="pcoded-overlay-box"></div>
        <div class="pcoded-container navbar-wrapper">


            @include('admin.blocks.header')

            <div class="pcoded-main-container">
                <div class="pcoded-wrapper">

                    @include('admin.blocks.left-menu')

                    <div class="pcoded-content">
                        <div class="pcoded-inner-content">
                            <!-- Main-body start -->
                            <div class="main-body">
                                <div class="page-wrapper">

                                    <!-- Page body start -->
                                    <div class="page-body">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <!-- Bootstrap tab card start -->
                                                <div class="card">
                                                    <div class="card-block">
                                                        <!-- Row start -->
                                                        <div class="row">
                                                            <div class="col-lg-12 col-xl-12">
                                                                <div class="sub-title">Products</div>
                                                                <!-- Hover table card start -->
                                                                <div class="card productTable">
                                                                    <div class="adminTables">
                                                                        <div class="card-block table-border-style productTableDetailArea">
                                                                            <div class="table-responsive">

                                                                                <table id="productTable" class="table table-hover">
                                                                                    <thead>
                                                                                    <tr>
                                                                                        <th>#</th>
                                                                                        <th>SKU</th>
                                                                                        <th>Image</th>
                                                                                        <th>Name</th>
                                                                                        <th>Price</th>
                                                                                        <th>Stock</th>
                                                                                        <th>Created Date</th>
                                                                                        <th width="200px">Transactions</th>
                                                                                    </tr>
                                                                                    </thead>
                                                                                    <tbody>

                                                                                    </tbody>
                                                                                </table>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                <!-- Hover table card end -->
                                                            </div>
                                                        </div>
                                                        <!-- Row end -->
                                                    </div>
                                                </div>
                                                <!-- Bootstrap tab card end -->
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Page body end -->
                                </div>
                            </div>
                            <!-- Main-body end -->

                        </div>
                    </div>

                </div>
            </div>
        </div>
        </div>
    </div>



@endsection

@section('scripts')
    <script type="text/javascript" src="{{asset('assets-admin/js/privateJs/contacts.js')}}"></script>
@endsection

