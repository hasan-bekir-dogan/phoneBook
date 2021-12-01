<!doctype html>
<html class="no-js" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>

    <meta charset="UTF-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    @yield('metaSeo')
    <meta name="robots" content="noindex, follow" />
    <meta name="description" content="">
    <meta name="lang" content="en" />
    <meta name="author" content="Hasan Bekir DOĞAN" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="robots" content="noindex, follow" />
    <meta name="csrf-token" content="{{ csrf_token() }}">


    <link rel = "icon" href="{{asset('assets/images/favicon.png')}}" type = "image/x-icon">

    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/bootstrap/css/bootstrap.min.css')}}">
    <link type="text/css" rel="stylesheet" href="{{asset('assets/icon/themify-icons/themify-icons.css')}}">
    <link type="text/css" rel="stylesheet" href="{{asset('assets/icon/icofont/css/icofont.css')}}">
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/jquery.mCustomScrollbar.css')}}">
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/fontawesome/css/all.min.css')}}">
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/toastr.css')}}">
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/sweetalert2.css')}}">
    @yield('styles')

    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/style.css')}}">
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/layout.css')}}">


</head>

<body>


    @yield('content')

    <script type="text/javascript" src="{{asset('assets/js/jquery/jquery.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/jquery-ui/jquery-ui.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/popper.js/popper.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/bootstrap/js/bootstrap.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/jquery-slimscroll/jquery.slimscroll.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/modernizr/modernizr.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/pages/widget/amchart/amcharts.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/pages/widget/amchart/serial.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/pages/todo/todo.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/pages/dashboard/custom-dashboard.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/script.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/pcoded.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/demo-12.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/jquery.mCustomScrollbar.concat.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/toastr.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/common-pages.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/privateJs/ajaxLoader.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/sweetalert2.js')}}"></script>


@yield('scripts')

</body>
</html>
