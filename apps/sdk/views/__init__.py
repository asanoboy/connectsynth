from privates import sdk_instrument_workspace_handler, \
    sdk_extend_instrument_handler, \
    sdk_publish_api_handler
    #sdk_private_filelist_api_handler, \
    #sdk_private_get_api_handler, \
    #sdk_restful_api_handler
    #sdk_private_presetlist_handler, \
    #sdk_preset_post_api_handler, \
    #sdk_preset_delete_api_handler

from publics import sdk_instrument_player_handler
    #sdk_filelist_api_handler, \
    #sdk_get_api_handler, \
    #sdk_presetlist_handler
    
    



"""
@reject_invalid_code
def sdk_filelist_api_handler(request, code, plugin):
    
    if not is_readable(request.user, plugin):
        return get_failure_response()
    
    paths = [ file.path for file in File.objects.filter(plugin=plugin).all() ]
    return HttpResponse(simplejson.dumps(paths))

"""
#requset.method = "GET"
"""
@reject_invalid_code
def sdk_get_api_handler(request, code, path, plugin):
    
    if not is_readable(request.user, plugin):
        return get_failure_response()
    
    file = File.objects.get(plugin=plugin, path__exact=path)
    #res = file.content
    
    suffixToContentTypeList =[
                              [".jpg", "image/jpeg"],
                              [".jpeg", "image/jpeg"],
                              [".png", "image/png"],
                              [".gif", "image/gif"],
                              [".js", "text/javascript"],
                              ] 
    
    content_type = "text/html"
    while len(suffixToContentTypeList)>0 :
        suffixToContentType=suffixToContentTypeList.pop()
        if( path.rfind(suffixToContentType[0])== len(path)-len(suffixToContentType[0]) ):
            content_type = suffixToContentType[1]
    
    return HttpResponse(file.content.read(), content_type=content_type)
    
"""
#requset.method = "POST" or "DELETE"
"""
@csrf_exempt
@reject_invalid_code
def sdk_restful_api_handler(request, code, plugin):
    if not is_writable(request.user, plugin):
        return get_failure_response()

    if request.method == "POST" :
        form = FilesForm(request.POST, request.FILES)
        
        if( len(request.FILES) == 0 ):
            return get_failure_response()
                        
        for name, file in request.FILES.items():
            duplicateFiles = File.objects.filter(plugin=plugin, path__exact=name)
            if duplicateFiles.count()>0:
                duplicateFiles[0].content.save(name, file)
                duplicateFiles[0].save()
            else:
                newFile = File(plugin=plugin, path=name, content=file)
                newFile.save()   
                
        
        return get_success_response()
    
    elif( request.method=='DELETE' ):
        
        File.objects.filter(plugin=plugin).delete()
        return get_success_response()
        
        
    else:
        return get_failure_response()
"""
