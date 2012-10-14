import mimetypes
from django.template import RequestContext
from decorators import reject_invalid_code
from django.shortcuts import render_to_response
from helpers import is_writable, is_readable, get_failure_response, get_success_response
from sdk.models import File
from django.http import HttpResponse
from django.utils import simplejson
from forms import FilesForm, PluginForm



"""
Show only existing plugin.
Don't show another user's private plugin. 
Only user's self private plugin is editable. 
"""
@reject_invalid_code
def sdk_instrument_player_handler(request, code, plugin):

    return render_to_response('oscillatorplayer.html', {
        "plugin": plugin,
        "writable": False
    }, context_instance=RequestContext(request))

    
    

@reject_invalid_code
def sdk_filelist_api_handler(request, code, plugin):
    
    if not plugin.is_public:
        return get_failure_response()
#    if not is_readable(request.user, plugin):
#        return get_failure_response()
    
    paths = [ file.path for file in File.objects.filter(plugin=plugin, is_enabled=True).all() ]
    return HttpResponse(simplejson.dumps(paths))

"""
requset.method = "GET"
"""
@reject_invalid_code
def sdk_get_api_handler(request, code, path, plugin):
    
    
    
    #if not is_readable(request.user, plugin):
    if not plugin.is_public:
        print 'is not public'
        return get_failure_response()
    
    file = File.objects.get(plugin=plugin, path__exact=path)
    #res = file.content
    
#    suffixToContentTypeList =[
#                              [".jpg", "image/jpeg"],
#                              [".jpeg", "image/jpeg"],
#                              [".png", "image/png"],
#                              [".gif", "image/gif"],
#                              [".js", "text/javascript"],
#                              ] 
#    
#    content_type = "text/html"
#    while len(suffixToContentTypeList)>0 :
#        suffixToContentType=suffixToContentTypeList.pop()
#        if( path.rfind(suffixToContentType[0])== len(path)-len(suffixToContentType[0]) ):
#            content_type = suffixToContentType[1]
    
    return HttpResponse(file.content.read(), content_type=mimetypes.guess_type(path))
    
