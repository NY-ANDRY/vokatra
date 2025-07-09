<?php

namespace App\Http\Controllers;

use App\Models\T_saisons;
use Illuminate\Http\Request;

class Saisons extends Controller
{

    function index()
    {
        $result = [
            "items" => []
        ];

        $categories = T_saisons::all()->map(function ($item) {
            return [
                "value" => $item->id,
                "label" => $item->nom,
            ];
        });
        
        $result["items"] = $categories;

        return response()->json($result);
    }
}
