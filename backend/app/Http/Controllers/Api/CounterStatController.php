<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CounterStat;
use App\Http\Requests\StoreCounterStatRequest;
use App\Http\Requests\UpdateCounterStatRequest;

class CounterStatController extends Controller
{
    public function index()
    {
        return response()->json(CounterStat::all());
    }

    public function store(StoreCounterStatRequest $request)
    {
        $stat = CounterStat::create($request->validated());
        return response()->json($stat, 201);
    }

    public function show(CounterStat $counterStat)
    {
        return response()->json($counterStat);
    }

    public function update(UpdateCounterStatRequest $request, CounterStat $counterStat)
    {
        $counterStat->update($request->validated());
        return response()->json($counterStat);
    }

    public function destroy(CounterStat $counterStat)
    {
        $counterStat->delete();
        return response()->json(null, 204);
    }
}
