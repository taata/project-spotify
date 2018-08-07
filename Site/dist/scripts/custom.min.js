var limitTopArtists = 10;
var topArtistsUrl = `https://api.spotify.com/v1/me/top/artists?limit=${limitTopArtists}`;
var boxData = document.getElementById('box-artists');
var boxPopularityHigh = document.getElementById('box-artists-popularity-high');

let orderArtists = [];
let artistsPopularityHigh = {};
let cont = 0;

init();



function getTopArtists() {
    fetch(topArtistsUrl, {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer BQDUHKuCCyt5jBauEFit58sornkEsEbxTbEUqQVwprC_HiNZVdv01LG3OR7rU2LWgziBQOOYeQqKHtOft637Hc__nPpvhp-hH-zZa_zUbo7iI9D5E7aEU2Z8wIadGwKBAhTq8S2VcK5-3f_Ez67ujeCWAlM'
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
    console.log('artistsPopularityHigh: ', artistsPopularityHigh);

    if (order == 'order-popularity') {
        for (var x = 0; x < artistsPopularityHigh.length; x++) {
            boxPopularityHigh.innerHTML += `<div class="col s12 m6">
             <div class="card">
                     <div class="card-image">
                         <img src="${artistsPopularityHigh[x].images[0].url}">
                         <span class="card-title">${artistsPopularityHigh[x].name}</span>
                     </div>
                     <div class="card-content">
                         <p> Seguidores: <b>${artistsPopularityHigh[x].followers.total}</b></p>
                         <p>Gênero: <b> ${artistsPopularityHigh[x].genres.splice(0, 2)}</b></p>
                         <p> Popularidade: ${artistsPopularityHigh[x].popularity}</p>
                     </div>
                 </div>
             </div>`;
            boxPopularityHigh.classList.remove('d-none');
        }
    }
}


function init() {
    getTopArtists();
}