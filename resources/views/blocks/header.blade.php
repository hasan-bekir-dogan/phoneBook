
<nav class="navbar header-navbar pcoded-header">
    <div class="navbar-wrapper">

        <div class="navbar-logo">
            <a class="mobile-menu" id="mobile-collapse" href="#!">
                <i class="ti-menu"></i>
            </a>
            <a class="mobile-search morphsearch-search" href="#">
                <i class="ti-search"></i>
            </a>
            <a class="logoArea" href="{{route('dashboard')}}">
                <h5>Phone Book</h5>
            </a>
            <a class="mobile-options">
                <i class="ti-more"></i>
            </a>
        </div>

        <div class="navbar-container container-fluid">
            <ul class="nav-left">
                <li>
                    <div class="sidebar_toggle"><a href="javascript:void(0)"><i class="ti-menu"></i></a></div>
                </li>

                <li>
                    <a href="#!" onclick="javascript:toggleFullScreen()">
                        <i class="ti-fullscreen"></i>
                    </a>
                </li>
            </ul>
            <ul class="nav-right">
                <li class="user-profile header-notification">
                    <a href="#!">
                        <img src="{{asset('assets/images/admin-default-image-small.png')}}" class="img-radius" alt="User-Profile-Image">
                        <span>Hasan Bekir DOĞAN</span>
                        <i class="ti-angle-down"></i>
                    </a>
                    <ul class="show-notification profile-notification">
                        <li>
                            <button onclick="window.location.href='{{route('logoutSubmit')}}'" name="submitSignout">
                                <i class="far fa-sign-out-alt"></i> Logout
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
