<?php

namespace App\Http\Controllers;

use App\Models\Activites as ModelsActivites;
use Illuminate\Http\Request;
use Carbon\Carbon;

class Activites extends Controller
{
    function index(Request $request)
    {
        $defaultFin = Carbon::today()->format('Y-m-d');
        $defaultDebut = Carbon::today()->subDays(31)->format('Y-m-d');

        $debut = $request->query('debut', $defaultDebut);
        $fin = $request->query('fin', $defaultFin);

        $data = ModelsActivites::getDailyData($debut, $fin);

        $debut = Carbon::parse($debut)->format('j F Y'); // Example: "2 June 2025"
        $fin = Carbon::parse($fin)->format('j F Y');

        $data = [
            'debut' => $debut,
            'fin' => $fin,
            'activites' => $data
        ];

        return response()->json($data);
    }
}
