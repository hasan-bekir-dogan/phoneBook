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
                                                                <div class="sub-title">Add New Product</div>
                                                                <!-- Tab panes -->
                                                                <form id="addProductForm" enctype='multipart/form-data'>
                                                                    @csrf
                                                                    <div class="userInformationArea">
                                                                        <div class="alert alert-success" role="alert" id="successMsg" style="display: none" >
                                                                            The product information has successfully added!
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <div class="row">
                                                                                <div class="col-lg-6">
                                                                                    <label for="productPriceForm">Price <span>*</span></label>
                                                                                    <input type="text" id="productPriceForm" class="form-control">
                                                                                    <div class="errorMessageArea">
                                                                                        <span class="text-danger" id="priceErrorMsg"></span>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6">
                                                                                    <label for="discountForm">Discount (%)</label>
                                                                                    <input type="text" id="discountForm" class="form-control" value="0">
                                                                                    <div class="errorMessageArea">
                                                                                        <span class="text-danger" id="discountRateErrorMsg"></span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <div class="row">
                                                                                <div class="col-lg-6">
                                                                                    <label for="productDiscountedPriceForm">Discounted Price</label>
                                                                                    <input type="text" id="productDiscountedPriceForm" class="form-control">
                                                                                    <div class="errorMessageArea">
                                                                                        <span class="text-danger" id="discountedPriceErrorMsg"></span>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6">
                                                                                    <label for="cargoPriceForm">Cargo Price <span>*</span></label>
                                                                                    <input type="text" id="cargoPriceForm" class="form-control">
                                                                                    <div class="errorMessageArea">
                                                                                        <span class="text-danger" id="cargoPriceErrorMsg"></span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <div class="row">
                                                                                <div class="col-lg-6">
                                                                                    <label for="stockForm">Stock <span>*</span></label>
                                                                                    <input type="text" id="stockForm" class="form-control">
                                                                                    <div class="errorMessageArea">
                                                                                        <span class="text-danger" id="stockErrorMsg"></span>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6">
                                                                                    <label for="brandForm">Brand <span>*</span></label>
                                                                                    <select id="brandForm" class="form-control">
                                                                                        <option value="" disabled selected>Select Brand</option>
                                                                                        @foreach($brands as $brand)
                                                                                            <option value="{{$brand['name']}}">{{$brand['name']}}</option>
                                                                                        @endforeach
                                                                                    </select>
                                                                                    <div class="errorMessageArea">
                                                                                        <span class="text-danger" id="brandErrorMsg"></span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <div class="row">
                                                                                <div class="col-lg-12">
                                                                                    <label for="categoryForm">Category <span>*</span></label>
                                                                                    <select id="categoryForm" class="form-control">
                                                                                        <option value="" disabled selected>Select Category</option>
                                                                                        @foreach($categories as $category)
                                                                                            <option value="{{$category['cat_id']}}">{{$category['name']}}</option>
                                                                                        @endforeach
                                                                                    </select>
                                                                                    <div class="errorMessageArea">
                                                                                        <span class="text-danger" id="categoryErrorMsg"></span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <div class="row">
                                                                                <div class="col-lg-12 chooseImageArea">
                                                                                    <label for="productImageForm">Images <span>*</span></label>
                                                                                    <div class="inputArea selectImageHeadArea">
                                                                                        <div class="chooseImagesSection">
                                                                                            <input type="file" name="images[]" class="form-control imageFileInput" id="images" multiple="multiple">
                                                                                            <label class="imageFileLabel" for="images">
                                                                                                <i class="fal fa-cloud-upload"></i>
                                                                                            </label>
                                                                                            <div class="errorMessageArea">
                                                                                                <span class="text-danger" id="imagesErrorMsg"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="showImagesSection">
                                                                                        <ul class="imgPreview">

                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="productDetailsArea">
                                                                            <div class="subTitle">
                                                                                Product Details
                                                                            </div>
                                                                            <div class="form-group productDetailsSubArea">
                                                                                <div class="tabArea">
                                                                                    <div class="tabTitleArea">
                                                                                        <ul class="nav nav-tabs" role="tablist">
                                                                                            <li class="nav-item">
                                                                                                <a id="enLink" class="nav-link active" data-toggle="tab" href="#en" role="tab">
                                                                                                    EN
                                                                                                </a>
                                                                                            </li>
                                                                                            <li class="nav-item">
                                                                                                <a id="trLink" class="nav-link" data-toggle="tab" href="#tr" role="tab">
                                                                                                    TR
                                                                                                </a>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                    <div class="tabContentArea">
                                                                                        <div class="tab-content">
                                                                                            <div class="tab-pane active" id="en" role="tabpanel">
                                                                                                <div class="gridBody">
                                                                                                    <div class="row">
                                                                                                        <div class="col-lg-12">
                                                                                                            <label for="productNameEnForm">Name <span>*</span></label>
                                                                                                            <input type="text" id="productNameEnForm" class="form-control">
                                                                                                            <div class="errorMessageArea">
                                                                                                                <span class="text-danger" id="nameEnErrorMsg"></span>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="row">
                                                                                                        <div class="col-lg-12">
                                                                                                            <label for="descriptionsEnForm">Description</label>
                                                                                                            <textarea class="form-control" id="descriptionsEnForm"></textarea>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="row">
                                                                                                        <div class="col-lg-12">
                                                                                                            <label for="detailsEnForm">Details</label>
                                                                                                            <textarea class="form-control" id="detailsEnForm"></textarea>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="tab-pane" id="tr" role="tabpanel">
                                                                                                <div class="gridBody">
                                                                                                    <div class="row">
                                                                                                        <div class="col-lg-12">
                                                                                                            <label for="productNameTrForm">Name <span>*</span></label>
                                                                                                            <input type="text" id="productNameTrForm" class="form-control">
                                                                                                            <div class="errorMessageArea">
                                                                                                                <span class="text-danger" id="nameTrErrorMsg"></span>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="row">
                                                                                                        <div class="col-lg-12">
                                                                                                            <label for="descriptionsTrForm">Description</label>
                                                                                                            <textarea class="form-control" id="descriptionsTrForm"></textarea>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="row">
                                                                                                        <div class="col-lg-12">
                                                                                                            <label for="detailsTrForm">Details</label>
                                                                                                            <textarea class="form-control" id="detailsTrForm"></textarea>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="buttonArea">
                                                                            <button type="submit" class="generalButton updateButton">ADD</button>
                                                                            <a href="{{route('admin.contacts')}}" class="generalButton cancelButton">CANCEL</a>
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
    <script src="{{asset('assets-admin/js/tinymce/tinymce.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets-admin/js/privateJs/addContact.js')}}"></script>
@endsection



