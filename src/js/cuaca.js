import { XmlToJson } from './XmlToJson.es6.js';
import { kabupatenKota } from './kabupaten.js';
import { weatherIcon } from './weatherIcon.js';

const selectProvinsi = document.querySelector("#selectProvinsi");
const selectKabupatenKota = document.querySelector("#selectKabupatenKota");
const inputProvinsi = document.querySelector('input[name="provinsi"]');
const inputKabupatenKota = document.querySelector('input[name="kabupatenKota"]');
const cardStatusSuhu = document.querySelector('.card__status .card__suhu');
const cardHeaderSelect = document.querySelector('.card__header select');
const cardHeaderp = document.querySelector('.card__header p');
const cardStatusIcon = document.querySelector('.card__status .card__icon');
const cardSecondary = document.querySelector('.card__secondary table');

/** select custom **/
document.querySelector('#btnProvinsi').addEventListener('click', (e) => {
	e.preventDefault();
	selectProvinsi.classList.toggle('select-custom__option--d-block');
});

document.querySelector('#btnKabupatenKota').addEventListener('click', (e) => {
	e.preventDefault();
	selectKabupatenKota.classList.toggle('select-custom__option--d-block');
})

function selectCustom(e, classContains, input, datasetName, selectCustom) {
	const target = e.target;
	if(target.classList.contains(classContains)) {
		e.preventDefault();

		if(classContains === 'kabupatenKota' && /\[description:/.test(target.dataset[datasetName])) {
			input.value = target.dataset[datasetName].split('[description:')[0].replace(/\s$/,'');
			input.dataset.originValue = target.dataset[datasetName];

		} else if(classContains === 'kabupatenKota') {
			input.value = target.dataset[datasetName];
			input.dataset.originValue = target.dataset[datasetName];
		} else {
			input.value = target.dataset[datasetName];
		}

		selectCustom.classList.remove('select-custom__option--d-block');
	}
	return true;
}

function buatListKabupatenKota(inputProvinsi, inputKabupatenKota, kabupatenKota) {
	// jika yang dipilih berbedah dari sebelumnya
	if(inputProvinsi.hasOwnProperty('oldValue') && inputProvinsi.oldValue !== inputProvinsi.value) {
		// reset inputKabupatenKota
		inputKabupatenKota.value = '';
		delete inputKabupatenKota.dataset.originValue;
	}

	// jika yang dipilih berbedah dari sebelumnya atau jika provinsi belum pernah dipilih sebelumnya
	if((inputProvinsi.hasOwnProperty('oldValue') && inputProvinsi.oldValue !== inputProvinsi.value) || !inputProvinsi.hasOwnProperty('oldValue')) {

		// change oldValue atau set value oldValue
		inputProvinsi.oldValue = inputProvinsi.value;

		// buat dan append list kabupaten atau kota
		const provinsi = inputProvinsi.value;
		let hasil = '<li><a href="#" class="kabupatenKota" data-kabupaten-kota=""></a></li>';
		for(const kb of kabupatenKota[provinsi.replace(/\s/g, '')]) {
			// jika ada keterangan description
			if(/^[\w\.\s]+\[description:[\s\w+]+\]$/i.test(kb)) {
				hasil += `<li><a href="#" class="kabupatenKota" data-kabupaten-kota="${kb}">${kb.split('[description: ')[0].replace(/\s$/,'')}</a></li>`;
			} else {
				// selain dari itu
				hasil += `<li><a href="#" class="kabupatenKota" data-kabupaten-kota="${kb}">${kb}</a></li>`;
			}
		}
		document.querySelector('#selectKabupatenKota ul').innerHTML = hasil;
	}
	return true;
}

selectProvinsi.addEventListener('click', (e) => {
	if(selectCustom(e, 'provinsi', inputProvinsi, 'provinsi', selectProvinsi)) buatListKabupatenKota(inputProvinsi, inputKabupatenKota, kabupatenKota);
});

selectKabupatenKota.addEventListener('click', (e) => {
	selectCustom(e, 'kabupatenKota', inputKabupatenKota, 'kabupatenKota', selectKabupatenKota);
});


/** clear localStorage ketika halaman di reload **/
localStorage.clear();

/** get data cuaca **/
function inArray(niddle, haystack) {
	// menghasilkan true atau false
	for(const h of haystack) {
		if(h === niddle) return true;
	}
	return false;
}

function generateDayIndo(day) {
	switch(day) {
		case 0: return "Ahad";
		case 1: return "Senin";
		case 2: return "Selasa";
		case 3: return "Rabu";
		case 4: return "Kamis";
		case 5: return "Jum'at";
		case 6: return "Sabtu";
	}
}

function generateAttrSelectedOption(day, hours, nextHours) {
	const objDate = new Date(Date.now());
	// generate nextHours	
	if(nextHours !== '00') nextHours = nextHours.datetime.toString().substr(8,2);
	if(nextHours === '00') nextHours = 24;

	// jika day dari timerange sama dengan day sekarang dan jam dari timerange lebih kecil sama dengan jam sekarang dan jam selanjutnya dari timerange lebih besar dari jam sekarang, maka selected;
	// maksudnya adalah 'selected' jika jam dari timerange lebih kecil sama dengan jam sekarang dan paling dekat dengan jam sekarang, ini untuk menghindari jika jam sekarang jam 20 maka seharusnya yang 'selected' adalah timerange dengan jam 18, bukan malah timerange dengan jam 00;
	if(day == objDate.getDate() && hours <= objDate.getHours() && nextHours > objDate.getHours()) return 'selected';
	return '';
}

function generateDateTimeOption(timeRange) {
	// menghasilkan option untuk select input
	let hasil = '';
	let i = 0;
	for(const t of timeRange) {
		const objDate = new Date(t.datetime.toString().substr(0,4), t.datetime.toString().substr(4,2)-1, t.datetime.toString().substr(6,2), t.datetime.toString().substr(8,2));
		hasil += `<option value="${t.datetime}" ${generateAttrSelectedOption(t.datetime.toString().substr(6,2), t.datetime.toString().substr(8,2), timeRange[i+1]??'00')}>${generateDayIndo(objDate.getDay())} ${t.datetime.toString().substr(8,2)}.00</option>`;
		i++;
	}
	return hasil;
}

function generateWeatherPrimaryInfo(timeRangeKodeCuaca, timeRangeTemperature, cardHeaderSelect, weatherIcon) {
	// menghasilkan svg icon, text cuaca, suhu
	const dateTimeSelect = cardHeaderSelect.value;
	let kodeCuaca;
	let iconCuaca = '';
	let textCuaca = '';
	let suhu = '';

	for(const w of timeRangeKodeCuaca) {
		if(parseInt(dateTimeSelect) === w.datetime)  {
			kodeCuaca = w.value.text;
			break;
		}
	}
	for(const i of weatherIcon) {
		if(inArray(kodeCuaca, i.kodeCuaca)) { 
			iconCuaca = i.iconCuaca; 
			textCuaca = i.textCuaca; 
			break;
		}
	}
	for(const t of timeRangeTemperature) {
		if(parseInt(dateTimeSelect) === t.datetime) {
			suhu = `<h1>${t.value[0].text.toString().replace('.',',')}</h1><h5><a href="#" data-suhu="${t.value[0].text.toString().replace('.',',')}" class="card__suhuCelsius card__suhuCelsius--active">°C</a></h5><h5>|</h5><h5><a href="#" data-suhu="${t.value[1].text.toString().replace('.',',')}" class="card__suhuFahrenheit">°F</a></h5>`;
			break;
		} 
	}
	return {iconCuaca:iconCuaca, textCuaca:textCuaca, suhu:suhu};
}

function generateArahAngin(kodeArahAngin) {
	switch(kodeArahAngin) {
		case "N": return 'dari arah Utara';
		case "NNE": return 'dari arah Utara - Timur Laut';
		case "NE": return 'dari arah Timur Laut';
		case "ENE": return 'dari arah Timur - Timur Laut';
		case "E": return 'dari arah Timur';
		case "ESE": return 'dari arah Timur - Tenggara';
		case "SE": return 'dari arah Tenggara';
		case "SSE": return 'dari arah Selatan Menenggara';
		case "S": return 'dari arah Selatan';
		case "SSW": return 'dari arah Selatan - Barat Daya';
		case "SW": return 'dari arah Barat Daya';
		case "WSW": return 'dari arah Barat - Barat Daya';
		case "W": return 'dari arah Barat';
		case "WNW": return 'dari arah Barat - Barat Laut';
		case "NW": return 'dari arah Barat Laut';
		case "NNW": return 'dari arah Utara - Barat Laut';
		case "VARIABLE": return 'Berubah - Ubah';
	}
}

function generateWeatherScondaryInfo(timeRangeHumidity, timeRangeWindSpeed, timeRangeWindDirection, cardHeaderSelect) {
	// menghasilkan row table
	const dateTimeSelect = cardHeaderSelect.value;
	let hasil = '';
	for(const hu of timeRangeHumidity) {
		if(parseInt(dateTimeSelect) === hu.datetime) {
			hasil += `<tr><th>Kelembapan Udara</th><td>${hu.value.text+hu.value.unit}</td></tr>`;
			break;
		}
	}
	for(const ws of timeRangeWindSpeed) {
		if(parseInt(dateTimeSelect) === ws.datetime) {
			hasil += `<tr><th>Kecepatan Angin</th><td id="ws" data-kph="${ws.value[2].text.toFixed(2).replace('.',',')} ${ws.value[2].unit}" data-mph="${ws.value[1].text.toFixed(2).replace('.',',')} ${ws.value[1].unit}">${ws.value[2].text.toFixed(2).replace('.',',')} ${ws.value[2].unit}</td></tr>`;
			break;
		}
	}
	for(const wd of timeRangeWindDirection) {
		if(parseInt(dateTimeSelect) === wd.datetime) {
			hasil += `<tr>
					<th>Arah Angin</th>
					<td width="240">${generateArahAngin(wd.value[1].text)}</td>
				</tr>`;
			break;
		}
	}
	return hasil;
}

function showCardPrimaryCardSecondary(cardInitialMessage) {
	cardInitialMessage.classList.remove('card__initial-message--d-block');
	document.querySelector('.card__primary').classList.remove('card__primary--d-none');
	document.querySelector('.card__secondary').classList.remove('card__secondary--d-none');
}

function getCuaca(paramGetApi, loading, paramGetDataCuacaJson) {
	// loading
	loading.classList.add("loading--d-flex");

	fetch('get-api.php?provinsi='+paramGetApi.replace(/\s/g,''))
	.finally(() => {
		// loading selesai
		loading.classList.remove("loading--d-flex");
	})
	.then(response => {
		if(!response.ok) {
			throw new Error("Cek koneksi internet kamu!");
		}
		return response.text();
	})
	.then(response => {
		const json = new XmlToJson(response);
		if(json.data === undefined) throw new Error("Cek koneksi internet kamu!");
		console.log(json);

		const cardHeaderh3 = document.querySelector('.card__header h4');

		// karena function getCuaca() itu general, bisa digunakan untuk mengambil data cuaca kabupaten berdasarkan parameter provinsi atau data cuaca provinsi berdasarkan parameter Indonesia, maka kita perlu cek apakah function getCuaca() digunakan untuk mengambil data cuaca kabupaten atau provinsi.
		if(paramGetApi !== 'Indonesia') {
			// cek paramGetDataCuacaJson, jika terdapat parameter description
			if(/\[description:/.test(paramGetDataCuacaJson)) {

				/// maka cari data cuaca yang cocok di object json berdasarkan parameter description
				for(const r of json.data.forecast.area) {

					//// jika description json = paramGetDataCuacaJson
					if(r.description === paramGetDataCuacaJson.split('[description:')[1].replace(/[\s\]]/g,'')) {
						///// tampilkan ke layar
						cardHeaderh3.innerHTML = `${paramGetDataCuacaJson.split('[description:')[0].replace(/\s$/,'')}<br>Provinsi ${paramGetApi}`;
						cardHeaderSelect.innerHTML = generateDateTimeOption(r.parameter[0].timerange);

						const weatherPrimaryInfo = generateWeatherPrimaryInfo(r.parameter[6].timerange, r.parameter[5].timerange, cardHeaderSelect, weatherIcon);
						cardHeaderp.innerHTML = weatherPrimaryInfo.textCuaca;
						cardStatusIcon.innerHTML = weatherPrimaryInfo.iconCuaca;
						cardStatusSuhu.innerHTML = weatherPrimaryInfo.suhu;

						const weatherScondaryInfo = generateWeatherScondaryInfo(r.parameter[0].timerange, r.parameter[8].timerange, r.parameter[7].timerange, cardHeaderSelect);
						cardSecondary.innerHTML = weatherScondaryInfo;

						///// karena default ketika halaman pertama kali diload card primary dan card secondary di hide, maka kita perlu show keduanya
						const cardInitialMessage = document.querySelector('.card__initial-message');
						if(cardInitialMessage.classList.contains('card__initial-message--d-block')) showCardPrimaryCardSecondary(cardInitialMessage);

						///// simpan isi attribute parameter di localStorage
						localStorage.setItem('parameterCuaca', JSON.stringify(r.parameter));

						return true;
					}
				}

			} 

			// selain dari itu
			else {
				//// maka cari data yang cocok di object json berdasarkan parameter name[1].text
				for(const r of json.data.forecast.area) {
					///// jika name[1].text json = paramGetDataCuacaJson
					if(r.name[1].text === paramGetDataCuacaJson) {
						//// tampilkan ke layar
						cardHeaderh3.innerHTML = `${paramGetDataCuacaJson}<br>Provinsi ${paramGetApi}`;
						cardHeaderSelect.innerHTML = generateDateTimeOption(r.parameter[0].timerange);
						const weatherPrimaryInfo = generateWeatherPrimaryInfo(r.parameter[6].timerange, r.parameter[5].timerange, cardHeaderSelect, weatherIcon);
						cardHeaderp.innerHTML = weatherPrimaryInfo.textCuaca;
						cardStatusIcon.innerHTML = weatherPrimaryInfo.iconCuaca;
						cardStatusSuhu.innerHTML = weatherPrimaryInfo.suhu;

						const weatherScondaryInfo = generateWeatherScondaryInfo(r.parameter[0].timerange, r.parameter[8].timerange, r.parameter[7].timerange, cardHeaderSelect);
						cardSecondary.innerHTML = weatherScondaryInfo;

						///// karena default ketika halaman pertama kali diload card primary dan card secondary di hide, maka kita perlu show keduanya
						const cardInitialMessage = document.querySelector('.card__initial-message');
						if(cardInitialMessage.classList.contains('card__initial-message--d-block')) showCardPrimaryCardSecondary(cardInitialMessage);

						///// simpan isi attribute parameter di localStorage
						localStorage.setItem('parameterCuaca', JSON.stringify(r.parameter));

						return true;
					}
				}
			}

		} else {
			// maka cari data cuaca yang cocok di object json berdasarkan parameter domain
			for(const r of json.data.forecast.area) {
				///jika domain json = paramGetDataCuacaJson
				if(r.domain === paramGetDataCuacaJson) {
					//// tampilkan ke layar
					cardHeaderh3.innerHTML = `Provinsi ${paramGetDataCuacaJson}`;
					cardHeaderSelect.innerHTML = generateDateTimeOption(r.parameter[0].timerange);
					const weatherPrimaryInfo = generateWeatherPrimaryInfo(r.parameter[6].timerange, r.parameter[5].timerange, cardHeaderSelect, weatherIcon);
					cardHeaderp.innerHTML = weatherPrimaryInfo.textCuaca;
					cardStatusIcon.innerHTML = weatherPrimaryInfo.iconCuaca;
					cardStatusSuhu.innerHTML = weatherPrimaryInfo.suhu;

					const weatherScondaryInfo = generateWeatherScondaryInfo(r.parameter[0].timerange, r.parameter[8].timerange, r.parameter[7].timerange, cardHeaderSelect);
					cardSecondary.innerHTML = weatherScondaryInfo;

					///// karena default ketika halaman pertama kali diload card primary dan card secondary di hide, maka kita perlu show keduanya
					const cardInitialMessage = document.querySelector('.card__initial-message');
					if(cardInitialMessage.classList.contains('card__initial-message--d-block')) showCardPrimaryCardSecondary(cardInitialMessage);

					///// simpan isi attribute parameter di localStorage
					localStorage.setItem('parameterCuaca', JSON.stringify(r.parameter));

					return true;
				}
			}
		}
	})
	.catch(error => {
		document.querySelector('.alert').classList.add('alert--d-flex');
		document.querySelector('.alert p').innerHTML = error;
	});

	return false;
}

const btnShow = document.querySelector('a.btn-show');
btnShow.addEventListener('click', (e) => {
	e.preventDefault();

	// jika provinsi dipilih
	if(inputProvinsi.value) {

		/// jika kabupaten dipilih
		if(inputKabupatenKota.value) {
			//// get data cuaca dengan parameter nama provinsi
			getCuaca(inputProvinsi.value, btnShow.nextElementSibling, inputKabupatenKota.dataset.originValue);
		}
		/// selain dari itu
		else {
			//// get data cuaca dengan parameter 'Indonesia'
			getCuaca('Indonesia', btnShow.nextElementSibling, inputProvinsi.value);
		}
	}
});

/** tampil data cuaca berdasarkan dataTime select **/
cardHeaderSelect.addEventListener('change', (e) => {
	const parameterCuaca = JSON.parse(localStorage.getItem('parameterCuaca'));
	// jika parameterCuaca ada di localStorage
	if(parameterCuaca !== null) {

		// maka tampilkan ke layar
		const weatherPrimaryInfo = generateWeatherPrimaryInfo(parameterCuaca[6].timerange, parameterCuaca[5].timerange, cardHeaderSelect, weatherIcon);
		cardHeaderp.innerHTML = weatherPrimaryInfo.textCuaca;
		cardStatusIcon.innerHTML = weatherPrimaryInfo.iconCuaca;
		cardStatusSuhu.innerHTML = weatherPrimaryInfo.suhu;

		const weatherScondaryInfo = generateWeatherScondaryInfo(parameterCuaca[0].timerange, parameterCuaca[8].timerange, parameterCuaca[7].timerange, cardHeaderSelect);
		cardSecondary.innerHTML = weatherScondaryInfo;
	}
});

/** alert **/
document.querySelector('.alert__action a').addEventListener('click', (e) => {
	e.preventDefault();
	e.target.parentElement.parentElement.classList.remove('alert--d-flex');
});

/** tampil suhu dalam Celsius atau Fahrenheit dan kecepatan angin dalam MPH atau KPH **/
cardStatusSuhu.addEventListener('click', (e) => {
	let target = e.target;
	if((target.classList.contains('card__suhuCelsius') || target.classList.contains('card__suhuFahrenheit')) && !target.classList.contains('card__suhuCelsius--active') && !target.classList.contains('card__suhuFahrenheit--active')) {
		e.preventDefault();

		const cardSuhuCelsius = cardStatusSuhu.querySelector('a.card__suhuCelsius');
		const cardSuhuFahrenheit = cardStatusSuhu.querySelector('a.card__suhuFahrenheit');
		const ws = document.querySelector('.card__secondary tr td#ws');

		if(cardSuhuCelsius.classList.contains('card__suhuCelsius--active')) {
			// remove class suhu active yang ada dan tambahkan pada target
			cardSuhuCelsius.classList.remove('card__suhuCelsius--active');
			target.classList.add('card__suhuFahrenheit--active');

			// tampil kecepatan angin dalam MPH jika suhu dalam Fahrenheit
			ws.innerHTML = ws.dataset.mph;

		} else if(cardSuhuFahrenheit.classList.contains('card__suhuFahrenheit--active')) {
			// remove class suhu active yang ada dan tambahkan pada target
			cardSuhuFahrenheit.classList.remove('card__suhuFahrenheit--active');
			target.classList.add('card__suhuCelsius--active');

			// tampil kecepatan angin dalam KPH jika suhu dalam Celsius
			ws.innerHTML = ws.dataset.kph;
		}

		// inner suhu ke h1
		cardStatusSuhu.querySelector('h1').innerHTML = target.dataset.suhu;
	}
});