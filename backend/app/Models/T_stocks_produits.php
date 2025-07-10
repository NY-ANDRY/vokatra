<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class T_stocks_produits extends Model
{
    protected $table = 't_stocks_produits';
    public $timestamps = false;

    protected $fillable = [
        'produit_id',
        'quantite',
        'date_maj',
        'mouvement_id',
    ];

    public static function registerFacture($facture_id)
    {
        $result = true;

        $facture = V_factures::find($facture_id);
        $commades_produits = V_commandes_produits::where("commande_id", "=", $facture->commande_id)->get();

        foreach ($commades_produits as $key => $commades_produit) {
            $new_ligne = new T_stocks_produits();
            $new_ligne->produit_id = $commades_produit->produit_id;
            $new_ligne->quantite -= $commades_produit->quantite;
            $new_ligne->mouvement_id = 2;
            $new_ligne->date_maj = now();

            $new_ligne->save();
        }

        $commades_packs = V_commandes_packs::where("commande_id", "=", $facture->commande_id)->get();

        foreach ($commades_packs as $commande_pack) {
            $pack_id = $commande_pack->pack_id;
            $qtt_pack_commandee = $commande_pack->quantite;

            // Récupère les produits contenus dans ce pack
            $produits_pack = T_pack_produits::where("pack_id", $pack_id)->get();

            foreach ($produits_pack as $produit_pack) {
                $new_ligne = new T_stocks_produits();
                $new_ligne->produit_id = $produit_pack->produit_id;
                $new_ligne->quantite = - ($produit_pack->quantite * $qtt_pack_commandee); // retrait total selon qtt
                $new_ligne->mouvement_id = 2; // vente
                $new_ligne->date_maj = now();

                $new_ligne->save();
            }
        }

        return $result;
    }

    public static function register_stock($id_packs, $qtt) {}
}
