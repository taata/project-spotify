var limitTopArtists = 10;
var topArtistsUrl = `https://api.spotify.com/v1/me/top/artists?limit=${limitTopArtists}`;
var boxData = document.getElementById('box-artists');
var boxPopularityHigh = document.getElementById('box-artists-popularity-high');

let orderArtists = [];
let artistsPopularityHigh = {};
let cont = 0;
let artistsPopularityHighOrder = {};

init();



function getTopArtists() {
    fetch(topArtistsUrl, {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer  BQC1qyxl1nArNb_9EqmUc34ShbtRFd1KABvKizL10AAFazd2xlIx-Y3EcXVXLfzn17o2KZjaw5fVrpKaQk14a6GEl3CulfuEK274BTFQpnfcYVQrqRf-lN-a54MJ4aP-kTXUJLOw1uVaLdl-vzxP_h4'
        })
    }).then(response => response.json())
        .then(result => {
            result.items.forEach(function (value) {
                cont++;

                orderArtists[cont] = value;

                if (cont <= 2) {
                    boxData.innerHTML += `<div class="col s12 m6">
                    <div class="card">
                            <div class="card-image">
                                <img src="${value.images[0].url}">
                                <span class="card-title">${value.name}</span>
                            </div>
                            <div class="card-content">
                                <p> Seguidores: <b>${value.followers.total}</b></p>
                                <p>Gênero: <b> ${value.genres.splice(0, 2)}</b></p>
                                <p> Popularidade: ${value.popularity}</p>
                            </div>
                            <div class="card-action">
                                <a href="${value.external_urls.spotify}" alt="Clique para ir no Spotify ${value.name}" target="_blank">Ir para o Spotify</a>
                            </div>
                        </div>
                    </div>`;
                }
                else {
                    boxData.innerHTML += `<div class="col s12 m3">
                    <div class="card w-fixed">
                            <div class="card-image">
                                <img src="${value.images[0].url}">
                                <span class="card-title">${value.name}</span>
                            </div>
                            <div class="card-content">
                                <p> Seguidores: <b>${value.followers.total}</b></p>
                                <p> Gênero: <b> ${value.genres.splice(0, 2)}</b></p>
                                <p> Popularidade: ${value.popularity}</p>
                            </div>
                            <div class="card-action">
                            <a href="${value.external_urls.spotify}" alt="Clique para ir no Spotify ${value.name}" target="_blank">Ir para o Spotify</a>
                            </div>
                        </div>
                    </div>`;
                }
                if (cont == 6)
                    boxData.innerHTML += `<div class="clearfix"></div>`;

            });
        })
        .catch(err => {
            // trata se alguma das promises falhar
            console.error('Failed retrieving information', err);
        })

}

function ordernation(order) {
    boxData.classList.add('d-none');

    artistsPopularityHigh = orderArtists.filter((value) => {
        return value.popularity > 50;
    });


    normalize(artistsPopularityHigh, artistsPopularityHighOrder);

    if (order == 'order-popularity') {
        artistsPopularityHighOrder = Object.assign([], artistsPopularityHighOrder).reverse();

        artistsPopularityHighOrder.forEach(valueOrdernation => {
            if (valueOrdernation != undefined) {
                boxPopularityHigh.innerHTML += `<div class="col s12 m6">
                    <div class="card">
                        <div class="card-image">
                            <img src="${valueOrdernation.images[0].url}">
                            <span class="card-title" > ${ valueOrdernation.name}</span>
                        </div>
                        <div class="card-content">
                            <p> Seguidores: <b>${valueOrdernation.followers.total}</b></p>
                            <p>Gênero: <b> ${valueOrdernation.genres.splice(0, 2)}</b></p>
                            <p> Popularidade: ${valueOrdernation.popularity}</p>
                        </div>
                    </div> `;

                boxPopularityHigh.classList.remove('d-none');
            }
        });
    }
}

function normalize(valueArray, artistsPopularityHighOrder) {
    return valueArray.reduce((acc, curr) => {

        //acc.ids.sort((a, b) => b - a);
        acc.ids.push(curr.popularity);
        acc.all[curr.popularity] = curr;
        acc.all = artistsPopularityHighOrder;
        console.log('acc: ', acc);

        return { ...acc };

    }, { all: {}, ids: [] }
    );
}

function init() {
    getTopArtists();
}