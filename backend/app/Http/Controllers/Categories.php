<?php

namespace App\Http\Controllers;

use App\Models\T_categories;
use App\Models\T_produits;
use Illuminate\Http\Request;
use Carbon\Carbon;

class Categories extends Controller
{
    function index()
    {
        $result = [
            "items" => []
        ];

        $categories = T_categories::all()->map(function ($item) {
            return [
                "value" => $item->id,
                "label" => $item->nom,
            ];
        });
        
        $result["items"] = $categories;

        return response()->json($result);
    }
}
