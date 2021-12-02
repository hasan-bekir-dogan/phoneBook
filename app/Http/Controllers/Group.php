<?php

namespace App\Http\Controllers;

use App\Models\Contacts;
use App\Models\Groups;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class Group extends Controller
{
    public function index(){
        $currentPage = request()->get('page',1);

        $groups = Cache::remember('groups/page' . $currentPage, 10, function(){
            return Groups::selectRaw('id, name')
                ->orderBy('name')
                ->paginate(15);
        });

        $totalGroupNumber = Cache::remember('totalGroupNumber', 30*60, function(){
            return Groups::count();
        });

        return view('groups.groups', [
            'groups' => $groups,
            'totalGroupNumber' => $totalGroupNumber
        ]);
    }

    public function show($id){
        $group = Cache::remember('group-' . $id, 10, function() use($id){
            return Groups::selectRaw('id, name')
                ->where('id', $id)
                ->orderBy('name')
                ->get();
        });

        return view('groups.updateGroup', [
            'data' => $group[0]
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
        Cache::put('totalGroupNumber', Groups::count(), 30*60);

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
        Cache::put('totalGroupNumber', Groups::count(), 30*60);

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
        Cache::put('totalGroupNumber', Groups::count(), 30*60);

        return response()->json([
            'status' => 'successful'
        ]);
    }

    public function addGroupPage(){
        return view('groups.addGroup');
    }
    public function search(Request $request){
        $search_word = $request->search_word;

        $groups = Groups::selectRaw('id, name')
                ->where('name', 'ILIKE', '%' . $search_word . '%')
                ->orderBy('name')
                ->paginate(15);

        $totalGroupNumber = Groups::where('name', 'ILIKE', '%' . $search_word . '%')
                ->count();

        return view('groups.groups', [
            'groups' => $groups,
            'totalGroupNumber' => $totalGroupNumber
        ]);
    }
}
