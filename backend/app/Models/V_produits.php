<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class V_produits extends Model
{
    protected $table = 'v_produits';

    // public static function filterByKeywords($keywords)
    // {

    //     return self::where('nom', 'like', "%{$keywords}%")
    //         ->orWhere('description', 'like', "%{$keywords}%")
    //         ->orWhere('prix', 'like', "%{$keywords}%")
    //         ->orWhere('categorie', 'like', "%{$keywords}%")
    //         ->orWhere('stock', 'like', "%{$keywords}%")
    //         ->orderBy('id')
    //         ->get();

    // }

    public static function filterByKeywords($keywords)
    {
        if (empty($keywords)) {
            return self::orderBy('id')->get();
        }

        $keywords = strtolower($keywords);

        return self::where(function ($query) use ($keywords) {
            $query->whereRaw('LOWER(nom) LIKE ?', ["%{$keywords}%"])
                ->orWhereRaw('LOWER(description) LIKE ?', ["%{$keywords}%"])
                ->orWhere('prix', 'like', "%{$keywords}%")
                ->orWhereRaw('LOWER(categorie) LIKE ?', ["%{$keywords}%"])
                ->orWhere('stock', 'like', "%{$keywords}%");
        })
            ->orderBy('id')
            ->get();
    }
}
