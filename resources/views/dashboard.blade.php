@extends('layouts.general')

@section('metaSeo')
    <title>Admin Panel | Dashboard</title>
    <meta name="description" content="Admin Panel | Dashboard">
    <meta name="keywords" content='Admin Panel | Dashboard'>
@endsection



@section('content')

    @include('blocks.loader')

    <div id="pcoded" class="pcoded">
        <div class="pcoded-overlay-box"></div>
        <div class="pcoded-container navbar-wrapper">

            @include('blocks.header')

            <div class="pcoded-main-container">
                <div class="pcoded-wrapper">

                    @include('blocks.left-menu')

                    <div class="pcoded-content">
                        <div class="pcoded-inner-content">
                            <div class="main-body">
                                <div class="page-wrapper">

                                    <div class="page-body">
                                        <div class="row">
                                            <!-- card1 start -->
                                            <div class="col-md-6 col-xl-3">
                                                <div class="card widget-card-1">
                                                    <div class="card-block-small products">
                                                        <i class="icofont card1-icon"></i>
                                                        <span class="title">Groups</span>
                                                        <h4>{{$totalGroupNumber}}</h4>
                                                        <div>
                                                            <span class="f-left m-t-10 text-muted">
                                                                Number of groups
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- card1 end -->
                                            <!-- card2 start -->
                                            <div class="col-md-6 col-xl-3">
                                                <div class="card widget-card-1">
                                                    <div class="card-block-small contacts">
                                                        <i class="icofont card1-icon"></i>
                                                        <span class="title">Contacts</span>
                                                        <h4>{{$totalContactNumber}}</h4>
                                                        <div>
                                                            <span class="f-left m-t-10 text-muted">
                                                                Number of Contacts
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- card2 end -->
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
    <script type="text/javascript" src="{{asset('assets/pages/chart/morris/morris-custom-chart.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/classie/classie.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/raphael/raphael.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/morris.js/morris.js')}}"></script>

@endsection

