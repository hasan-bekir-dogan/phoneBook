@extends('layouts.general')

@section('metaSeo')
    <title>Admin Panel | Login</title>
    <meta name="description" content="Admin Panel | Login">
    <meta name="keywords" content='Admin Panel | Login'>
@endsection

@section('content')

    @include('blocks.loader')

    <div class="controlPanelBackground">
        <img src="{{asset('assets/images/admin3.png')}}">
    </div>

    <div class="loginHeadArea">
        <div class="loginSubArea">
            <div class="adminLoginFormBackground">
                <div class="adminLoginFormSubBackground"></div>
            </div>
            <div class="adminLoginFormArea">
                <div class="row m-b-20">
                    <div class="col-md-12">
                        <div class="profilePhotoArea">
                            <div class="profilePhoto">
                                <img src="{{asset('assets/images/admin-default-image.png')}}" alt="">
                            </div>
                            <div class="nameArea">
                                Hasan Bekir DOĞAN
                            </div>
                        </div>
                    </div>
                </div>

                <hr/>

                <form id="adminLoginForm" action="{{route('loginSubmit')}}" method="POST" class="formArea" autocomplete="on">

                    @csrf

                    @if(session()->has('message'))
                        <div class="alert alert-danger w-100">
                            {{ session()->get('message') }}
                        </div>
                    @endif
                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <div class="input-group emailArea">
                        <label for="email"><i class="far fa-user"></i></label>
                        <input type="text" id="email" name="email" class="form-control" placeholder="E-mail *" autofocus/>
                    </div>
                    <div class="input-group passwordArea">
                        <label for="password"><i class="far fa-lock"></i></label>
                        <input type="password" id="password" name="password" class="form-control" placeholder="Password *" autofocus/>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <button type="submit" class="loginSubmitButton">
                                LOGIN
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>

@endsection


