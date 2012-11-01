import uuid
from django.http import HttpResponse, HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist
from django.core.urlresolvers import reverse
from common.models import Plugin
from sdk.models import Preset

def is_writable(user, plugin):
    
    if plugin.is_public:
        return False
    
    if plugin.user!=user:
        return False
    
    return True
    

def is_readable(user, plugin):
    if plugin.is_public:
        return True
    
    if plugin.user==user:
        return True
    
    return False

def get_plugin_if_exists(code):
    try:
        # Plugin.code is unique.
        plugin = Plugin.objects.get(code=code)
    except ObjectDoesNotExist:
        return False
    
    return plugin

def get_failure_response():
    return HttpResponseRedirect(reverse("notfound"))

def get_success_response():
    return HttpResponse("ok")

def get_unique_plugin_code():
    while( True ):
        code = str(uuid.uuid4())
        
        if Plugin.objects.filter(code=code).exists():
            continue;
        
        return code;

def get_unique_preset_code():
    while( True ):
        code = str(uuid.uuid4())
        
        if Preset.objects.filter(code=code).exists():
            continue;
        
        return code;