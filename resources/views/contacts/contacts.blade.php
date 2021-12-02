@extends('layouts.general')

@section('metaSeo')
    <title>technoshop | laravel </title>
    <meta name="description" content="technoshop |  laravel">
    <meta name="keywords" content='technoshop | laravel'>
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
                                                                <div class="sub-title">Contacts</div>
                                                                <!-- Hover table card start -->
                                                                <div class="card productTable">
                                                                    <div class="productSpecification">
                                                                        <div class="searchProductArea">
                                                                            <form action="{{route('contact.filter.group')}}" method="GET" name="groupForm">
                                                                                <select id="filterGroup" name="group_id" class="form-control" onchange="groupForm.submit();">
                                                                                    <option value="-1" disabled selected>Filter as Group</option>
                                                                                    <option value="0">All Records</option>
                                                                                    @foreach($groups as $group)
                                                                                        @if((int)app('request')->input('group_id') === (int)$group['id'])
                                                                                            <option selected value="{{$group['id']}}">{{$group['name']}}</option>
                                                                                        @else
                                                                                            <option value="{{$group['id']}}">{{$group['name']}}</option>
                                                                                        @endif
                                                                                    @endforeach
                                                                                </select>
                                                                            </form>
                                                                        </div>
                                                                        <div class="searchProductArea">
                                                                            <form action="{{route('contact.filter.char')}}" method="GET" name="alphabetForm">
                                                                                <select id="filterAlphabet" name="char" class="form-control" onchange="alphabetForm.submit();">
                                                                                    <option value="-1" disabled selected>Filter as Alphabetic</option>
                                                                                    <option value="0">All Records</option>
                                                                                    @foreach(range('A', 'Z') as $char)
                                                                                        @if(app('request')->input('char') === $char)
                                                                                            <option selected value="{{$char}}">{{$char}}</option>
                                                                                        @else
                                                                                            <option value="{{$char}}">{{$char}}</option>
                                                                                        @endif
                                                                                    @endforeach
                                                                                </select>
                                                                            </form>
                                                                        </div>
                                                                        <div class="searchProductArea">
                                                                            <div class="searchLabel">
                                                                                Find:
                                                                            </div>
                                                                            <form action="{{route('contact.search')}}" method="GET">
                                                                                @if(app('request')->input('search_word'))
                                                                                    <input type="text" name="search_word" id="searchContact" class="form-control" placeholder="Search" value="{{ app('request')->input('search_word') }}">
                                                                                @else
                                                                                    <input type="text" name="search_word" id="searchContact" class="form-control" placeholder="Search">
                                                                                @endif
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                    <div id="adminProducts">
                                                                        <div class="card-block table-border-style productTableDetailArea">
                                                                            <div class="table-responsive">
                                                                                <table class="table table-hover">
                                                                                    <thead>
                                                                                    <tr>
                                                                                        <th width="150px">Profile Photo</th>
                                                                                        <th>Name</th>
                                                                                        <th width="200px">Transactions</th>
                                                                                    </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        @foreach($contacts as $contact)
                                                                                            <tr>
                                                                                                <td style="vertical-align: middle"><img class="contactsPhoto" src="/{{$contact->profile_photo_path}}" alt="Profile Photo"></td>
                                                                                                <td style="vertical-align: middle">{{$contact->name}}</td>
                                                                                                <td style="vertical-align: middle" class="transactionArea">
                                                                                                    <div class="transactionSubArea">
                                                                                                        <a class="editButton" href="/contacts/{{$contact->id}}">
                                                                                                            <i class="fal fa-edit"></i> Edit
                                                                                                        </a>
                                                                                                        <button class="deleteButton" type=button onclick="deleteContact({{$contact->id}})">
                                                                                                            <i class="far fa-trash-alt"></i> Delete
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        @endforeach
                                                                                    </tbody>
                                                                                </table>
                                                                                <div class="paginationLinksArea">
                                                                                    @if(app('request')->input('search_word'))
                                                                                        {!! $contacts->appends(['search_word' => app('request')->input('search_word')])->links() !!}
                                                                                    @elseif(app('request')->input('group_id'))
                                                                                        {!! $contacts->appends(['group_id' => app('request')->input('group_id')])->links() !!}
                                                                                    @elseif(app('request')->input('char'))
                                                                                        {!! $contacts->appends(['char' => app('request')->input('char')])->links() !!}
                                                                                    @else
                                                                                        {!! $contacts->links() !!}
                                                                                    @endif
                                                                                </div>
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
    <script type="text/javascript" src="{{asset('assets/js/privateJs/contacts.js')}}"></script>
@endsection

