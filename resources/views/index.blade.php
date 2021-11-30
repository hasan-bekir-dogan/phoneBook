@extends('layouts.general')

@section('metaSeo')
    <title>technoshop | laravel </title>
    <meta name="description" content="technoshop |  laravel">
    <meta name="keywords" content='technoshop | laravel'>
@endsection

@section('content')

    @include('blocks.sessionControl')
    @include('blocks.scrollToTop')
    @include('blocks.header')

    <div class="bodyArea">

        <div class="featureArea">
            <div class="brandsArea">
                <div class="brandTitle">
                    @lang('message.brand')
                </div>
                <div id="brandsSection" class="brandContent">

                </div>
            </div>
            <div class="priceArea">
                <div class="priceTitle">
                    @lang('message.price')
                </div>
                <div class="priceContent">
                    <div class="priceSubContent">
                        @if($min_price > 0)
                            <input type="number" id="priceMin" placeholder="min" value="{{$min_price}}">
                        @else
                            <input type="number" id="priceMin" placeholder="min">
                        @endif
                        <span>-</span>
                        @if($max_price > 0)
                            <input type="number" id="priceMax" placeholder="max" value="{{$max_price}}">
                        @else
                            <input type="number" id="priceMax" placeholder="max">
                        @endif
                    </div>
                    <div class="buttonArea">
                        <button id="searchPriceButton"><i class="far fa-search"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="productArea">
            <div class="filterProcess">
                <div id="filterTopAreaId" class="filterSubProcessTop">
                    <ul id="searchResultTextId" class="searchTitle">
                        {!! __('message.foundResult') !!}
                    </ul>
                    <div class="sortFilter">
                        <select id="sortBox" class="custom-select custom-select-sm form-control form-control-sm">
                            <option @if($sort === 'featured') selected @endif value="featured">@lang('message.featured')</option>
                            <option @if($sort === 'price_asc') selected @endif value="price_asc">@lang('message.priceAsc')</option>
                            <option @if($sort === 'price_desc') selected @endif value="price_desc">@lang('message.priceDesc')</option>
                            <option @if($sort === 'most_recent') selected @endif value="most_recent">@lang('message.newestArrivals')</option>
                            <option @if($sort === 'most_rated') selected @endif value="most_rated">@lang('message.mostRated')</option>
                        </select>
                    </div>
                </div>
            </div>
            <ul id="productsAll">

            </ul>
            <div id="paginationMoreProduct" class="paginationArea">

            </div>
        </div>

    </div>

    @include('blocks.footer')

@endsection

@section('scripts')
    <script type="text/javascript" src="{{asset('assets/js/privateJs/filter.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/privateJs/allProduct.js')}}"></script>
@endsection


