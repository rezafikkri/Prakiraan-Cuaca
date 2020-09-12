<?php

$provinsi = filter_input(INPUT_GET, 'provinsi', FILTER_SANITIZE_STRING);

if($provinsi) {
	// inisialisasi curl
	$ch = curl_init();

	// menambahkan url
	curl_setopt($ch, CURLOPT_URL, "https://data.bmkg.go.id/datamkg/MEWS/DigitalForecast/DigitalForecast-".$provinsi.".xml");

	// membuat hasil output menjadi string
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

	// execute curl
	$output = curl_exec($ch);

	// close curl
	curl_close($ch);

	echo $output;

} else {
	echo json_encode(['success'=>'no']);
}