<?php

namespace App\Http\Controllers;

use App\Models\Contacts;
use App\Models\Groups;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class Group extends Controller
{
    public function index(){
        $data = Cache::remember('groups', 30*60, function () {
            return Groups::selectRaw('id, name')
                ->orderBy('name')
                ->get();
        });
        $totalDataNumber = Cache::remember('totalGroupNumber', 30*60, function () {
            return Groups::count();
        });

        return response()->json([
            'data' => $data,
            'totalDataNumber' => $totalDataNumber
        ], 200);
    }

    public function show($id){
        $data = Groups::selectRaw('id, name')
            ->where('id', $id)
            ->get();

        return view('groups.updateGroup', [
            'data' => $data[0]
        ]);
    }

    public function update(Request $request, $id){
        $request->validate([
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

        // caching area
        $groupData = Groups::selectRaw('id, name')
            ->orderBy('name')
            ->get();

        Cache::put('groups', $groupData, 30*60);
        Cache::put('totalGroupNumber', $groupData->count(), 30*60);

        return response()->json([
            'status' => 'successful'
        ],200);
    }
    public function delete(Request $request, $id){
        Groups::where('id', $id)
            ->delete();

        Contacts::where('group_id', $id)
                ->update([
                    'group_id' => 0
                ]);

        // caching area
        $groupData = Groups::selectRaw('id, name')
            ->orderBy('name')
            ->get();

        Cache::put('groups', $groupData, 30*60);
        Cache::put('totalGroupNumber', $groupData->count(), 30*60);

        return response()->json([
            'status' => 'successful'
        ]);
    }
    public function store(Request $request){
        $request->validate([
            'name' => ['required', 'max:255'],
        ],
            [
                'name' => 'group name',
                'name.required' => 'The group name field is required.',
                'name.max' => 'The group name must not be greater than 255 characters.'
            ]
        );

        $group = new Groups();
        $group->name = $request->name;
        $group->save();

        // caching area
        $groupData = Groups::selectRaw('id, name')
            ->orderBy('name')
            ->get();

        Cache::put('groups', $groupData, 30*60);
        Cache::put('totalGroupNumber', $groupData->count(), 30*60);

        return response()->json([
            'status' => 'successful'
        ]);
    }

    public function groupListPage(){
        return view('groups.groups');
    }
    public function addGroupPage(){
        return view('groups.addGroup');
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
