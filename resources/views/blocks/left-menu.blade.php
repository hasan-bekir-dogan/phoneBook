
<nav class="pcoded-navbar">
    <div class="sidebar_toggle"><a href="#"><i class="icon-close icons"></i></a></div>
    <div class="pcoded-inner-navbar main-menu">
        <div class="">
            <div class="main-menu-header">
                <img class="img-40 img-radius" src="{{asset('assets/images/admin-default-image-small.png')}}" alt="User-Profile-Image">
                <div class="user-details">
                    <span>Hasan Bekir DOĞAN</span>
                    <span id="more-details">Computer Engineer<i class="ti-angle-down"></i></span>
                </div>
            </div>

            <div class="main-menu-content">
                <ul>
                    <li class="more-details">
                        <a href="{{route('logoutSubmit')}}">
                            <i class="far fa-sign-out-alt"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>


        <div class="pcoded-navigatio-lavel" data-i18n="nav.category.navigation">General</div>
        <ul class="pcoded-item pcoded-left-item">
            <li class="{{ \App\Helpers\Helper::set_active(['dashboard']) }}">
                <a href="{{route('dashboard')}}">
                    <span class="pcoded-micon dashboardSpan"><i class="ti-home"></i><b>D</b></span>
                    <span class="pcoded-mtext" data-i18n="nav.dash.main">Dashboard</span>
                    <span class="pcoded-mcaret"></span>
                </a>
            </li>
        </ul>

        <div class="pcoded-navigatio-lavel" data-i18n="nav.category.forms">Groups</div>

        <ul class="pcoded-item pcoded-left-item">
            <li class="pcoded-hasmenu {{ \App\Helpers\Helper::set_active(['group']) }}">
                <a href="javascript:void(0)">
                    <span class="pcoded-micon categorySpan"><i class="ti-layout-grid2-alt"></i></span>
                    <span class="pcoded-mtext" data-i18n="nav.basic-components.main">Groups</span>
                    <span class="pcoded-mcaret"></span>
                </a>
                <ul class="pcoded-submenu">

                    <li>
                        <a href="{{route('group-list')}}">
                            <span class="pcoded-micon"><i class="ti-angle-right"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.basic-components.alert">List Groups</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>

                    <li>
                        <a href="{{route('group-create')}}">
                            <span class="pcoded-micon"><i class="ti-angle-right"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.basic-components.alert">Add Group</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>

                </ul>
            </li>
        </ul>

        <div class="pcoded-navigatio-lavel" data-i18n="nav.category.navigation">Contact</div>
        <ul class="pcoded-item pcoded-left-item">
            <li class="pcoded-hasmenu  {{ \App\Helpers\Helper::set_active(['contact']) }}">
                <a href="javascript:void(0)">
                    <span class="pcoded-micon contactSpan"><i class="far fa-mailbox"></i></span>
                    <span class="pcoded-mtext" data-i18n="nav.basic-components.main">Contacts</span>
                    <span class="pcoded-mcaret"></span>
                </a>
                <ul class="pcoded-submenu">

                    <li>
                        <a href="{{route('contact-list')}}">
                            <span class="pcoded-micon"><i class="ti-angle-right"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.basic-components.alert">List Contacts</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>

                    <li>
                        <a href="{{route('contact-create')}}">
                            <span class="pcoded-micon"><i class="ti-angle-right"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.basic-components.alert">Add Contact</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>

                </ul>
            </li>
        </ul>

    </div>
</nav>
