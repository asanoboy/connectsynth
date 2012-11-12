import mimetypes
from django.template import RequestContext
from decorators import reject_invalid_code
from django.shortcuts import render_to_response
from helpers import is_writable, is_readable, get_failure_response, get_success_response
from sdk.models import File, Preset
from django.http import HttpResponse
from django.utils import simplejson
from forms import FilesForm, PluginForm



"""
Show only public plugin. 
"""
@reject_invalid_code
def sdk_instrument_player_handler(request, code, plugin):
    
    if plugin.is_enabled and plugin.is_public:
        return render_to_response('oscillatorplayer.html', {
            "plugin": plugin,
            "writable": False,
            "is_owner": request.user==plugin.user 
        }, context_instance=RequestContext(request))
    
    else:
        return get_failure_response()

    
    
"""
@reject_invalid_code
def sdk_filelist_api_handler(request, code, plugin):
    
    if not plugin.is_public:
        return get_failure_response()
    
    paths = [ file.path for file in File.objects.filter(plugin=plugin, is_enabled=True).all() ]
    return HttpResponse(simplejson.dumps(paths))
"""
"""
requset.method = "GET"
""""""
@reject_invalid_code
def sdk_get_api_handler(request, code, path, plugin):
    
    
    
    #if not is_readable(request.user, plugin):
    if not plugin.is_public:
        print 'is not public'
        return get_failure_response()
    
    file = File.objects.get(plugin=plugin, path__exact=path)

    
    return HttpResponse(file.content.read(), content_type=mimetypes.guess_type(path))
"""
"""    
@reject_invalid_code
def sdk_presetlist_handler(request, code, plugin):
    if not plugin.is_public:
        return get_failure_response()
    
    preset_infos = [ {'name': preset.name, 'code': preset.code, 'value': preset.value} for preset in Preset.objects.filter(plugin=plugin, is_enabled=True).all() ]
    return HttpResponse(simplejson.dumps(preset_infos))"""  