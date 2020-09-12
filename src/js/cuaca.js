import { XmlToJson } from './XmlToJson.es6.js';

const selectCustomOption = document.querySelector("div.select-custom__option");
const inputProvinsi = document.querySelector('input[name="provinsi"]');

// select custom
document.querySelector('a.select-custom__btn').addEventListener('click', (e) => {
	e.preventDefault();

	selectCustomOption.classList.toggle('select-custom__option--d-block');
});

selectCustomOption.addEventListener('click', (e) => {
	const target = e.target;
	if(target.classList.contains('provinsi')) {
		e.preventDefault();

		inputProvinsi.value = target.dataset.provinsi;

		selectCustomOption.classList.remove('select-custom__option--d-block');
	}
})

// get data cuaca
const btnShow = document.querySelector('a.btn-show');
btnShow.addEventListener('click', (e) => {
	e.preventDefault();

	// cek provinsi dipilih atau tidak
	if(inputProvinsi.value) {

		

		fetch('get-api.php?provinsi='+inputProvinsi.value.replace(/\s/g,''))
		.then(response => {
			return response.text();
		})
		.then(response => {
			const json = new XmlToJson(response);
			for(const p of json.data.forecast.area) {
				console.log(p.name[1].text);
			}
			console.log(json);
		})
	}
});