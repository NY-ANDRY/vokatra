@foreach ($clients as $client)

    <div class="client"s>
        <h2>{{ $client->name }}</h2>
        <p>Email: {{ $client->email }}</p>
    </div>
    
@endforeach

{{ $sessions }}