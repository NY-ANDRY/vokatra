<?php

namespace App\Http\Controllers;

use App\Models\V_produit_quotidienne;
use App\Models\V_produits;
use Illuminate\Http\Request;

class Produits extends Controller
{
    function index() {
        $result = [
            "items" => []
        ];
        $result["items"] = V_produits::all();

        $keywords = request()->query("keywords");
        $categorie_id = request()->query("categorie_id");

        if (!empty($keywords)) {
            $result["items"] = V_produits::filterByKeywords($keywords);
        }
        if (!empty($categorie_id)) {
            $result["items"] = V_produits::where("categorie_id", "=", $categorie_id)->get();
        }

        return response()->json($result);
    }

    function one($id){

        $result = [
            "items" => [],
            "stock_histo" => []
        ];
        $result["item"] = V_produits::find($id);
        $result["stock_histo"] = V_produit_quotidienne::getHisto($id);

        return $result;
    }

}
