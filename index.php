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
		<a href="#" class="select-custom__btn">
			<svg width="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="#333" xmlns="http://www.w3.org/2000/svg">
				 <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
			</svg>
		</a>

		<div class="select-custom__option">
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
		<input type="text" name="kabupaten" placeholder="Pilih Kabupaten atau Kota ..." autocomplete="off">
		<a href="#" class="select-custom__btn">
			<svg width="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="#333" xmlns="http://www.w3.org/2000/svg">
				 <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
			</svg>
		</a>
	</div><!-- select-custom -->

	<div class="btn-loading">
		<a href="#" class="btn-show">Lihat Prakiraan Cuaca Hari Ini</a>
		<div class="loading"></div>
	</div><!-- btn-loading -->
</header>
<main>
	<div class="card">
		<div class="card__primary">
			<div class="card__header">
				<h3>Provinsi Bengkulu</h3>
				<select name="dateTime" autocomplete="off">
					<option>Selasa 15.00</option>
					<option>Rabu 15.00</option>
				</select>
				<p>Hujan Lebat</p>
			</div>
			<div class="card__status">
				<div class="card__icon">
					<svg viewBox="0 0 105.83333 66.145886" width="130" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -230.85407)"><g fill="#ffe168"><circle cx="60.326859" cy="264.01913" r="22.1845"/><rect height="8.572632" ry="1.061295" width="2.12259" x="60.530659" y="288.12875"/><rect height="8.572632" ry="1.061295" transform="matrix(.25881905 -.96592583 .96592583 .25881905 0 0)" width="2.12259" x="-240.46742" y="150.82103"/><rect height="8.572632" ry="1.061295" transform="matrix(-.25881905 -.96592583 .96592583 -.25881905 0 0)" width="2.12259" x="-269.57397" y="14.131183"/><rect height="8.572632" ry="1.061295" transform="matrix(-.70710678 -.70710678 .70710678 -.70710678 0 0)" width="2.12259" x="-226.4951" y="-119.96866"/><rect height="8.572632" ry="1.061295" transform="scale(-1)" width="2.12259" x="-61.353546" y="-239.7252"/><rect height="8.572632" ry="1.061295" transform="matrix(-.70710678 .70710678 -.70710678 -.70710678 0 0)" width="2.12259" x="141.21764" y="-204.98071"/></g><path d="m24.969913 249.66442a6.5349535 6.5349535 0 0 0 -6.535184 6.53491 6.5349535 6.5349535 0 0 0 .01389.3903 6.5349535 6.5349535 0 0 0 -3.857831 5.95255 6.5349535 6.5349535 0 0 0 .28945 1.9221h32.890656a4.9973173 4.9973173 0 0 0 1.224495-3.26745 4.9973173 4.9973173 0 0 0 -4.997225-4.9975 4.9973173 4.9973173 0 0 0 -1.963729.40791 8.1686919 8.1686919 0 0 0 -7.742603-5.59721 8.1686919 8.1686919 0 0 0 -4.179292 1.16047 6.5349535 6.5349535 0 0 0 -5.142617-2.50608z" fill="#e2e2e2" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5875"/><rect fill="#ffe168" height="8.572632" ry="1.061295" transform="matrix(.70710678 .70710678 -.70710678 .70710678 0 0)" width="2.12259" x="233.6916" y="167.62506"/><rect fill="#ffe168" height="8.572632" ry="1.061295" transform="matrix(.5 .8660254 -.8660254 .5 0 0)" width="2.12259" x="253.96329" y="103.45128"/><path d="m70.389644 272.61499a4.9952389 4.9952389 0 0 0 -4.995416 4.9952 4.9952389 4.9952389 0 0 0 .01062.29834 4.9952389 4.9952389 0 0 0 -2.94888 4.55006 4.9952389 4.9952389 0 0 0 .221252 1.46923h25.14122a3.8198886 3.8198886 0 0 0 .935992-2.4976 3.8198886 3.8198886 0 0 0 -3.819819-3.82003 3.8198886 3.8198886 0 0 0 -1.501055.3118 6.2440488 6.2440488 0 0 0 -5.918349-4.27844 6.2440488 6.2440488 0 0 0 -3.1946.88705 4.9952389 4.9952389 0 0 0 -3.930954-1.91561z" fill="#e2e2e2" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.27134"/></g></svg>
				</div>
				<div class="card__suhu">
					<h1>32</h1><h5>°C</h5><h5>|</h5><h5>°F</h5>
				</div>
			</div><!-- card__status -->
		</div>
		<div class="card__secondary">
			<table>
				<tr>
					<th>Kelembapan Udara</th>
					<td>10%</td>
				</tr>
				<tr>
					<th>Kecepatan Angin</th>
					<td>20%</td>
				</tr>
				<tr>
					<th>Arah Angin</th>
					<td>Nourt World</td>
				</tr>
			</table>
		</div>
	</div><!-- card -->
</main>
<footer>
	<p>Sumber: BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)</p>
	<p>Created by Reza Sariful Fikri 2020</p>
</footer>

<script type="text/javascript" src="dist/js/cuaca.min.js"></script>
</body>
</html>