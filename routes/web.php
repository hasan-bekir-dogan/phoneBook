<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Dashboard;
use App\Http\Controllers\Authentication;
use App\Http\Controllers\Group;
use App\Http\Controllers\Contact;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



//admin panel processes (start)
//#######################################################################################################################################

//admin login
Route::get('/admin', function (){ return redirect(route('admin.login')); });
Route::get('/admin/login', [Login::class, "index"])->name('admin.login');
Route::post('/admin/loginFormSubmit', [Login::class, "login"])->name('admin.loginSubmit');

//admin logout
Route::get('/admin/logoutSubmit', [Login::class, "logout"])->name('admin.logoutSubmit');


Route::middleware(['authAdmin'])->group( function () {

    //admin dashboard
    Route::get('/admin/dashboard', [Dashboard::class, "index"])->name('admin.dashboard');

    //admin products
    Route::get('/admin/products', [Product::class, "index"])->name('admin.products');
    Route::post('/admin/showProducts', [Product::class, "showProducts"]);
    Route::get('/admin/add-product', [Product::class, "addProduct"])->name('admin.addProduct');
    Route::post('/admin/addProductFormSubmit', [Product::class, "addProductFormSubmit"]);
    Route::get('/admin/update-product/{id}', [Product::class, "updateProduct"]);
    Route::post('/admin/updateProductFormSubmit', [Product::class, "updateProductFormSubmit"]);
    Route::post('/admin/deleteProduct', [Product::class, "deleteProduct"]);
    Route::post('/admin/deleteImage', [Product::class, "deleteImage"]);

    //admin categories
    Route::get('/admin/categories', [Category::class, "index"])->name('admin.categories');
    Route::post('/admin/showCategories', [Category::class, "showCategories"]);
    Route::get('/admin/add-category', [Category::class, "addCategory"])->name('admin.addCategory');
    Route::post('/admin/addCategoryFormSubmit', [Category::class, "addCategoryFormSubmit"]);
    Route::get('/admin/update-category/{id}', [Category::class, "updateCategory"]);
    Route::post('/admin/updateCategoryFormSubmit', [Category::class, "updateCategoryFormSubmit"]);
    Route::post('/admin/deleteCategory', [Category::class, "deleteCategory"]);

    //admin brands
    Route::get('/admin/brands', [Brand::class, "index"])->name('admin.brands');
    Route::post('/admin/showBrands', [Brand::class, "showBrands"]);
    Route::get('/admin/add-brand', [Brand::class, "addBrand"])->name('admin.addBrand');
    Route::post('/admin/addBrandFormSubmit', [Brand::class, "addBrandFormSubmit"]);
    Route::get('/admin/update-brand/{id}', [Brand::class, "updateBrand"]);
    Route::post('/admin/updateBrandFormSubmit', [Brand::class, "updateBrandFormSubmit"]);
    Route::post('/admin/deleteBrand', [Brand::class, "deleteBrand"]);

    //admin users
    Route::get('/admin/users', [Users::class, "index"])->name('admin.users');
    Route::post('/admin/showUsers', [Users::class, "showUsers"]);
    Route::get('/admin/user-detail/{id}', [Users::class, "userDetail"]);
    Route::post('/admin/deleteUser', [Users::class, "deleteUser"]);

    //admin contacts
    Route::get('/admin/contacts', [ContactAdmin::class, "index"])->name('admin.contacts');
    Route::post('/admin/showContacts', [ContactAdmin::class, "showContacts"]);
    Route::get('/admin/contact-detail/{id}', [ContactAdmin::class, "contactDetail"]);
    Route::post('/admin/deleteContact', [ContactAdmin::class, "deleteContact"]);

    //admin orders
    Route::get('/admin/orders', [OrderAdmin::class, "index"])->name('admin.orders');
    Route::post('/admin/showOrders', [OrderAdmin::class, "showOrders"]);
    Route::get('/admin/order-detail/{id}', [OrderAdmin::class, "orderDetail"]);
    Route::post('/admin/showOrderItems', [OrderAdmin::class, "showOrderItems"]);
    Route::post('/admin/orderStatusFormSubmit', [OrderAdmin::class, "orderStatusFormSubmit"]);

});

//#######################################################################################################################################
//admin panel processes (end)


