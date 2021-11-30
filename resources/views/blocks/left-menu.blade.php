
<nav class="pcoded-navbar">
    <div class="sidebar_toggle"><a href="#"><i class="icon-close icons"></i></a></div>
    <div class="pcoded-inner-navbar main-menu">
        <div class="">
            <div class="main-menu-header">
                <img class="img-40 img-radius" src="{{asset('/assets-admin/images/default-image-small.png')}}" alt="User-Profile-Image">
                <div class="user-details">
                    <span>Hasan Bekir DOĞAN</span>
                    <span id="more-details">Computer Engineer<i class="ti-angle-down"></i></span>
                </div>
            </div>

            <div class="main-menu-content">
                <ul>
                    <li class="more-details">
                        <a href="{{route('admin.logoutSubmit')}}">
                            <i class="far fa-sign-out-alt"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>


        <div class="pcoded-navigatio-lavel" data-i18n="nav.category.navigation">General</div>
        <ul class="pcoded-item pcoded-left-item">
            <li class="{{ \App\Helpers\Helper::set_active(['dashboard']) }}">
                <a href="{{route('admin.dashboard')}}">
                    <span class="pcoded-micon dashboardSpan"><i class="ti-home"></i><b>D</b></span>
                    <span class="pcoded-mtext" data-i18n="nav.dash.main">Dashboard</span>
                    <span class="pcoded-mcaret"></span>
                </a>
            </li>
        </ul>

        <div class="pcoded-navigatio-lavel" data-i18n="nav.category.navigation">Orders</div>
        <ul class="pcoded-item pcoded-left-item">
            <li class="{{ \App\Helpers\Helper::set_active(['order']) }}">
                <a href="{{route('admin.orders')}}">
                    <span class="pcoded-micon orderSpan"><i class="far fa-dolly-flatbed-alt"></i></span>
                    <span class="pcoded-mtext" data-i18n="nav.dash.main">Orders</span>
                    <span class="pcoded-mcaret"></span>
                </a>
            </li>
        </ul>

        <div class="pcoded-navigatio-lavel" data-i18n="nav.category.forms">Products</div>
        <ul class="pcoded-item pcoded-left-item">
            <li class="pcoded-hasmenu  {{ \App\Helpers\Helper::set_active(['product']) }}">
                <a href="javascript:void(0)">
                    <span class="pcoded-micon productSpan"><i class="far fa-box"></i></span>
                    <span class="pcoded-mtext" data-i18n="nav.basic-components.main">Products</span>
                    <span class="pcoded-mcaret"></span>
                </a>
                <ul class="pcoded-submenu">

                    <li>
                        <a href="{{route('admin.products')}}">
                            <span class="pcoded-micon"><i class="ti-angle-right"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.basic-components.alert">List Products</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>

                    <li>
                        <a href="{{route('admin.addProduct')}}">
                            <span class="pcoded-micon"><i class="ti-angle-right"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.basic-components.alert">Add Product</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>

                </ul>
            </li>
        </ul>
        <ul class="pcoded-item pcoded-left-item">
            <li class="pcoded-hasmenu {{ \App\Helpers\Helper::set_active(['category', 'categories']) }}">
                <a href="javascript:void(0)">
                    <span class="pcoded-micon categorySpan"><i class="ti-layout-grid2-alt"></i></span>
                    <span class="pcoded-mtext" data-i18n="nav.basic-components.main">Categories</span>
                    <span class="pcoded-mcaret"></span>
                </a>
                <ul class="pcoded-submenu">

                    <li>
                        <a href="{{route('admin.categories')}}">
                            <span class="pcoded-micon"><i class="ti-angle-right"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.basic-components.alert">List Categories</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>

                    <li>
                        <a href="{{route('admin.addCategory')}}">
                            <span class="pcoded-micon"><i class="ti-angle-right"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.basic-components.alert">Add Category</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>

                </ul>
            </li>
        </ul>
        <ul class="pcoded-item pcoded-left-item">
            <li class="pcoded-hasmenu {{ \App\Helpers\Helper::set_active(['brand']) }}">
                <a href="javascript:void(0)">
                    <span class="pcoded-micon brandSpan"><i class="far fa-tags"></i></span>
                    <span class="pcoded-mtext" data-i18n="nav.basic-components.main">Brands</span>
                    <span class="pcoded-mcaret"></span>
                </a>
                <ul class="pcoded-submenu">

                    <li>
                        <a href="{{route('admin.brands')}}">
                            <span class="pcoded-micon"><i class="ti-angle-right"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.basic-components.alert">List Brands</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>

                    <li>
                        <a href="{{route('admin.addBrand')}}">
                            <span class="pcoded-micon"><i class="ti-angle-right"></i></span>
                            <span class="pcoded-mtext" data-i18n="nav.basic-components.alert">Add Brand</span>
                            <span class="pcoded-mcaret"></span>
                        </a>
                    </li>

                </ul>
            </li>
        </ul>

        <div class="pcoded-navigatio-lavel" data-i18n="nav.category.navigation">Contact</div>
        <ul class="pcoded-item pcoded-left-item">
            <li class="{{ \App\Helpers\Helper::set_active(['contact']) }}">
                <a href="{{route('admin.contacts')}}">
                    <span class="pcoded-micon contactSpan"><i class="far fa-mailbox"></i></span>
                    <span class="pcoded-mtext" data-i18n="nav.dash.main">Contact</span>
                    <span class="pcoded-mcaret"></span>
                </a>
            </li>
        </ul>

        <div class="pcoded-navigatio-lavel" data-i18n="nav.category.navigation">Users</div>
        <ul class="pcoded-item pcoded-left-item">
            <li class="{{ \App\Helpers\Helper::set_active(['user']) }}">
                <a href="{{route('admin.users')}}">
                    <span class="pcoded-micon userSpan"><i class="far fa-users"></i></span>
                    <span class="pcoded-mtext" data-i18n="nav.dash.main">Users</span>
                    <span class="pcoded-mcaret"></span>
                </a>
            </li>
        </ul>

    </div>
</nav>
