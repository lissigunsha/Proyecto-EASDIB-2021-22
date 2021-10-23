var account = "steasdibsjoasix001";
var fileShare = "images";
var sas = "?sv=2020-02-10&ss=bfqt&srt=o&sp=rwdlacupx&se=2021-07-20T23:14:48Z&st=2021-05-20T15:14:48Z&spr=https&sig=LkQJ0ou1LCspWr5vqJRjuwIbbT27xrqRCCCrgf8TKXk%3D";

// Get query string parameters value
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
// Initialize the App Client    
const client = stitch.Stitch.initializeDefaultAppClient("samplesjomusic-yxjna");
// Get a MongoDB Service Client
const mongodb = client.getServiceClient(
    stitch.RemoteMongoClient.factory,
    "mongodb-atlas"
);
// Get a reference to the music database
const db = mongodb.db("sample_sjo_music");

var arraysongs = new Array();

// Function display albums
function displayallalbums() {
    db.collection("albums")
        .find()
        .toArray()
        .then(docs => {
            var html = "";
            for (j = 0; j < docs.length; j++) {
                console.log(docs[j].images);
                /*                         var result = "<div class='album_box'>" +
                                            "<img class='album_img' src='img/album" + numalbum + ".jpg'>" +
                                            "<p class='album_title'>" + docs[j].title + "<i class='fas fa-times' style='margin-left: 10px; color: #EC407A' onclick='borrar('" + docs[j]._id +"');'></i></p>" +
                                            "</div>"; */
                /* Aquí */
                var result = `<div class='album_box'><img class='album_img' src='https://${account}.file.core.windows.net/${fileShare}/${docs[j].images[0]}${sas}&xyz=` + new Date().getTime().toString() + `'><a href='../frontend/album.html?id=${docs[j]._id}'><p class='album_title'>${docs[j].title}</a><i class='fas fa-times' style='margin-left: 10px; color: #EC407A' onclick='borrar("${docs[j]._id}");'></i></p></div>`;
                html = html + result;
            }
            document.getElementById("albums").innerHTML = html;
        });

        db.collection("styles")
        .find()
        .toArray()
        .then(docs2 => {
            var html2 = "";
            for (k = 0; k < docs2.length; k++) {
                console.log(docs2[k].name);
                var result2 = `<option value="${docs2[k].name}">${docs2[k].name}</option>`;
                html2 = html2 + result2;
            }
            document.getElementById("style").innerHTML = html2;
        });
}

function displayallalbumsuser() {
    db.collection("albums")
        .find()
        .toArray()
        .then(docs => {
            var html = "";
            for (j = 0; j < docs.length; j++) {
                console.log(docs[j].images);
                /*                         var result = "<div class='album_box'>" +
                                            "<img class='album_img' src='img/album" + numalbum + ".jpg'>" +
                                            "<p class='album_title'>" + docs[j].title + "<i class='fas fa-times' style='margin-left: 10px; color: #EC407A' onclick='borrar('" + docs[j]._id +"');'></i></p>" +
                                            "</div>"; */
                /* Aquí */
                var result = `<div class='album_box'><img class='album_img' src='https://${account}.file.core.windows.net/${fileShare}/${docs[j].images[0]}${sas}&xyz=` + new Date().getTime().toString() + `'><a href='album.html?id=${docs[j]._id}'><p class='album_title'>${docs[j].title}</a></p></div>`;
                html = html + result;
            }
            document.getElementById("albums").innerHTML = html;
        });
}
// Function execute on load
function displayAlbums() {
    client.auth
        .loginWithCredential(new stitch.AnonymousCredential())
        .then(displayallalbums)
        .catch(console.error);
}

function displayAlbumsUser() {
    client.auth
        .loginWithCredential(new stitch.AnonymousCredential())
        .then(displayallalbumsuser)
        .catch(console.error);
}

function displaySingleAlbum() {
    client.auth
        .loginWithCredential(new stitch.AnonymousCredential())
        .then(displayalbum)
        .catch(console.error);
}

function insertSong(){
    var songname = document.getElementById('songtext').value;
    var butInsert = document.getElementById('insSong').text;
    var counter = 0;
    arraysongs.push(songname);
    console.log(arraysongs);
    songname = '';
    counter++;
    butInsert = `Insert (${counter})`;
}

function publicar() {
    /* var user = document.getElementById('user').value; */
    const albumTitle = document.getElementById('title').value;
    const published = document.getElementById('publi').value;
    const albumDuration = document.getElementById('duration').value;
    
    
    const isCD = document.getElementById('cd').checked;
    const isVinillo = document.getElementById('vinillo').checked;
    const isCasette = document.getElementById('casette').checked;
    var style = document.getElementById('style').value;
    var archivos = document.getElementById('files').files;
    var imagenes = new Array();


    for (var i = 0; i < archivos.length; i++) {
        imagenes.push(archivos[i].name);
    }


    db.collection("albums")
        .insertOne({
            owner_id: client.auth.user.id,
            title: albumTitle,
            duration: parseInt(albumDuration),
            date: new Date(published),
            style: style,
            formats: {
                cd: isCD,
                vinillo: isVinillo,
                casette: isCasette
            },
            images: imagenes,
            songs: arraysongs
        })

    /* console.log(title, duration, published, style, freestyle, isCD, isVinillo, isCasette); */

    displayAlbums();
}

function insertStyle() {
    /* var user = document.getElementById('user').value; */
    const selectedStyle = document.getElementById('freestyle').value;

    db.collection("styles")
        .insertOne({
            name: selectedStyle
        })

    /* console.log(title, duration, published, style, freestyle, isCD, isVinillo, isCasette); */

    displayallalbums();
}

function borrar(x) {

    db.collection("albums")
        .deleteOne({
            _id: new stitch.BSON.ObjectId(x)
        })

    /* console.log(title, duration, published, style, freestyle, isCD, isVinillo, isCasette); */

    displayAlbums();
}

function displayalbum() {
    var id = getParameterByName('id');
//eoeoe


    db.collection("albums")
        .find({
            "_id": new stitch.BSON.ObjectId(id)
        })

// src='https://${account}.file.core.windows.net/${fileShare}/${docs[j].images[0]}${sas}&xyz=` + new Date().getTime().toString() + `'
        .toArray()
        .then(docs => {
            var cabecera = `<div class="logo">
                        <img src="https://${account}.file.core.windows.net/${fileShare}/${docs[0].images[0]}${sas}&xyz=` + new Date().getTime().toString() + `" class="logoimg"> 
                        <div>
                            <p class="logo_notsongs">${docs[0].title}</p>
                            <span class="logo_notsongs" style="font-size: 15px; float: left;">Published on ${docs[0].date.toLocaleDateString("es-ES")} <span
                                    style="color: rgb(58, 58, 58);">●</span> </span><span class="logo_notsongs"
                                style="font-size: 15px; float: left; color: rgb(185, 185, 185); display: flex; margin-left: 7px;">Duration: ${docs[0].duration} seconds</span>
                        </div>
                    </div>`;
            document.getElementById("logobackground").innerHTML = cabecera;

            docs[0].songs.forEach((element) => {
                var cancion = `<div class='album_box'>
                    <img class='album_img' src="https://${account}.file.core.windows.net/${fileShare}/${docs[0].images[0]}${sas}&xyz=` + new Date().getTime().toString() + `">
                    <p class='album_title'>${element}</p>
                    <p class='album_title' style="float: right; margin-right: 15px;"></p>
                    </div>`;
                document.getElementById("albums").innerHTML += cancion;
            })
        });

}


// Azure ::


var currentPath = '';
var fileUri = '';
var currentPath = [];


function checkParameters() {


    if (account == null || account.length < 1) {
        alert('Please enter a valid storage account name!');
        return false;
    }
    if (sas == null || sas.length < 1) {
        alert('Please enter a valid SAS Token!');
        return false;
    }


    return true;
}


function getFileService() {
    if (!checkParameters())
        return null;


    fileUri = 'https://' + account + '.file.core.windows.net';
    var fileService = AzureStorage.File.createFileServiceWithSas(fileUri, sas).withFilter(new AzureStorage.File.ExponentialRetryPolicyFilter());
    return fileService;
}


function viewFileShare(selectedFileShare) {
    fileShare = selectedFileShare;
    alert('Selected ' + fileShare + ' !');
    currentPath = [];
    refreshDirectoryFileList();
}


function refreshDirectoryFileList(directory) {
    var fileService = getFileService();
    if (!fileService)
        return;


    if (fileShare.length < 1) {
        alert('Please select one file share!');
        return;
    }


    if (typeof directory === 'undefined')
        var directory = '';
    if (directory.length > 0)
        currentPath.push(directory);
    directory = currentPath.join('\\\\');


    document.getElementById('directoryFiles').innerHTML = 'Cargando...';
}


function displayProcess(process) {
    document.getElementById('progress').style.width = process + '%';
    document.getElementById('progress').innerHTML = process + '%';
}


function createFileFromStream(checkMD5) {
    var files = document.getElementById('files').files;
    if (!files.length) {
        alert('Please select a file!');
        return;
    }

    var subida = 0; // Imágenes que se han subido al servidor

    // -------------------

    for (i = 0; i < files.length; i++) {
        var file = files[i];
        var options = {
            contentSettings: {
                contentType: file.type
            },
            storeFileContentMD5: checkMD5
        };



        var fileService = getFileService();
        if (!fileService)
            return;


        var btn = document.getElementById("upload-button");
        btn.disabled = true;
        btn.innerHTML = "Uploading...";
        var finishedOrError = false;


        var speedSummary = fileService.createFileFromBrowserFile(fileShare, currentPath.join('\\\\'), file.name, file, options, function (error, result, response) {
            finishedOrError = true;
            btn.disabled = false;
            btn.innerHTML = "Insert a new album";
            if (error) {
                alert("Upload failed, open browser console for more detailed info.");
                console.log(error);
                displayProcess(0);
            } else {
                // Upload Success !!
                displayProcess(100);
                setTimeout(function () { // Prevent alert from stopping UI progress update
                    /* alert('Álbum subido correctamente'); */
                    subida++;
                    if (subida == files.length) { // Compruebo si lo subido es lo mismo que quería subir
                        publicar();
                        // Refresh directory file list
                        refreshDirectoryFileList();
                    }
                }, 1000);
                // Insert document in a collection of MongoDB data base


            }
        });


        speedSummary.on('progress', function () {
            var process = speedSummary.getCompletePercent();
            displayProcess(process);
        });
    }
}

function buscarestilo() {
    let style = document.getElementById('style').value;

    db.collection("albums")
        .find({
            "predefinedStyle": style
        })
        .toArray()
        .then(docs => {
            var html = "";
            for (j = 0; j < docs.length; j++) {
                console.log(docs[j].images);
                var result = `<div class='album_box'><img class='album_img' src='https://${account}.file.core.windows.net/${fileShare}/${docs[j].imagen1}${sas}&xyz=` + new Date().getTime().toString() + `'><a href='album.html?id=${docs[j]._id}'><p class='album_title'>${docs[j].title}</a><i class='fas fa-times' style='margin-left: 10px; color: #EC407A' onclick='borrar("${docs[j]._id}");'></i></p></div>`;
                html = html + result;
            }
            document.getElementById("albums").innerHTML = html;
        });
}

function buscarformato() {
    var esVinilo = document.getElementById('vinillo').value;
    var esCD = document.getElementById('cd').value;
    var esCasette = document.getElementById('casette').value;

    db.collection("albums")
        .find({$and: [{"formats.vinillo": esVinilo}, {"formats.cd": esCD}, {"formats.casette": esCasette}]})
        .toArray()
        .then(docs => {
            var html = "";
            for (j = 0; j < docs.length; j++) {
                console.log(docs[j].images);
                var result = `<div class='album_box'><img class='album_img' src='https://${account}.file.core.windows.net/${fileShare}/${docs[j].imagen1}${sas}&xyz=` + new Date().getTime().toString() + `'><a href='album.html?id=${docs[j]._id}'><p class='album_title'>${docs[j].title}</a><i class='fas fa-times' style='margin-left: 10px; color: #EC407A' onclick='borrar("${docs[j]._id}");'></i></p></div>`;
                html = html + result;
            }
            document.getElementById("albums").innerHTML = html;
        });
}

function buscarfecha() {
    let style = document.getElementById('style').value;

    db.collection("albums")
        .find({
            "predefinedStyle": style
        })
        .toArray()
        .then(docs => {
            var html = "";
            for (j = 0; j < docs.length; j++) {
                console.log(docs[j].images);
                var result = `<div class='album_box'><img class='album_img' src='https://${account}.file.core.windows.net/${fileShare}/${docs[j].imagen1}${sas}&xyz=` + new Date().getTime().toString() + `'><a href='album.html?id=${docs[j]._id}'><p class='album_title'>${docs[j].title}</a><i class='fas fa-times' style='margin-left: 10px; color: #EC407A' onclick='borrar("${docs[j]._id}");'></i></p></div>`;
                html = html + result;
            }
            document.getElementById("albums").innerHTML = html;
        });
}

function buscarduracion() {
    let style = document.getElementById('style').value;

    db.collection("albums")
        .find({
            "predefinedStyle": style
        })
        .toArray()
        .then(docs => {
            var html = "";
            for (j = 0; j < docs.length; j++) {
                console.log(docs[j].images);
                var result = `<div class='album_box'><img class='album_img' src='https://${account}.file.core.windows.net/${fileShare}/${docs[j].imagen1}${sas}&xyz=` + new Date().getTime().toString() + `'><a href='album.html?id=${docs[j]._id}'><p class='album_title'>${docs[j].title}</a><i class='fas fa-times' style='margin-left: 10px; color: #EC407A' onclick='borrar("${docs[j]._id}");'></i></p></div>`;
                html = html + result;
            }
            document.getElementById("albums").innerHTML = html;
        });
}

var seleccion = document.getElementById('query1');
seleccion.addEventListener('change', function() {
    let botonbuscar = document.getElementById('searchby');
    switch (seleccion.value) {
        case "Fpubli":
        botonbuscar.innerHTML = `<button id="searchby" style="margin-left: 10px;" class="insert_button" ><a href="buscarfecha.html">Buscar según parámetro</a></button>`;
          break;
        case "Duracion":
        botonbuscar.innerHTML = `<button id="searchby" style="margin-left: 10px;" class="insert_button" ><a href="buscarduracion.html">Buscar según parámetro</a></button>`;
          break;
        case "Estilo":
        botonbuscar.innerHTML = `<button id="searchby" style="margin-left: 10px;" class="insert_button" ><a href="buscarestilo.html">Buscar según parámetro</a></button>`;
          break;
        case "Formatos":
        botonbuscar.innerHTML = `<button id="searchby" style="margin-left: 10px;" class="insert_button" ><a href="buscarformatos.html">Buscar según parámetro</a></button>`;
          break;
        default:
          break;
      }
});

/* console.log(title, duration, published, style, freestyle, isCD, isVinillo, isCasette); */

/* displayAlbums(); */