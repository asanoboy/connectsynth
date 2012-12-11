import mimetypes
import os.path
from django.http import HttpResponse
from django.utils import simplejson
from decorators import reject_invalid_code, reject_invalid_or_unowned_code
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse 

from helpers import get_failure_response, get_success_response, get_unique_preset_code, is_writable
from sdk.models import Plugin, File
from forms import FilesForm, PluginDescriptionForm
from django.core.exceptions import ObjectDoesNotExist
from common.models import TwitterUser


"""
requset.method = "POST" or "DELETE"
"""
@csrf_exempt
#@login_required
@reject_invalid_or_unowned_code
def sdk_plugin_api_handler(request, code, plugin):
    if plugin.is_public or request.user!=plugin.user:
        return get_failure_response()
    
    """
    if not is_writable(request.user, plugin):
        return get_failure_response()
    """
    
    if request.method == "POST" :
        #form = FilesForm(request.POST, request.FILES)
        
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


@reject_invalid_code
def sdk_plugin_filelist_api_handler(request, code, plugin):
    if not plugin.is_public and request.user!=plugin.user:
        return get_failure_response()
    
    paths = [ file.path for file in File.objects.filter(plugin=plugin, is_enabled=True).all() ]
    return HttpResponse(simplejson.dumps(paths))    


@reject_invalid_code
def sdk_plugin_get_api_handler(request, code, path, plugin):
    
    if not plugin.is_public and request.user!=plugin.user:
        return get_failure_response()
    
    is_bootstrap = request.GET.get("bootstrap", False)
    if is_bootstrap:
        bootstrap_path = os.path.join( os.path.dirname(os.path.abspath(__file__)), "bootstrap.js" )
        return HttpResponse(open(bootstrap_path).read(), content_type="text/javascript")
    
    try:
        file = File.objects.get(plugin=plugin, path__exact=path, is_enabled=True)
    except ObjectDoesNotExist:
        return get_failure_response()
    
    response = HttpResponse(file.content.read(), content_type=mimetypes.guess_type(path)[0])
    
    if plugin.is_public:
        response['Cache-Control'] = "max-age=86400"
    
    return response


@csrf_exempt
@reject_invalid_code
def sdk_plugin_description_api_handler(request, code, plugin):
    
    if request.method == "POST" :
        if request.user!=plugin.user:
            return get_failure_response()
        
        form = PluginDescriptionForm(request.POST)
        if not form.is_valid():
            return get_failure_response()
        
        plugin.description = form.cleaned_data['description']
        plugin.save()
        return HttpResponse(simplejson.dumps({"status":"ok"}))
        
    
    elif request.method == 'GET' :
        if not plugin.is_public:
            return get_failure_response()
        
        return HttpResponse(simplejson.dumps({"status":"ok",
                                              "description": plugin.description}))
        
    return get_failure_response()

@reject_invalid_code
def sdk_plugin_information_api_handler(request, code, plugin):
    if not plugin.is_public:
        return get_failure_response()
    
    # assume that twitter user exists.
    twitter_user = TwitterUser.objects.get(user=plugin.user)
    
    result = {"status":"ok",
              "description": plugin.description,
              "screen_name": twitter_user.screen_name,
              "usertype": 'twitter'}
    
    if plugin.parent and plugin.parent.is_public and plugin.parent.is_enabled :
        result['parent'] = {'name': plugin.parent.name,
                            'url': reverse('sdk_instrument_player', args=[plugin.parent.code])}    
    
    
    return HttpResponse(simplejson.dumps(result))

@csrf_exempt
@reject_invalid_or_unowned_code
def sdk_plugin_delete_handler(request, code, plugin):
    if request.method == "DELETE":
        plugin.is_enabled = False
        plugin.save()
        return HttpResponse(simplejson.dumps({"status": "ok"}))
    
    return get_failure_response()
    
