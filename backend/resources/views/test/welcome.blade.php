@extends('layouts.app') {{-- Extends the master layout --}}

@section('title', 'Welcome to My App') {{-- Provides content for the 'title' section --}}

@section('content') {{-- Provides content for the 'content' section --}}
    <h1>Hello, World!</h1>
    <p>This is the content of my welcome page.</p>
@endsection

@push('styles') {{-- Pushes a page-specific style --}}
    <style>
        h1 { color: blue; }
    </style>
@endpush

@push('scripts') {{-- Pushes a page-specific script --}}
    <script>
        console.log('Welcome page script loaded!');
    </script>
@endpush