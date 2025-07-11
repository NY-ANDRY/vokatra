<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class T_commandes extends Model
{
    protected $table = 't_commandes';
    public $timestamps = false;

    public static function fromPanier($panier_id, $user_id)
    {
        $result = new T_commandes();
        $result->utilisateur_id =  $user_id;
        $result->statut_id = 1;
        $result->save();

        $items = V_paniers_produits::where("panier_id", "=", $panier_id)->get();

        foreach ($items as $key => $item) {
            $commande_prd = new T_commandes_produits();
            $commande_prd->commande_id = $result->id;
            $commande_prd->produit_id = $item->produit_id;
            $commande_prd->quantite = $item->quantite;

            $commande_prd->save();
        }

        $items_packs = V_paniers_packs::where("panier_id", "=", $panier_id)->get();

        foreach ($items_packs as $key => $item) {
            $commande_pack = new T_commandes_packs();
            $commande_pack->commande_id = $result->id;
            $commande_pack->pack_id = $item->pack_id;
            $commande_pack->quantite = $item->quantite;

            $commande_pack->save();
        }


        $panier = T_paniers::find($panier_id);
        $panier->delete();

        return $result;
    }
}
