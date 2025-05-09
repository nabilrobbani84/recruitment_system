<?php

namespace App\Http\Controllers;

use App\Models\Interview;
use Illuminate\Http\Request;

class InterviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $interviews = Interview::all();
        return view('interviews.index', compact('interviews'));
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('interviews.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'application_id' => 'required',
            'interview_date' => 'required|date',
            'interview_time' => 'required',
            'interview_location' => 'required',
            'status' => 'required',
        ]);

        Interview::create($request->all());
        return redirect()->route('interviews.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $interview = Interview::findOrFail($id);
        return view('interviews.show', compact('interview'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $interview = Interview::findOrFail($id);
        return view('interviews.edit', compact('interview'));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'application_id' => 'required',
            'interview_date' => 'required|date',
            'interview_time' => 'required',
            'interview_location' => 'required',
            'status' => 'required',
        ]);

        $interview = Interview::findOrFail($id);
        $interview->update($request->all());
        return redirect()->route('interviews.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
