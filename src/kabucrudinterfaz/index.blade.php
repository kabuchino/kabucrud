<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>KabuCrud - A laravel CRUD component</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link href="{{ asset('css/exampleKabuCRUD.css') }}" rel="stylesheet">
</head>
<body>

	<header  class="navbar navbar-expand-lg navbar-dark bg-dark top-navbar mb-5 menu">
		<!-- <h1>Menú de mi aplicación</h1> -->
		<h1>Menu of the application</h1>
	</header>

	<main class="container-fluid">
		<div class="container">
			<a href="{{route('gestion_localidades')}}" class="btn btn-dark btn-lg btn-block">
				Gestion de localidades
			</a>
			<a href="{{route('gestion_users')}}" class="btn btn-dark btn-lg btn-block">
				Gestion de usuarios
			</a>
		</div>
	</main>
	
	<footer class="container fixed-bottom">
		<div class="row justify-content-center align-items-center">
		Copyright ©Libin Ye
		</div>
	</footer>
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html>