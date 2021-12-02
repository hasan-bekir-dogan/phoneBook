<?php

namespace App\Http\Controllers;

use App\Models\Addresses;
use App\Models\Contacts;
use App\Models\Emails;
use App\Models\Groups;
use App\Models\LabelNameTypes;
use App\Models\Phones;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class Contact extends Controller
{
    public function index(){
        $currentPage = request()->get('page',1);

        $contacts = Cache::remember('contacts/page' . $currentPage, 10, function(){
            return Contacts::select('id', 'profile_photo_path', DB::raw("CONCAT(first_name,' ',last_name) AS name"))
                ->orderBy('name')
                ->paginate(15);
        });
        $groups = Cache::remember('groups', 30*60, function () {
            return Groups::selectRaw('id, name')
                ->orderBy('name')
                ->get();
        });

        return view('contacts.contacts', [
            'contacts' => $contacts,
            'groups' => $groups
        ]);
    }

    public function show($id){
        $groups = Cache::remember('groups', 30*60, function () {
            return Groups::selectRaw('id, name')
                ->orderBy('name')
                ->get();
        });

        $contact = Cache::remember('contact-' . $id, 10, function() use($id){
            return Contacts::selectRaw('id, group_id, profile_photo_path, first_name, last_name, company, birthday, notes')
                ->where('id', $id)
                ->get();
        });

        return view('contacts.updateContact', [
            'groups' => $groups,
            'contact' => $contact[0]
        ]);
    }

    public function update(Request $request, $id){
        $phone_ids = explode(",",$request->phoneIds);
        $phone_db_ids = explode(",",$request->phoneDbIds);
        $size_phone_ids = count($phone_ids);
        $email_ids = explode(",",$request->emailIds);
        $email_db_ids = explode(",",$request->emailDbIds);
        $size_email_ids = count($email_ids);
        $address_ids = explode(",",$request->addressIds);
        $address_db_ids = explode(",",$request->addressDbIds);
        $size_address_ids = count($address_ids);
        $deletedPhotoControl = $request->deletedPhotoControl;

        $validate_array = [
            'firstName' => ['required', 'max:255'],
            'lastName' => ['max:255'],
            'company' => ['max:255'],
            'photo.*' => 'mimes:jpg,png,jpeg,gif,svg|max:2048'
        ];

        if($phone_ids[0] !== "") {
            for ($x = 0; $x < $size_phone_ids; $x++) {
                $validate_array['phoneValue' . $phone_ids[$x]] = ['required', 'digits_between:0,15', 'numeric'];
                $validate_array['phoneLabel' . $phone_ids[$x]] = 'required';
            }
        }
        if($email_ids[0] !== "") {
            for ($u = 0; $u < $size_email_ids; $u++) {
                $validate_array['emailValue' . $email_ids[$u]] = ['required', 'email'];
                $validate_array['emailLabel' . $email_ids[$u]] = 'required';
            }
        }
        if($address_ids[0] !== "") {
            for ($c = 0; $c < $size_address_ids; $c++) {
                $validate_array['addressValue' . $address_ids[$c]] = ['required', 'max:255'];
                $validate_array['addressLabel' . $address_ids[$c]] = 'required';
            }
        }

        $this->validate($request, $validate_array,
            [
                'firstName' => 'First Name',
                'lastName' => 'Last Name',
                'firstName.required' => 'First name field is required.',
                'firstName.max' => 'First name must not be greater than 255 characters.',
                'lastName.max' => 'Last name must not be greater than 255 characters.',
                'company.max' => 'Company must not be greater than 255 characters.'
            ]
        );

        // store and update in uploads folder
        $name = "";
        if ($request->hasFile('photo')){

            $photoPath = Cache::remember('contact-' . $id, 10, function() use($id){
                return Contacts::selectRaw('id, group_id, profile_photo_path, first_name, last_name, company, birthday, notes')
                    ->where('id', $id)
                    ->get();
            });

            $photoPath = strval($photoPath[0]['profile_photo_path']);

            if($photoPath !== 'assets/images/profile-default-photo.png') {
                if (file_exists(public_path($photoPath))) {
                    unlink(public_path($photoPath));
                }
            }

            $photo = $request->file('photo');

            $name = strval(rand(1,9)).strval(time()).strval(rand(10,99));
            $name .= ".jpg";

            $photo->move(public_path().'/uploads/', $name);

            $name = "uploads/".$name;
        }
        else{
            if($deletedPhotoControl === true || $deletedPhotoControl === 'true') {

                $photoPath = Cache::remember('contact-' . $id, 10, function() use($id){
                    return Contacts::selectRaw('id, group_id, profile_photo_path, first_name, last_name, company, birthday, notes')
                        ->where('id', $id)
                        ->get();
                });

                $photoPath = strval($photoPath[0]['profile_photo_path']);

                if ($photoPath !== 'assets/images/profile-default-photo.png') {
                    if (file_exists(public_path($photoPath))) {
                        unlink(public_path($photoPath));
                    }
                }
                $name = "assets/images/profile-default-photo.png";
            }
            else{
                $photoPath = Cache::remember('contact-' . $id, 10, function() use($id){
                    return Contacts::selectRaw('id, group_id, profile_photo_path, first_name, last_name, company, birthday, notes')
                        ->where('id', $id)
                        ->get();
                });

                $name = strval($photoPath[0]['profile_photo_path']);
            }
        }


        // update contact
        Contacts::where('id', $id)
            ->update([
                'group_id' => $request->group,
                'profile_photo_path' => $name,
                'first_name' => $request->firstName,
                'last_name' => $request->lastName,
                'company' => $request->company,
                'birthday' => $request->birthday,
                'notes' => $request->notes,
            ]);

        //this area store and update phones in db
        if($phone_ids[0] !== "") {
            for ($t = 0; $t < $size_phone_ids; $t++) {
                if(in_array($phone_ids[$t], $phone_db_ids)) {
                    Phones::where('id', $phone_ids[$t])
                        ->update([
                            'label_name_id' => $request->all()["phoneLabel" . $phone_ids[$t]],
                            'phone' => $request->all()["phoneValue" . $phone_ids[$t]],
                        ]);
                }
                else{
                    $phone = new Phones();
                    $phone->contact_id = $id;
                    $phone->label_name_id = $request->all()["phoneLabel" . $phone_ids[$t]];
                    $phone->phone = $request->all()["phoneValue" . $phone_ids[$t]];
                    $phone->save();
                }
            }
            //this section delete from db if that address deleted from user
            for ($y = 0; $y < $size_phone_ids; $y++){
                if(in_array($phone_db_ids[$y], $phone_ids) === false) {
                    Phones::where('id', $phone_db_ids[$y])
                        ->delete();
                }
            }
        }
        //this area store and update emails in db
        if($email_ids[0] !== "") {
            for ($s = 0; $s < $size_email_ids; $s++) {
                if(in_array($email_ids[$s], $email_db_ids)) {
                    Emails::where('id', $email_ids[$s])
                        ->update([
                            'label_name_id' => $request->all()["emailLabel" . $email_ids[$s]],
                            'email' => $request->all()["emailValue" . $email_ids[$s]],
                        ]);
                }
                else{
                    $email = new Emails();
                    $email->contact_id = $id;
                    $email->label_name_id = $request->all()["emailLabel" . $email_ids[$s]];
                    $email->email = $request->all()["emailValue" . $email_ids[$s]];
                    $email->save();
                }
            }
            //this section delete from db if that address deleted from user
            for ($v = 0; $v < $size_email_ids; $v++){
                if(in_array($email_db_ids[$v], $email_ids) === false) {
                    Emails::where('id', $email_db_ids[$v])
                        ->delete();
                }
            }
        }
        //this area store and update addresses in db
        if($address_ids[0] !== "") {
            for ($r = 0; $r < $size_address_ids; $r++) {
                if(in_array($address_ids[$r], $address_db_ids)) {
                    Addresses::where('id', $address_ids[$r])
                        ->update([
                            'label_name_id' => $request->all()["addressLabel" . $address_ids[$r]],
                            'address' => $request->all()["addressValue" . $address_ids[$r]],
                        ]);
                }
                else{
                    $address = new Addresses();
                    $address->contact_id = $id;
                    $address->label_name_id = $request->all()["addressLabel" . $address_ids[$r]];
                    $address->address = $request->all()["addressValue" . $address_ids[$r]];
                    $address->save();
                }
            }
            //this section delete from db if that address deleted from user
            for ($b = 0; $b < $size_address_ids; $b++){
                if(in_array($address_db_ids[$b], $address_ids) === false) {
                    Addresses::where('id', $address_db_ids[$b])
                        ->delete();
                }
            }
        }

        // caching area
        Cache::put('totalContactNumber', Contacts::count(), 30*60);


        return response()->json([
            'status' => 'successful'
        ]);
    }
    public function delete($id){
        $photoPath = Cache::remember('contact-' . $id, 10, function() use($id){
            return Contacts::selectRaw('id, group_id, profile_photo_path, first_name, last_name, company, birthday, notes')
                ->where('id', $id)
                ->get();
        });

        $photoPath = strval($photoPath[0]['profile_photo_path']);

        if($photoPath !== 'assets/images/profile-default-photo.png') {
            if (file_exists(public_path($photoPath))) {
                unlink(public_path($photoPath));
            }
        }

        Contacts::where('id', $id)
            ->delete();

        Addresses::where('contact_id', $id)
            ->delete();

        Phones::where('contact_id', $id)
            ->delete();

        Emails::where('contact_id', $id)
            ->delete();

        // caching area
        Cache::put('totalContactNumber', Contacts::count(), 30*60);

        return response()->json([
            'status' => 'successful'
        ]);
    }
    public function store(Request $request){
        $phone_ids = explode(",",$request->phoneIds);
        $size_phone_ids = count($phone_ids);
        $email_ids = explode(",",$request->emailIds);
        $size_email_ids = count($email_ids);
        $address_ids = explode(",",$request->addressIds);
        $size_address_ids = count($address_ids);

        $validate_array = [
            'firstName' => ['required', 'max:255'],
            'lastName' => ['max:255'],
            'company' => ['max:255'],
            'photo.*' => 'mimes:jpg,png,jpeg,gif,svg|max:2048'
        ];

        if($phone_ids[0] !== "") {
            for ($x = 0; $x < $size_phone_ids; $x++) {
                $validate_array['phoneValue' . $phone_ids[$x]] = ['required', 'digits_between:0,15', 'numeric'];
                $validate_array['phoneLabel' . $phone_ids[$x]] = 'required';
            }
        }
        if($email_ids[0] !== "") {
            for ($u = 0; $u < $size_email_ids; $u++) {
                $validate_array['emailValue' . $email_ids[$u]] = ['required', 'email'];
                $validate_array['emailLabel' . $email_ids[$u]] = 'required';
            }
        }
        if($address_ids[0] !== "") {
            for ($c = 0; $c < $size_address_ids; $c++) {
                $validate_array['addressValue' . $address_ids[$c]] = ['required', 'max:255'];
                $validate_array['addressLabel' . $address_ids[$c]] = 'required';
            }
        }

        $this->validate($request, $validate_array,
            [
                'firstName' => 'First Name',
                'lastName' => 'Last Name',
                'firstName.required' => 'First name field is required.',
                'firstName.max' => 'First name must not be greater than 255 characters.',
                'lastName.max' => 'Last name must not be greater than 255 characters.',
                'company.max' => 'Company must not be greater than 255 characters.'
            ]
        );

        // store in uploads folder
        $name = "";
        if ($request->hasFile('photo')){

            $photo = $request->file('photo');

            $name = strval(rand(1,9)).strval(time()).strval(rand(10,99));
            $name .= ".jpg";

            $photo->move(public_path().'/uploads/', $name);
        }

        if($name === "")
            $name = "assets/images/profile-default-photo.png";
        else
            $name = "uploads/".$name;

        // store to contacts db
        $contact = new Contacts();
        $contact->group_id = $request->group;
        $contact->profile_photo_path = $name;
        $contact->first_name = $request->firstName;
        $contact->last_name = $request->lastName;
        $contact->company = $request->company;
        $contact->birthday = $request->birthday;
        $contact->notes = $request->notes;
        $contact->save();


        //this area store phones in db
        if($phone_ids[0] !== "") {
            for ($t = 0; $t < $size_phone_ids; $t++) {
                $phone = new Phones();
                $phone->contact_id = $contact->id;
                $phone->label_name_id = $request->all()["phoneLabel" . $phone_ids[$t]];
                $phone->phone = $request->all()["phoneValue" . $phone_ids[$t]];
                $phone->save();
            }
        }
        //this area store emails in db
        if($email_ids[0] !== "") {
            for ($s = 0; $s < $size_email_ids; $s++) {
                $email = new Emails();
                $email->contact_id = $contact->id;
                $email->label_name_id = $request->all()["emailLabel" . $email_ids[$s]];
                $email->email = $request->all()["emailValue" . $email_ids[$s]];
                $email->save();
            }
        }
        //this area store addresses in db
        if($address_ids[0] !== "") {
            for ($r = 0; $r < $size_address_ids; $r++) {
                $address = new Addresses();
                $address->contact_id = $contact->id;
                $address->label_name_id = $request->all()["addressLabel" . $address_ids[$r]];
                $address->address = $request->all()["addressValue" . $address_ids[$r]];
                $address->save();
            }
        }

        // caching area
        Cache::put('totalContactNumber', Contacts::count(), 30*60);


        return response()->json([
            'status' => 'successful'
        ]);
    }

    public function showOtherInformation($id){
        $phones = Cache::remember('phone-' . $id, 10, function() use($id){
            return Phones::selectRaw('id, label_name_id, phone')
                ->where('contact_id', $id)
                ->get();
        });
        $emails = Cache::remember('email-' . $id, 10, function() use($id){
            return Emails::selectRaw('id, label_name_id, email')
                ->where('contact_id', $id)
                ->get();
        });
        $addresses = Cache::remember('address-' . $id, 10, function() use($id){
            return Addresses::selectRaw('id, label_name_id, address')
                ->where('contact_id', $id)
                ->get();
        });

        return response()->json([
            'phones' => $phones,
            'emails' => $emails,
            'addresses' => $addresses
        ]);
    }

    public function addContactPage(){
        $groups = Cache::remember('groups', 30*60, function () {
            return Groups::selectRaw('id, name')
                ->orderBy('name')
                ->get();
        });

        $phoneLabelNames = Cache::rememberForever('phoneLabelNameTypes', function () {
            return LabelNameTypes::selectRaw('id, name')
                ->get();
        });

        $emailAndAddressLabelNames = Cache::rememberForever('emailAndAddressLabelNameTypes', function () {
            return LabelNameTypes::selectRaw('id, name')
                ->where('id', '!=', 1)
                ->where('id', '!=', 5)
                ->get();
        });

        return view('contacts.addContact', [
            'groups' => $groups,
            'phoneLabelNames' => $phoneLabelNames,
            'emailAndAddressLabelNames' => $emailAndAddressLabelNames
        ]);
    }
    public function search(Request $request){
        $search_word = $request->search_word;

        $contacts = Contacts::select('id', 'profile_photo_path', DB::raw("CONCAT(first_name,' ',last_name) AS name"))
                ->where('first_name', 'ILIKE', '%' . $search_word . '%')
                ->orWhere('last_name', 'ILIKE', '%' . $search_word . '%')
                ->orderBy('name')
                ->paginate(15);

        $groups = Cache::remember('groups', 30*60, function () {
            return Groups::selectRaw('id, name')
                ->orderBy('name')
                ->get();
        });

        return view('contacts.contacts', [
            'contacts' => $contacts,
            'groups' => $groups
        ]);
    }
    public function filterGroup(Request $request){
        $id = $request->group_id;

        if($id === 0 || $id === '0'){
            $contacts = Contacts::select('id', 'profile_photo_path', DB::raw("CONCAT(first_name,' ',last_name) AS name"))
                    ->orderBy('name')
                    ->paginate(15);
        }
        else {
            $contacts = Contacts::select('id', 'profile_photo_path', DB::raw("CONCAT(first_name,' ',last_name) AS name"))
                    ->where('group_id', $id)
                    ->orderBy('name')
                    ->paginate(15);
        }

        $groups = Cache::remember('groups', 30*60, function () {
            return Groups::selectRaw('id, name')
                ->orderBy('name')
                ->get();
        });


        return view('contacts.contacts', [
            'contacts' => $contacts,
            'groups' => $groups
        ]);
    }
    public function filterChar(Request $request){
        $start_val = $request->char;

        if($start_val === 0 || $start_val === '0'){
            $contacts = Contacts::select('id', 'profile_photo_path', DB::raw("CONCAT(first_name,' ',last_name) AS name"))
                    ->orderBy('name')
                    ->paginate(15);
        }
        else {
            $contacts = Contacts::select('id', 'profile_photo_path', DB::raw("CONCAT(first_name,' ',last_name) AS name"))
                    ->where('first_name', 'ILIKE', $start_val.'%')
                    ->orderBy('name')
                    ->paginate(15);
        }

        $groups = Cache::remember('groups', 30*60, function () {
            return Groups::selectRaw('id, name')
                ->orderBy('name')
                ->get();
        });


        return view('contacts.contacts', [
            'contacts' => $contacts,
            'groups' => $groups
        ]);
    }
}
