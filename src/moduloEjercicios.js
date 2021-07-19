import basededatos from './basededatos.js';


/**
* Devuelve el promedio de anios de estreno de todas las peliculas de la base de datos.
*/
export const promedioAnioEstreno = () => {
    // Ejemplo de como accedo a datos dentro de la base de datos
     //console.log(basededatos.peliculas);
     //console.log("Cantidad de Peliculas "+basededatos.peliculas.length);
     var acumulador = 0;
     for(let unaPelicula of basededatos.peliculas){
        acumulador +=unaPelicula.anio;
      }
     
    return [acumulador/basededatos.peliculas.length];
};

/**
* Devuelve la lista de peliculas con promedio de critica mayor al numero que llega
* por parametro.
* @param {number} promedio
  */
export const pelicuasConCriticaPromedioMayorA = (promedio) => {
    //console.log("Valor que ingresa: "+promedio);
    //console.log(basededatos.calificaciones);
    var lista = []
   for(let una of basededatos.peliculas){
       var elpromedio =promedioDeCriticaBypeliculaId(una.id);
       if( elpromedio[0] > promedio){
            una.promedio = elpromedio[0];
            lista.push(una);
       }
   }
   
    return [lista];
};

/**
* Devuelve la lista de peliculas de un director
* @param {string} nombreDirector
*/
export const peliculasDeUnDirector = (nombreDirector) => {
    var elDirector = directorByNombre(nombreDirector);
    //console.log(elDirector);
    var lista = [];
    if (elDirector.length>0){
        for(let un of basededatos.peliculas){
            if(un.directores.indexOf(elDirector[0].id) !== -1){
                lista.push(un);
            } 
        }
    }
    return lista;
};


export const directorByNombre = (nombreDirector) => {
    for(let un of basededatos.directores){
        if(un.nombre.includes(nombreDirector)){
            return [un]
        }
    }
    return [];
};

export const directorById = (idDirector) => {
    for(let un of basededatos.directores){
        if(un.id == idDirector){
            return un
        }
    }
    return undefined;
};

export const generoById = (idGenero) => {
    for(let un of basededatos.generos){
        if(un.id == idGenero){
            return un
        }
    }
    return undefined;
};
/**
* Devuelve el promdedio de critica segun el id de la pelicula.
* @param {number} peliculaId
*/
export const promedioDeCriticaBypeliculaId = (peliculaId) => {
    var acumulador = 0;
    var cantidad = 0;
    var promedio =0;
    for(let una of basededatos.calificaciones){
        if(una.pelicula == peliculaId){
            cantidad++;
            acumulador +=una.puntuacion;
        }
      }

      if (cantidad > 0 ){
        promedio = acumulador/cantidad
      } else {
        promedio=0;
      }
    return [promedio];
};

/**
 * Obtiene la lista de peliculas con alguna critica con
 * puntuacion excelente (critica >= 9).
 * En caso de no existir el criticas que cumplan, devolver un array vacio [].
 * Ejemplo del formato del resultado: 
 *  [
        {
            id: 1,
            nombre: 'Back to the Future',
            anio: 1985,
            direccionSetFilmacion: {
                calle: 'Av. Siempre viva',
                numero: 2043,
                pais: 'Colombia',
            },
            directores: [1],
            generos: [1, 2, 6]
        },
        {
            id: 2,
            nombre: 'Matrix',
            anio: 1999,
            direccionSetFilmacion: {
                calle: 'Av. Roca',
                numero: 3023,
                pais: 'Argentina'
            },
            directores: [2, 3],
            generos: [1, 2]
        },
    ],
 */

export const peliculaById = (idPelicula) => {
        for(let un of basededatos.peliculas){
            if(un.id == idPelicula ){
                return un
            }
        }
        return undefined;
};

export const peliculaByNombre = (nombrePelicula) => {
    for(let un of basededatos.peliculas){
        if(un.nombre.includes(nombrePelicula)){
            return un
        }
    }
    return undefined;
};
export const obtenerPeliculasConPuntuacionExcelente = () => {
    // Ejemplo de como accedo a datos dentro de la base de datos
    // console.log(basededatos.peliculas);
    var lista = [];
    basededatos.calificaciones.forEach(una => {
        if(una.puntuacion >= 9){
             var elem = peliculaById(una.pelicula);
             if(elem != undefined){
                lista.push(elem)
             }


        }
        
      });
    return lista;
};

export const criticoById =(idCritico) => {
    for(let uno of basededatos.criticos){
       // console.log("Id  "+uno.id+" = : "+idCritico)
        if(uno.id == idCritico){
           // console.log("Lo encontre  "+uno.id+" = : "+idCritico)
            return uno;
        }
    }; 
    return undefined;
}
export const criticosByPeliculaId = (idPelicula) => {
    var lista =[];
    basededatos.calificaciones.forEach(una => {
        if(una.pelicula == idPelicula){
            var uno = criticoById(una.critico);
            if(uno != undefined){
                uno.puntuacion = una.puntuacion;
                //console.log(uno)
                lista.push(uno);
            }
            
        }
    });
    return lista;
}

/**
 * Devuelve informacion ampliada sobre una pelicula.
 * Si no existe la pelicula con dicho nombre, devolvemos undefined.
 * Ademas de devolver el objeto pelicula,
 * agregar la lista de criticas recibidas, junto con los datos del critico y su pais.
 * Tambien agrega informacion de los directores y generos a los que pertenece.
 * Ejemplo de formato del resultado para 'Indiana Jones y los cazadores del arca perdida':
 * {
            id: 3,
            nombre: 'Indiana Jones y los cazadores del arca perdida',
            anio: 2012,
            direccionSetFilmacion: {
                calle: 'Av. Roca',
                numero: 3023,
                pais: 'Camboya'
            },
            directores: [
                { id: 5, nombre: 'Steven Spielberg' },
                { id: 6, nombre: 'George Lucas' },
            ],
            generos: [
                { id: 2, nombre: 'Accion' },
                { id: 6, nombre: 'Aventura' },
            ],
            criticas: [
                { critico: 
                    { 
                        id: 3, 
                        nombre: 'Suzana Mendez',
                        edad: 33,
                        pais: 'Argentina'
                    }, 
                    puntuacion: 5 
                },
                { critico: 
                    { 
                        id: 2, 
                        nombre: 'Alina Robles',
                        edad: 21,
                        pais: 'Argentina'
                    }, 
                    puntuacion: 7
                },
            ]
        },
 * @param {string} nombrePelicula
 */
export const expandirInformacionPelicula = (nombrePelicula) => {
    var lapelicula = peliculaByNombre(nombrePelicula);
    if(lapelicula != undefined){
        var lista = [];
        lapelicula.directores.forEach(eldirector => {
            lista.push(directorById(eldirector));
          });
          lapelicula.directores = lista;

          var lista = [];
          lapelicula.generos.forEach(elGenero => {
              lista.push(generoById(elGenero));
            });
            lapelicula.generos = lista;

            lapelicula.criticas = criticosByPeliculaId(lapelicula.id);
        
    }
    return {lapelicula};
};
