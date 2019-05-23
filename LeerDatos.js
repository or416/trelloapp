const Album=require('./Album');
const fs = require('fs');
const conexion=require('./Conexion');

function readLines(data) {
    var remaining = '';
    var datos = [];
    remaining += data;
    var index = remaining.indexOf('\n');
    var last  = 0;
    while (index > -1) {
        var line = remaining.substring(last, index);
        last = index + 1;
        datos.push(line);
        index = remaining.indexOf('\n', last);
      }
      remaining = remaining.substring(last);
      return datos;
  }
  
function readData(){
  var arrayDeAlbums=[];
  var content;
fs.readFile('./discography.txt', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data.toString();
    var result=[];
    result=readLines(content); 
    var orderResult= result.sort();
    var cantidadDecadas=calcularCantDecadas(orderResult);
    for(i in result){
      var anio = result[i].substring(0,4);
      var titulo = result[i].substring(5,result[i].length);
      var anioDecada= Math.floor(anio/10)*10;
      var album= new Album(titulo,anio,anioDecada);
      arrayDeAlbums.push(album);
    }
    crearArraysPorDecadas(arrayDeAlbums,cantidadDecadas);
    
});
}

function calcularCantDecadas(arrayOrdenado){
    var primeraLinea=arrayOrdenado[0];
    var primerAnio= primeraLinea.substring(0,4);
    var ultimaLinea=arrayOrdenado[arrayOrdenado.length-1];
    var ultimioAnio=ultimaLinea.substring(0,4);

    var primeraDecada= Math.floor(primerAnio/10) *10;
    var ultimaDecada=Math.floor(ultimioAnio/10)* 10;

    var cantDecadas = ((ultimaDecada-primeraDecada) /10)+1;

    return cantDecadas;
}

function crearArraysPorDecadas(albums,cantDecadas){

  var arrayTotal=[];
  var cont=0;
  var primeraDecada= albums[0].decada;
  var ultimaDecada=albums[albums.length-1].decada;
  
  for(j=0 ;j<cantDecadas;j++){
    var arrayPorDecada=[];
    if(primeraDecada!=(ultimaDecada+10)){
      for (i in albums){
        var album=albums[i];
        if(album.decada==primeraDecada ){
          arrayPorDecada[cont]=album;
          cont++;
      }
    }
        primeraDecada=primeraDecada+10;
        arrayTotal.push(arrayPorDecada);
        cont=0;
    }
  }  

  conexion(arrayTotal);

}


module.exports=readData;