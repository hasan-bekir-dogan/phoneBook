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
                                                                <div class="sub-title">Update Product</div>
                                                                <input type="text" id="productId" value="{{$product[0]['id']}}" style="visibility: hidden; display:none;">
                                                                <!-- Tab panes -->
                                                                <form id="productEditForm" enctype='multipart/form-data'>
                                                                    @csrf
                                                                    <div class="userInformationArea">
                                                                        <div class="alert alert-success" role="alert" id="successMsg" style="display: none" >
                                                                            The product information has successfully updated!
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <div class="row">
                                                                                <div class="col-lg-6">
                                                                                    <label for="productPriceEditForm">Price <span>*</span></label>
                                                                                    <input type="text" id="productPriceEditForm" class="form-control" value="{{$product[0]['old_price']}}">
                                                                                    <div class="errorMessageArea">
                                                                                        <span class="text-danger" id="priceErrorMsg"></span>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6">
                                                                                    <label for="discountEditForm">Discount (%)</label>
                                                                                    <input type="text" id="discountEditForm" class="form-control" value="{{$product[0]['discount_rate']}}">
                                                                                    <div class="errorMessageArea">
                                                                                        <span class="text-danger" id="discountRateErrorMsg"></span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <div class="row">
                                                                                <div class="col-lg-6">
                                                                                    <label for="productDiscountedPriceEditForm">Discounted Price</label>
                                                                                    <input type="text" id="productDiscountedPriceEditForm" class="form-control" value="{{$product[0]['price']}}">
                                                                                    <div class="errorMessageArea">
                                                                                        <span class="text-danger" id="discountedPriceErrorMsg"></span>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6">
                                                                                    <label for="cargoPriceEditForm">Cargo Price <span>*</span></label>
                                                                                    <input type="text" id="cargoPriceEditForm" class="form-control" value="{{$product[0]['cargo_price']}}">
                                                                                    <div class="errorMessageArea">
                                                                                        <span class="text-danger" id="cargoPriceErrorMsg"></span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <div class="row">
                                                                                <div class="col-lg-6">
                                                                                    <label for="stockEditForm">Stock <span>*</span></label>
                                                                                    <input type="text" id="stockEditForm" class="form-control" value="{{$product[0]['stock']}}">
                                                                                    <div class="errorMessageArea">
                                                                                        <span class="text-danger" id="stockErrorMsg"></span>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6">
                                                                                    <label for="brandEditForm">Brand <span>*</span></label>
                                                                                    <select id="brandEditForm" class="form-control">
                                                                                        @foreach($brands as $brand)
                                                                                            @if($brand['name'] === $product[0]['brand'])
                                                                                                <option selected value="{{$brand['name']}}">{{$brand['name']}}</option>
                                                                                            @else
                                                                                                <option value="{{$brand['name']}}">{{$brand['name']}}</option>
                                                                                            @endif
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
                                                                                    <label for="categoryEditForm">Category <span>*</span></label>
                                                                                    <select id="categoryEditForm" class="form-control">
                                                                                        @foreach($categories as $category)
                                                                                            @if($category['cat_id'] === $product[0]['cat_id'])
                                                                                                <option selected value="{{$category['cat_id']}}">{{$category['name']}}</option>
                                                                                            @else
                                                                                                <option value="{{$category['cat_id']}}">{{$category['name']}}</option>
                                                                                            @endif
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
                                                                                    <label for="productImageEditForm">Images <span>*</span></label>
                                                                                    <div class="inputArea selectImageHeadArea">
                                                                                        <div class="chooseImagesSection">
                                                                                            <input type="file" name="images[]" class="form-control imageFileInput" id="images" multiple="multiple">
                                                                                            <label class="imageFileLabel" for="images">
                                                                                                <i class="fal fa-cloud-upload"></i>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="showImagesSection">
                                                                                        <ul class="imgPreview">
                                                                                            @foreach($product as $row)
                                                                                                 <li id="permanentPreviewImgArea{{$row['product_images_id']}}">
                                                                                                    <div class="previewImgArea">
                                                                                                        <img src="/uploads/{{$row['image_path']}}" alt="">
                                                                                                    </div>
                                                                                                    <div class="previewDeleteButtonArea">
                                                                                                        <a class="previewDeleteButton" href="javascript:void(0)" data-id="{{$row['product_images_id']}}">
                                                                                                            <i class="far fa-trash-alt"></i>
                                                                                                        </a>
                                                                                                    </div>
                                                                                                </li>
                                                                                            @endforeach
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {{--}}<div class="productDetailsArea">
                                                                            <div class="subTitle">
                                                                                Product Details
                                                                            </div>
                                                                            <div class="form-groups productDetailsSubArea">
                                                                                <div class="row">
                                                                                    <div class="col-lg-6">
                                                                                        <label for="productNameEditForm">Name <span>*</span></label>
                                                                                        <input type="text" id="productNameEditForm" class="form-control" value="{{$product[0]['name']}}">
                                                                                        <div class="errorMessageArea">
                                                                                            <span class="text-danger" id="nameErrorMsg"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row">
                                                                                    <div class="col-lg-12">
                                                                                        <label for="descriptionsEditForm">Description</label>
                                                                                        <textarea class="form-control" id="descriptionsEditForm" name="descriptionsEditForm">{{$product[0]['description']}}</textarea>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row">
                                                                                    <div class="col-lg-12">
                                                                                        <label for="detailsEditForm">Details</label>
                                                                                        <textarea class="form-control" id="detailsEditForm">{{$product[0]['detail']}}</textarea>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>{{--}}
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
                                                                                                            <label for="productNameEditEnForm">Name <span>*</span></label>
                                                                                                            <input type="text" id="productNameEditEnForm" class="form-control" value="{{$product[0]['name_en']}}">
                                                                                                            <div class="errorMessageArea">
                                                                                                                <span class="text-danger" id="nameEnErrorMsg"></span>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="row">
                                                                                                        <div class="col-lg-12">
                                                                                                            <label for="descriptionsEditEnForm">Description</label>
                                                                                                            <textarea class="form-control" id="descriptionsEditEnForm">{{$product[0]['description_en']}}</textarea>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="row">
                                                                                                        <div class="col-lg-12">
                                                                                                            <label for="detailsEditEnForm">Details</label>
                                                                                                            <textarea class="form-control" id="detailsEditEnForm">{{$product[0]['detail_en']}}</textarea>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="tab-pane" id="tr" role="tabpanel">
                                                                                                <div class="gridBody">
                                                                                                    <div class="row">
                                                                                                        <div class="col-lg-12">
                                                                                                            <label for="productNameEditTrForm">Name <span>*</span></label>
                                                                                                            <input type="text" id="productNameEditTrForm" class="form-control" value="{{$product[0]['name_tr']}}">
                                                                                                            <div class="errorMessageArea">
                                                                                                                <span class="text-danger" id="nameTrErrorMsg"></span>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="row">
                                                                                                        <div class="col-lg-12">
                                                                                                            <label for="descriptionsEditTrForm">Description</label>
                                                                                                            <textarea class="form-control" id="descriptionsEditTrForm">{{$product[0]['description_tr']}}</textarea>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="row">
                                                                                                        <div class="col-lg-12">
                                                                                                            <label for="detailsEditTrForm">Details</label>
                                                                                                            <textarea class="form-control" id="detailsEditTrForm">{{$product[0]['detail_tr']}}</textarea>
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
                                                                            <button type="submit" class="generalButton updateButton">UPDATE</button>
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
    <script type="text/javascript" src="{{asset('assets-admin/js/privateJs/updateContact.js')}}"></script>
@endsection

