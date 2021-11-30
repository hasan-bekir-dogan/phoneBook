<!doctype html>
<html class="no-js" lang="{{ app()->getLocale() }}">
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


    <link rel = "icon" href="{{asset('assets/img/favicon.png')}}" type = "image/x-icon">

    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/bootstrap.min.css')}}">
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/fontawesome/css/fontawesome.min.css')}}">
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/toastr.css')}}">
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/sweetalert2.css')}}">

    @yield('styles')

    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/layout.css')}}">


</head>

<body>


@yield('content')

<script type="text/javascript" src="{{asset('assets-admin/js/jquery/jquery.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/popper.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/bootstrap.bundle.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/aos.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/common-pages.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/toastr.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/sweetalert2.js')}}"></script>

<script type="text/javascript" src="{{asset('assets/js/privateJs/showCartNumber.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/privateJs/ajaxLoader.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/ready.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/ready.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/privateJs/search.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/privateJs/category.js')}}"></script>



@yield('scripts')

</body>
</html>
