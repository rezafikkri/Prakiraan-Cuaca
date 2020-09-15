<!DOCTYPE html>
<html lang="en">
<head>
	<!-- Require meta tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<title>Prakiraan Cuaca</title>

    <!-- Serach Engine metas -->
    <meta name="author" content="@FikkriReza">
    <meta name="description" content="Curriculum Vitae Reza Sariful Fikri">

    <!-- Social Network metas -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@FikkriReza">
    <meta name="twitter:creator" content="@FikkriReza">

    <meta property="fb:app_id" content="801699283982913">
    <meta property="og:url" content="https://rezafikkri.github.io/Prakiraan-Cuaca">
    <meta property="og:title" content="Prakiraan Cuaca">
    <meta property="og:image" content="https://rezafikkri.github.io/dist/img/reza.jpg">
    <meta property="og:description" content="Prakiraan Cuaca seluruh provinsi di Indonesia">

    <!-- Normalize css -->
    <link rel="stylesheet" type="text/css" href="dist/css/normalize.min.css">
    <!-- Cuaca css -->
    <link rel="stylesheet" type="text/css" href="dist/css/cuaca.min.css">
    <!-- Reza favicon -->
    <link rel="icon" href="dist/img/favicon.ico">
</head>
<body>

<header>
	<div class="select-custom">
		<input type="text" name="provinsi" placeholder="Pilih Provinsi ..." autocomplete="off">
		<a href="#" class="select-custom__btn" id="btnProvinsi">
			<svg width="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="#333" xmlns="http://www.w3.org/2000/svg">
				 <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
			</svg>
		</a>

		<div class="select-custom__option" id="selectProvinsi">
			<ul>
				<li><a href="#" class="provinsi" data-provinsi="Aceh">Aceh</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Bali">Bali</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Bangka Belitung">Bangka Belitung</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Banten">Banten</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Bengkulu">Bengkulu</a></li>
				<li><a href="#" class="provinsi" data-provinsi="DI Yogyakarta">DI Yogyakarta</a></li>
				<li><a href="#" class="provinsi" data-provinsi="DKI Jakarta">DKI Jakarta</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Gorontalo">Gorontalo</a></li>

				<li><a href="#" class="provinsi" data-provinsi="Jambi">Jambi</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Jawa Barat">Jawa Barat</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Jawa Tengah">Jawa Tengah</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Jawa Timur">Jawa Timur</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Kalimantan Barat">Kalimantan Barat</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Kalimantan Selatan">Kalimantan Selatan</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Kalimantan Tengah">Kalimantan Tengah</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Kalimantan Timur">Kalimantan Timur</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Kalimantan Utara">Kalimantan Utara</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Kepulauan Riau">Kepulauan Riau</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Lampung">Lampung</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Maluku">Maluku</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Maluku Utara">Maluku Utara</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Nusa Tenggara Barat">Nusa Tenggara Barat</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Nusa Tenggara Timur">Nusa Tenggara Timur</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Papua">Papua</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Papua Barat">Papua Barat</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Riau">Riau</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Sulawesi Barat">Sulawesi Barat</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Sulawesi Selatan">Sulawesi Selatan</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Sulawesi Tengah">Sulawesi Tengah</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Sulawesi Tenggara">Sulawesi Tenggara</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Sulawesi Utara">Sulawesi Utara</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Sumatera Barat">Sumatera Barat</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Sumatera Selatan">Sumatera Selatan</a></li>
				<li><a href="#" class="provinsi" data-provinsi="Sumatera Utara">Sumatera Utara</a></li>
			</ul>
		</div>
	</div><!-- select-custom -->

	<div class="select-custom mt">
		<input type="text" name="kabupatenKota" placeholder="Pilih Kabupaten atau Kota ..." autocomplete="off">
		<a href="#" class="select-custom__btn" id="btnKabupatenKota">
			<svg width="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="#333" xmlns="http://www.w3.org/2000/svg">
				 <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
			</svg>
		</a>

		<div class="select-custom__option" id="selectKabupatenKota">
			<ul></ul>
		</div>
	</div><!-- select-custom -->

	<div class="btn-loading">
		<a href="#" class="btn-show">Lihat Prakiraan Cuaca Hari Ini</a>
		<div class="loading"></div>
	</div><!-- btn-loading -->
</header>
<main>
	<div class="card">
		<div class="card__initial-message card__initial-message--d-block">
			<p>Pilih Provinsi jika ingin melihat <strong>Prakiraan</strong> cuaca di suatu Provinsi. Pilih Provinsi dan Kabupaten atau Kota untuk melihat <strong>Prakiraan</strong> cuaca di Kabupaten atau Kota.</p>
		</div>
		<div class="card__primary card__primary--d-none">
			<div class="card__header">
				<h4></h4>
				<select name="dateTime" autocomplete="off"></select>
				<p></p>
			</div>
			<div class="card__status">
				<div class="card__icon"></div>
				<div class="card__suhu"></div>
			</div><!-- card__status -->
		</div>
		<div class="card__secondary card__secondary--d-none">
			<table></table>
		</div>
	</div><!-- card -->
</main>
<footer>
	<p>Sumber: BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)</p>
	<p>Created by Reza Sariful Fikri 2020</p>
</footer>

<div class="alert">
	<div class="alert__text">
		<p></p>
	</div>
	<div class="alert__action">
		<a href="#">&times;</a>
	</div>
</div>

<script type="text/javascript" src="dist/js/cuaca.min.js"></script>
</body>
</html>