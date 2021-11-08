// en este auxiliar almacenamos el cache dinamico
function actualizarCacheDinamico(dynamicCache,req, res){

    if(res.ok){
      return caches.open(dynamicCache).then(cache=>{
            cache.put(req, res.clone());
            return res.clone();
        });
    }
    else{
        // return fetch(e.request).then(newRes=>{
        //     return actualizarCacheDinamico(DYNAMIC_CACHE,e.request,newRes);
        return res;
        }

}