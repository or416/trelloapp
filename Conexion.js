const Request = require("sync-request");

var token= 'ccaba52ad67402a56d59efc81b74817730a4e1bf39aa161374b4e4d0aad35ef2';
var key='7464def7b42510af82a85213234ab816';

function crearBoard(albums){
  var urlBoard='https://api.trello.com/1/boards?key=' + key + '&token='+ token;

  var optionsPostBoard =  
   { name: 'Discografia Bob Dylan',
     defaultLabels: 'true',
     defaultLists: 'true',
     keepFromSource: 'none',
     prefs_permissionLevel: 'private',
     prefs_voting: 'disabled',
     prefs_comments: 'members',
     prefs_invitations: 'members',
     prefs_selfJoin: 'true',
     prefs_cardCovers: 'true',
     prefs_background: 'blue',
     prefs_cardAging: 'regular' };

  var response=Request('POST',urlBoard,
  {json:optionsPostBoard,});
       var idBoard= JSON.parse(response.body).id;
       console.log(idBoard);
       for(i in albums){
        var arrayofAlbums=albums[i];
        var urlList='https://api.trello.com/1/lists?key=' + key + '&token=' + token; 
        var optionsList = { 
          name: 'Lista:' +i, 
          idBoard: idBoard 
        } ;
        crearListDeBoard(arrayofAlbums,optionsList , urlList);
       }
  
}

function crearListDeBoard(arrayofAlbums,optionsList, urlList){
  var response=Request('POST',urlList,
  {json:optionsList,});
       var idList= JSON.parse(response.body).id;
       console.log(idList);
       for(j in arrayofAlbums){
         var album= arrayofAlbums[j];
         var urlCard='https://api.trello.com/1/cards?key=' + key + '&token=' + token; 
         var optionsCard = { idList: idList,
            keepFromSource: 'all', 
            name : album.anio +  '-' + album.titulo, 
            desc : album.titulo };
        crearCard(optionsCard, urlCard);
       }

}

function crearCard(optionsCard,urlCard){
  var response=Request('POST',urlCard,
  {json:optionsCard,});
  console.log(JSON.parse(response.body));

}


module.exports=crearBoard;
