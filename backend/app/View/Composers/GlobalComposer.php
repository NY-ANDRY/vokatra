<?php

namespace App\View\Composers;

use Illuminate\View\View;

class GlobalComposer
{
    public function compose(View $view)
    {
        $navigationLinks = [
            ['url' => '/', 'text' => 'Accueil'],
            ['url' => '/products', 'text' => 'Produits'],
            ['url' => '/services', 'text' => 'Services'],
            ['url' => '/contact', 'text' => 'Contactez-nous'],
        ];

        $currentYear = date('Y');

        $view->with('navigationLinks', $navigationLinks)
             ->with('currentYear', $currentYear);
    }
}