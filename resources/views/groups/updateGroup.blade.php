@extends('layouts.general')

@section('metaSeo')
    <title>Admin Panel | Update Group</title>
    <meta name="description" content="Admin Panel | Update Group">
    <meta name="keywords" content='Admin Panel | Update Group'>
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
                                                                <div class="sub-title">Update Group</div>
                                                                <input type="text" id="groupId" value="{{$data['id']}}" style="visibility: hidden; display:none;">
                                                                <!-- Tab panes -->
                                                                <form id="groupEditForm" enctype='multipart/form-data'>
                                                                    @csrf
                                                                    <div class="userInformationArea">
                                                                        <div class="alert alert-success" role="alert" id="successMsg" style="display: none" >
                                                                            The brand information has successfully updated!
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <div class="row">
                                                                                <div class="col-lg-12">
                                                                                    <label for="groupNameEditForm">Name <span>*</span></label>
                                                                                    <input type="text" id="groupNameEditForm" class="form-control" value="{{$data['name']}}">
                                                                                    <div class="errorMessageArea">
                                                                                        <span class="text-danger" id="nameErrorMsg"></span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="buttonAreaHeadSection">
                                                                            <div class="buttonArea">
                                                                                <button type="submit" class="generalButton updateButton">UPDATE</button>
                                                                                <a href="{{route('groups.list')}}" class="generalButton cancelButton">CANCEL</a>
                                                                            </div>
                                                                            <div class="buttonArea">
                                                                                <a id="deleteGroupButtonId" href="javascript:void(0)" class="generalButton cancelButton deleteButton">DELETE</a>
                                                                            </div>
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
    <script type="text/javascript" src="{{asset('assets/js/privateJs/updateGroup.js')}}"></script>
@endsection

