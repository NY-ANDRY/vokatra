<?php

namespace App\Http\Controllers;

use App\Models\T_produit_saison;
use App\Models\V_produit_quotidienne;
use App\Models\V_produits;
use Illuminate\Http\Request;

class Produits extends Controller
{
    function index()
    {
        $result = [
            "items" => []
        ];
        $result["items"] = V_produits::all();

        $keywords = request()->query("keywords");
        $categorie_id = request()->query("categorie_id");
        $saisons_id = request()->query("saisons_id");
        $min = request()->query("min");
        $max = request()->query("max");

        if (!empty($keywords)) {
            $result["items"] = V_produits::filterByKeywords($keywords);
        }
        if (!empty($categorie_id)) {
            $result["items"] = V_produits::where("categorie_id", "=", $categorie_id)->get();
        }
        if (!empty($saisons_id)) {
            $saisons_id_array = explode('-', $saisons_id);
            $produits_ids = T_produit_saison::whereIn('saison_id', $saisons_id_array)
                ->pluck('produit_id')
                ->unique()
                ->toArray();
            $result["items"] = V_produits::whereIn('id', $produits_ids)->get();
        }
        if (!empty($min) && !empty($max)) {
            $min = doubleval($min);
            $max = doubleval($max);
            $result["items"] = V_produits::whereBetween("prix", [$min, $max])->get();
        }


        return response()->json($result);
    }

    function show($id)
    {

        $result = [
            "items" => [],
            "stock_histo" => []
        ];
        $result["item"] = V_produits::find($id);
        $result["stock_histo"] = V_produit_quotidienne::getHisto($id);

        return response()->json($result);
    }

    function store()
    {
        return response()->json([]);
    }
    function edit()
    {
        return response()->json([]);
    }
    function destroy()
    {
        return response()->json([]);
    }
}
