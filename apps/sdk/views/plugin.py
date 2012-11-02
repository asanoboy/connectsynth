import mimetypes
from django.http import HttpResponse
from django.utils import simplejson
from decorators import reject_invalid_code, reject_invalid_or_unowned_code
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from helpers import get_failure_response, get_success_response, get_unique_preset_code, is_writable
from sdk.models import Plugin, File
from forms import FilesForm
from django.core.exceptions import ObjectDoesNotExist

"""
requset.method = "POST" or "DELETE"
"""
@csrf_exempt
@login_required
@reject_invalid_or_unowned_code
def sdk_plugin_api_handler(request, code, plugin):
    """
    if not is_writable(request.user, plugin):
        return get_failure_response()
    """
    
    if request.method == "POST" :
        form = FilesForm(request.POST, request.FILES)
        
        if( len(request.FILES) == 0 ):
            print 'hoge'
            return get_failure_response()
        
        updated_flags = { file.path: False for file in File.objects.filter(plugin=plugin).all()}
        
        for name, file in request.FILES.items():
            
            file_model, created = File.objects.get_or_create(plugin=plugin, 
                                                       path=name, 
                                                       defaults={"plugin": plugin,
                                                                "path": name,
                                                                "content": file})
            if not created:
                file_model.content.save(name, file)
            file_model.is_enabled = True
            file_model.save()

            if updated_flags.has_key(name):
                updated_flags[name] = True
        
        for path in [ path for path, updated in updated_flags.items() if not updated ]:
            file = File.objects.get(plugin=plugin, path=path)
            file.is_enabled = False
            file.save()
            
        
        return get_success_response()
    
    elif( request.method=='DELETE' ):
        
        File.objects.filter(plugin=plugin).delete()
        return get_success_response()
        
        
    else:
        return get_failure_response()


@login_required
@reject_invalid_code
def sdk_plugin_filelist_api_handler(request, code, plugin):
    if not plugin.is_public and request.user!=plugin.user:
        return get_failure_response()
    
    paths = [ file.path for file in File.objects.filter(plugin=plugin, is_enabled=True).all() ]
    return HttpResponse(simplejson.dumps(paths))    


@login_required
@reject_invalid_code
def sdk_plugin_get_api_handler(request, code, path, plugin):
    if not plugin.is_public and request.user!=plugin.user:
        return get_failure_response()
    
    try:
        file = File.objects.get(plugin=plugin, path__exact=path, is_enabled=True)
    except ObjectDoesNotExist:
        return get_failure_response()
        
    return HttpResponse(file.content.read(), content_type=mimetypes.guess_type(path))

