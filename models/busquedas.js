const axios = require('axios');

class Busquedas {

    historial = ['Tegucigalpa', 'Madrid', 'Guatemala'];

    constructor() {
        //TODO: leer DB si existe


    }

    get paramsMapBox() {
        return {
            'access-token': process.env.MAPBOX_KEY,
            'limit': 5,
            'languaje': 'es'
        }
    }

    async ciudad ( lugar = '' ) {

        try {
            // Peticion HTTP
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
                params: this.paramsMapBox
            });

            const resp = await instance.get();
            return resp.data.features.map( lugar => ( {
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.cente[0],
                lat: lugar.center[1]
            }));

        } catch (error) {
            return [];
        }
        
    }

}


module.exports = Busquedas;