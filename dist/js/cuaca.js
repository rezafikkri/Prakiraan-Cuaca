/*!
 * CV Reza v2
 * Copyright (c) 2020 Reza Sariful Fikri
*/
define(function () { 'use strict';

	var selectCustomOption = document.querySelector("div.select-custom__option");
	var inputProvinsi = document.querySelector('input[name="provinsi"]'); // select custom

	document.querySelector('a.select-custom__btn').addEventListener('click', function (e) {
	  e.preventDefault();
	  selectCustomOption.classList.toggle('select-custom__option--d-block');
	});
	selectCustomOption.addEventListener('click', function (e) {
	  var target = e.target;

	  if (target.classList.contains('provinsi')) {
	    e.preventDefault();
	    inputProvinsi.value = target.dataset.provinsi;
	    selectCustomOption.classList.remove('select-custom__option--d-block');
	  }
	}); // get data cuaca

	var btnShow = document.querySelector('a.btn-show');
	btnShow.addEventListener('click', function (e) {
	  e.preventDefault();

	  if (inputProvinsi.value) {
	    fetch("https://data.bmkg.go.id/datamkg/MEWS/DigitalForecast/DigitalForecast-".concat(inputProvinsi.value.replace(/\s/g, ''), ".xml")).then(function (response) {
	      console.log(response);
	    });
	  }
	});

});
