var limitTopArtists = 10;
var topArtistsUrl = `https://api.spotify.com/v1/me/top/artists?limit=${limitTopArtists}`;
var boxData = document.getElementById('box-artists');
console.log('boxData: ', boxData);

console.log('caiu aqui no custom');

let cont = 0;

getTopArtists();

function getTopArtists() {
    fetch(topArtistsUrl, {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer BQAeFtR1LHCSm4_d9S6VmpaCCS4Vz58HJlh0ZYdUXsjk-r5jvOtSJH__CxXPD8C0Eey8QjYGhB2rIRGp_3RD5e_x0G-VDfjf4f9UOPdAfTpcOjNKIhwk_QMItHo_aZwbBB1L-CgtdhiZ3trjKNSYlOBlNJDK8KdySxfXHe_GI7Jf5-t_rg'
        })
    }).then(response => response.json()) // retorna uma promise
        .then(result => {
            console.log('result', result);
            result.items.forEach(function (value) {
                cont++;

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
        });
}

