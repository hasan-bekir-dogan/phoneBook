<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Authentication;
use App\Http\Controllers\Dashboard;
use App\Http\Controllers\Group;
use App\Http\Controllers\Contact;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a groups which
| contains the "web" middleware groups. Now create something great!
|
*/


// login
Route::get('/', function (){ return redirect(route('login')); });
Route::get('/login', [Authentication::class, "index"])->name('login');
Route::post('/loginFormSubmit', [Authentication::class, "login"])->name('loginSubmit');

// logout
Route::get('/logoutSubmit', [Authentication::class, "logout"])->name('logoutSubmit');


Route::middleware(['authAdmin'])->group( function () {

    // dashboard
    Route::get('/dashboard', [Dashboard::class, "index"])->name('dashboard');


    // CRUD for groups
    Route::get('groups', [Group::class, "index"]); // show groups
    Route::get('groups/{group}', [Group::class, "show"]); // view('update-group', group)
    Route::post('groups', [Group::class, "store"]); // create group
    Route::patch('groups/{group}', [Group::class, "update"]); // update group
    Route::delete('groups/{group}', [Group::class, "delete"]); // delete group
    // view pages for groups
    Route::get('group/list', [Group::class, "groupListPage"])->name('group-list'); // view('group list')
    Route::get('group/create', [Group::class, "addGroupPage"])->name('group-create'); // view('add-group')
    // search for groups
    Route::post('group/search', [Group::class, "search"]); // search group


    // CRUD for contacts
    Route::get('contacts', [Contact::class, "index"]); // show contacts
    Route::get('contacts/{contact}', [Contact::class, "show"]); // view('update-contact', contact)
    Route::post('contacts', [Contact::class, "store"]); // create contact
    Route::post('contacts/{contact}', [Contact::class, "update"]); // update contact
    Route::delete('contacts/{contact}', [Contact::class, "delete"]); // delete contact
    // get phones, emails and addresses information to show on update contact page
    Route::get('contact/show/other-information/{contact}', [Contact::class, "showOtherInformation"]); // show contact who have phones, emails and addresses
    // view pages for contacts
    Route::get('contact/list', [Contact::class, "contactListPage"])->name('contact-list'); // view('contact list')
    Route::get('contact/create', [Contact::class, "addContactPage"])->name('contact-create'); // view('add-contact')
    // search for contacts
    Route::post('contact/search', [Contact::class, "search"]); // search contact
    Route::post('contact/filter/group', [Contact::class, "filterGroup"]); // filter group
    Route::post('contact/filter/char', [Contact::class, "filterChar"]); // filter char

});


