importScripts('js/sw-aux.js');
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    '/',
    'index.html',
    'css/style.css',
    'Images/image.ico',
    'Images/port_4.jpeg',
    'Images/avatars/HankSchrader.jpeg',
    'Images/avatars/JessePinkmak.jpeg',
    'Images/avatars/MikeEhrmantraut.jpeg',
    'Images/avatars/SaulGoodman.jpeg',
    'Images/avatars/WalterWhite.jpeg',
    'js/app.js'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    //'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'js/libs/jquery.js',
    'css/animate.css'
];

self.addEventListener('install', e=>{

    const cachestatic = caches.open(STATIC_CACHE).then(cache=>
        cache.addAll(APP_SHELL));

    const cacheinmutable = caches.open(INMUTABLE_CACHE).then(cache=>
        cache.addAll(APP_SHELL_INMUTABLE));

    e.waitUntil(Promise.all([cachestatic, cacheinmutable]));
     

});

self.addEventListener('activate', e=>{
    const respuesta = caches.keys().then(keys =>{
        keys.forEach(key =>{
            if( key !== STATIC_CACHE && key.includes('static')){
                return caches.delete(key);
            }
        });
    });
    e.waitUntil(respuesta);
});


self.addEventListener('fetch', e=>{
    // cache respaldo internet
    const respuesta= caches.match(e.request).then(res=>{
        if(res)
            return res
        else{
            console.log(e.request.url);
            return fetch(e.request).then(newRes=>{
            //    se almacena en cache dinamico
            return actualizarCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
            });
   
        }

    });
   e.respondWith(respuesta);

});
