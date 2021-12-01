<?php

namespace App\Http\Controllers;

use App\Models\Contacts;
use Illuminate\Http\Request;

class Contact extends Controller
{
    public function index(){
        // return contacts data as json

        /*$data = Groups::selectRaw('id, name')
            ->get();

        $totalDataNumber = $data->count();

        return response()->json([
            'data' => $data,
            'totalDataNumber' => $totalDataNumber
        ], 200);*/
    }
    public function show($id){
        // view updateContacts and send contacts data

        /*$data = Groups::selectRaw('id, name')
            ->where('id', $id)
            ->get();

        return view('groups.updateGroup', [
            'data' => $data[0]
        ]);*/
    }
    public function update(Request $request, $id){
        // update data in db

        /*$request->validate([
            'name' => ['required', 'max:255'],
        ],
            [
                'name' => 'group name',
                'name.required' => 'The group name field is required.',
                'name.max' => 'The group name must not be greater than 255 characters.'
            ]
        );

        $name = $request->name;

        Groups::where('id', $id)
            ->update([
                'name' => $name
            ]);

        return response()->json([
            'status' => 'successful'
        ],200);*/
    }
    public function delete(Request $request, $id){
        // delete data in db

        /*Groups::where('id', $id)
            ->delete();

        Contacts::where('group_id', $id)
            ->update([
                'group_id' => 0
            ]);

        return response()->json([
            'status' => 'successful'
        ]);*/
    }
    public function store(Request $request){
        // store in db

        /*$request->validate([
            'name' => ['required', 'max:255'],
        ],
            [
                'name' => 'group name',
                'name.required' => 'The group name field is required.',
                'name.max' => 'The group name must not be greater than 255 characters.'
            ]
        );

        $product = new Groups();
        $product->name = $request->name;
        $product->save();

        return response()->json([
            'status' => 'successful'
        ]);*/
    }
    public function groupListPage(){
        // view list page

        //return view('groups.groups');
    }
    public function addGroupPage(){
        // view add page

        //return view('groups.addGroup');
    }
    public function search(Request $request){
        $search_word = $request->search_word;

        $data = Groups::selectRaw('id, name')
            ->where('name', 'ILIKE', '%' . $search_word . '%')
            ->get();

        $totalDataNumber = $data->count();


        return response()->json([
            'data' => $data,
            'totalDataNumber' => $totalDataNumber
        ], 200);
    }
}
