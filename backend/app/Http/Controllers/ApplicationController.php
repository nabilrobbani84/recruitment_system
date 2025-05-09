<?php
namespace App\Http\Controllers\Api;

use App\Models\Application;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApplicationController extends Controller
{
    // Get all applications
    public function index()
    {
        return response()->json(Application::all());
    }

    // Store a new application
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'candidate_id' => 'required|exists:candidates,candidate_id',
            'job_id' => 'required|exists:jobs,job_id',
            'application_date' => 'required|date',
            'status' => 'required|in:pending,accepted,rejected',
        ]);

        $application = Application::create($validatedData);
        return response()->json($application, 201);
    }

    // Show a specific application by id
    public function show($id)
    {
        $application = Application::find($id);

        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        return response()->json($application);
    }

    // Update an existing application
    public function update(Request $request, $id)
    {
        $application = Application::findOrFail($id);
        $application->update($request->all());
        return response()->json($application);
    }

    // Delete an application
    public function destroy($id)
    {
        $application = Application::findOrFail($id);
        $application->delete();
        return response()->json(null, 204);
    }
}
