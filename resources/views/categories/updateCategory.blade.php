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
                                                                <div class="sub-title">Update Category</div>
                                                                <input type="text" id="categoryId" value="{{$cat_id}}" style="visibility: hidden; display:none;">
                                                                <!-- Tab panes -->
                                                                <form id="categoryEditForm" enctype='multipart/form-data'>
                                                                    @csrf
                                                                    <div class="userInformationArea">
                                                                        <div class="alert alert-success" role="alert" id="successMsg" style="display: none" >
                                                                            The category information has successfully updated!
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <div class="row">
                                                                                <div class="col-lg-12">
                                                                                    <label for="categoryNameEditEnForm">Name (English) <span>*</span></label>
                                                                                    <input type="text" id="categoryNameEditEnForm" class="form-control" value="{{$category_en}}">
                                                                                    <div class="errorMessageArea">
                                                                                        <span class="text-danger" id="nameEnErrorMsg"></span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <div class="row">
                                                                                <div class="col-lg-12">
                                                                                    <label for="categoryNameEditTrForm">Name (Turkish) <span>*</span></label>
                                                                                    <input type="text" id="categoryNameEditTrForm" class="form-control" value="{{$category_tr}}">
                                                                                    <div class="errorMessageArea">
                                                                                        <span class="text-danger" id="nameTrErrorMsg"></span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="buttonArea">
                                                                            <button type="submit" class="generalButton updateButton">UPDATE</button>
                                                                            <a href="{{route('admin.categories')}}" class="generalButton cancelButton">CANCEL</a>
                                                                        </div>
                                                                    </div>
                                                                </form>
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

                            <div id="styleSelector">

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

@endsection

@section('scripts')
    <script type="text/javascript" src="{{asset('assets-admin/js/privateJs/updateCategory.js')}}"></script>
@endsection

