<?php

namespace App\Http\Controllers;

use App\Models\T_commandes;
use App\Models\T_factures;
use App\Models\T_livraisons;
use App\Models\T_stocks_produits;
use App\Models\V_commandes;
use App\Models\V_commandes_packs;
use App\Models\V_commandes_produits;
use App\Models\V_factures;
use Illuminate\Http\Request;

class Factures extends Controller
{
    function store()
    {
        $result = [
            'ok' => true,
            'facture' => null
        ];

        $commande_id = request()->input("commande_id");
        $lieux_id = request()->input("lieux_id");
        $mode_paiement_id = request()->input("mode_paiement_id");
        $date_heure_livraison = request()->input("date_heure_livraison");
        $numero = request()->input("numero");
        $nom = request()->input("nom");
        $user = request()->session()->get("user");

        $total = V_commandes::where("id", "=", $commande_id)->first()->total;
        $facture = new T_factures();
        $facture->utilisateur_id = 1;
        $facture->commande_id = $commande_id;
        $facture->montant_total = $total;
        $facture->statut_id = 2;
        $facture->nom_client = $nom;
        if (!empty($user)) {
            // $facture->utilisateur_id = $user;
        }
        $facture->save();
        $livraison = new T_livraisons();
        $livraison->commande_id = $commande_id;
        $livraison->lieu_livraison_id = $lieux_id;
        $livraison->date_livraison = $date_heure_livraison;
        $livraison->save();


        T_stocks_produits::registerFacture($facture->id);

        $commande = T_commandes::find($commande_id);
        $commande->statut_id = 3;
        $commande->update();

        request()->session()->put("facture", $facture->id);

        $result["facture"] = $facture;

        return response()->json($result);
    }

    function get($id)
    {
        $result = [
            "facture" => null,
            "items" => [],
            "packs" => [],
            "message" => "hoho"
        ];

        $facture = V_factures::find($id);
        $items = V_commandes_produits::where("commande_id", "=", $facture->commande_id)->get();
        $packs = V_commandes_packs::where("commande_id", "=", $facture->commande_id)->get();

        $facture->montant_total = is_numeric($facture->montant_total) ? number_format($facture->montant_total, 2) : $facture->montant_total;
        $facture->total_commande = is_numeric($facture->total_commande) ? number_format($facture->total_commande, 2) : $facture->total_commande;
        $result["facture"] = $facture;
        $result["items"] = $items;
        $result["packs"] = $packs;

        return response()->json($result);
    }

    // function index() {
    //     $result = [
    //         'ok' => true,
    //         'items' => null
    //     ];
        
    //     $id =request()->session()->get("facture");
    //     $items = V_factures::where("id", "=", $id)->get();

    //     $result["items"] = $items;

    //     return response()->json($result);
    // }

    function index() {
        $result = [
            'ok' => true,
            'items' => null
        ];
        
        $id =request()->session()->get("facture");
        // $items = V_factures::all();
        $items = V_factures::where('utilisateur_id', 1)->get();

        $result["items"] = $items;

        return response()->json($result);
    }
    
}
