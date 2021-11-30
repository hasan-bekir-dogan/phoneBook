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
                            <div class="main-body">
                                <div class="page-wrapper">

                                    <div class="page-body">
                                        <div class="row">
                                            <!-- card1 start -->
                                            <div class="col-md-6 col-xl-3">
                                                <div class="card widget-card-1">
                                                    <div class="card-block-small orders">
                                                        <i class="icofont card1-icon"></i>
                                                        <span class="title">Orders</span>
                                                        <h4>{{$order_number}}</h4>
                                                        <div>
                                                            <span class="f-left m-t-10 text-muted">
                                                                Number of Orders
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- card1 end -->
                                            <!-- card1 start -->
                                            <div class="col-md-6 col-xl-3">
                                                <div class="card widget-card-1">
                                                    <div class="card-block-small products">
                                                        <i class="icofont card1-icon"></i>
                                                        <span class="title">Products</span>
                                                        <h4>{{$product_number}}</h4>
                                                        <div>
                                                            <span class="f-left m-t-10 text-muted">
                                                                Number of Products
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- card1 end -->
                                            <!-- card1 start -->
                                            <div class="col-md-6 col-xl-3">
                                                <div class="card widget-card-1">
                                                    <div class="card-block-small contacts">
                                                        <i class="icofont card1-icon"></i>
                                                        <span class="title">Contacts</span>
                                                        <h4>{{$contact_number}}</h4>
                                                        <div>
                                                            <span class="f-left m-t-10 text-muted">
                                                                Number of Contact Messages
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- card1 end -->
                                            <!-- card1 start -->
                                            <div class="col-md-6 col-xl-3">
                                                <div class="card widget-card-1">
                                                    <div class="card-block-small users">
                                                        <i class="icofont card1-icon"></i>
                                                        <span class="title">Users</span>
                                                        <h4>{{$user_number}}</h4>
                                                        <div>
                                                            <span class="f-left m-t-10 text-muted">
                                                                Number of Users who registered
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

@endsection

@section('scripts')
    <script type="text/javascript" src="{{asset('assets-admin/pages/chart/morris/morris-custom-chart.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets-admin/js/classie/classie.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets-admin/js/raphael/raphael.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets-admin/js/morris.js/morris.js')}}"></script>

@endsection

