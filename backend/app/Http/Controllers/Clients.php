<?php

namespace App\Http\Controllers;

use App\Models\Clients as ModelsClients;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;

class Clients extends Controller
{
    public function all()
    {
        // return response()->json(ModelsClients::all());
        return response()->view('clients.index', [
            'clients' => ModelsClients::all(),
            'sessions' => Session::id()
        ]);
    }
}
