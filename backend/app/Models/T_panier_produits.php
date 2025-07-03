<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class T_panier_produits extends Model
{
    protected $table = 't_panier_produits';
    public $timestamps = false;

    public function getFor($panier_id)
    {
        $result = [];

        return [];
    }
}
