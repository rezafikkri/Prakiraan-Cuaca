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

	if(inputProvinsi.value) {
		fetch(`https://data.bmkg.go.id/datamkg/MEWS/DigitalForecast/DigitalForecast-${inputProvinsi.value.replace(/\s/g,'')}.xml`)
		.then((response) => {
			console.log(response);
		})
	}
});