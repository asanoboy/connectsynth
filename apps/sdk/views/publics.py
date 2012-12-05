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
            "description": plugin.description,
            "title": plugin.name + " - ConnectSynth",
            "writable": False,
            "is_owner": request.user==plugin.user 
        }, context_instance=RequestContext(request))
    
    else:
        return get_failure_response()