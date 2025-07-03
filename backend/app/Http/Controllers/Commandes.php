<?php

namespace App\Http\Controllers;

use App\Models\T_commandes;
use App\Models\V_commandes;
use App\Models\V_commandes_produits;
use Illuminate\Http\Request;

class Commandes extends Controller
{
    function store()
    {
        $result = [
            'ok' => true,
            'commande' => null
        ];

        $user_id = request()->session()->get("user");
        $panier_id = request()->session()->get("panier");
        if (empty($panier_id)) {
            $result = [
                'ok' => false,
                'message' => 'panier vide'
            ];
            return response()->json($result);
        }

        $new_commande = T_commandes::fromPanier($panier_id, $user_id);
        $result["commande"] = $new_commande;

        request()->session()->put("commande", $new_commande->id);

        request()->session()->remove("panier");

        return response()->json($result);
    }

    function get($id)
    {
        $result = [
            "commande" => null,
            "items" => [],
            "message" => "hehe",
            "total" => 0
        ];

        $commande = V_commandes::find($id);
        $items = V_commandes_produits::where("commande_id", "=", $id)->get();
        $total = V_commandes::where("id", "=", $id)->first()->total;

        $result["commande"] = $commande;
        $result["items"] = $items;
        $result["total"] = $total;

        return response()->json($result);
    }

    function all() {
        $result = [
            'ok' => true,
            'items' => null
        ];
        
        $id =request()->session()->get("commande");
        $items = V_commandes::where("id", "=", $id)->get();

        $result["items"] = $items;

        return response()->json($result);
    }
    
}
