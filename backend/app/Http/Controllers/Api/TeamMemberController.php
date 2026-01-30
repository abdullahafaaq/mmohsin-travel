<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use App\Http\Requests\StoreTeamMemberRequest;
use App\Http\Requests\UpdateTeamMemberRequest;

class TeamMemberController extends Controller
{
    public function index()
    {
        return response()->json(TeamMember::all());
    }

    public function store(StoreTeamMemberRequest $request)
    {
        $teamMember = TeamMember::create($request->validated());
        return response()->json($teamMember, 201);
    }

    public function show(TeamMember $teamMember)
    {
        return response()->json($teamMember);
    }

    public function update(UpdateTeamMemberRequest $request, TeamMember $teamMember)
    {
        $teamMember->update($request->validated());
        return response()->json($teamMember);
    }

    public function destroy(TeamMember $teamMember)
    {
        $teamMember->delete();
        return response()->json(null, 204);
    }
}
