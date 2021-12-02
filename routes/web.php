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
    Route::get('groups', [Group::class, "index"])->name('groups.list'); // view('group list', groups)
    Route::get('groups/{group}', [Group::class, "show"]); // view('update-group', group)
    Route::post('groups', [Group::class, "store"]); // create group
    Route::patch('groups/{group}', [Group::class, "update"]); // update group
    Route::delete('groups/{group}', [Group::class, "delete"]); // delete group
    // view pages for groups
    Route::get('group/create', [Group::class, "addGroupPage"])->name('group-create'); // view('add-group')
    // search for groups
    Route::get('group/search', [Group::class, "search"])->name('group.search'); // search group


    // CRUD for contacts
    Route::get('contacts', [Contact::class, "index"])->name('contacts.list'); // view('contact list', contacts)
    Route::get('contacts/{contact}', [Contact::class, "show"]); // view('update-contact', contact)
    Route::post('contacts', [Contact::class, "store"]); // create contact
    Route::post('contacts/{contact}', [Contact::class, "update"]); // update contact
    Route::delete('contacts/{contact}', [Contact::class, "delete"]); // delete contact
    // get phones, emails and addresses information to show on update contact page
    Route::get('contact/show/other-information/{contact}', [Contact::class, "showOtherInformation"]); // show contact who have phones, emails and addresses
    // view pages for contacts
    Route::get('contact/create', [Contact::class, "addContactPage"])->name('contact-create'); // view('add-contact')
    // search for contacts
    Route::get('contact/search', [Contact::class, "search"])->name('contact.search'); // search contact
    Route::get('contact/filter/group', [Contact::class, "filterGroup"])->name('contact.filter.group'); // filter group
    Route::get('contact/filter/char', [Contact::class, "filterChar"])->name('contact.filter.char'); // filter char

});


