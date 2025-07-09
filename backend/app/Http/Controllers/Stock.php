<?php

namespace App\Http\Controllers;

use App\Models\T_stocks_produits;
use App\Models\V_produit_quotidienne;
use App\Models\V_produits;
use Illuminate\Http\Request;

class Stock extends Controller
{
    function store() {
        $result = [];
        $produit_id = request()->input("produit_id");
        $date_stock = request()->input("date_stock");
        $value_stock = request()->input("value_stock");
        $result["date"] = $date_stock;

        $sp = new T_stocks_produits();
        $sp->produit_id = $produit_id;
        $sp->quantite = $value_stock;
        $sp->date_maj = $date_stock;
        $sp->mouvement_id = 1;
        $sp->save();

        $result["stock_histo"] = V_produit_quotidienne::getHisto($produit_id);
        $result["item"] = V_produits::find($produit_id);

        return response()->json($result);
    }

}
