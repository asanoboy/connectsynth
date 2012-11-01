import uuid
import mimetypes
from django.utils import simplejson

from django.views.decorators.csrf import csrf_exempt
from django.template import RequestContext
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from common.models import Plugin
from django.http import HttpResponse, HttpResponseRedirect 
from decorators import reject_invalid_code
from helpers import get_plugin_if_exists, get_unique_plugin_code, get_unique_preset_code
from helpers import is_writable, is_readable, get_failure_response, get_success_response
from django.shortcuts import render_to_response
from forms import FilesForm, PluginForm, PresetForm
from sdk.models import File, Preset

from django.core.exceptions import ObjectDoesNotExist


"""
This handler creates new plugin code of each User, if the user does not have plugin code.
If the user has already, it does not create.
Then redirect to show oscillator_sdk included the code.  
"""
@login_required
def sdk_instrument_workspace_handler(request):

    plugin, created = Plugin.objects.get_or_create(user=request.user,
                                          is_public=False)
    
    if created:
        while( True ):
            code = uuid.uuid4() 
            if not Plugin.objects.filter(code=code).exists():
                break;
            
        plugin.code = code
        plugin.save()
    
    return render_to_response('sdkoscillator.html', {
        "code": plugin.code,
    }, context_instance=RequestContext(request))
    
   
"""
This handler creates new plugin extending the plugin of input 'code', if the user does not have plugin code.
If the user has already, it does not create.
Then redirect to show oscillator_sdk included the code.  
"""
@csrf_exempt
#@login_required
@reject_invalid_code
def sdk_extend_instrument_handler(request, code, plugin):
    
    if not request.user.is_authenticated():
        return HttpResponse(simplejson.dumps({"status":"signout", "next":reverse("autho_twitter_auth")})) 
        
    
    dest_plugin, created = Plugin.objects.get_or_create(user=request.user, is_public=False,
                                               defaults={
                                                         'code': get_unique_plugin_code(),
                                                         'user': request.user,
                                                         'is_public': False
                                                         })
    
    
    updated_flags = { file.path: False for file in File.objects.filter(plugin=dest_plugin).all()}
        
    org_files = File.objects.filter(plugin=plugin)
    for org_file in org_files:
                 
        dest_file, created = File.objects.get_or_create(plugin=dest_plugin, 
                                                   path=org_file.path, 
                                                   defaults={"plugin": dest_plugin,
                                                            "path": org_file.path,
                                                            "content": org_file.content})
        
        if not created:
            org_file.content.seek(0)
            dest_file.content.save(org_file.path, org_file.content)
            
        dest_file.is_enabled = True
        dest_file.save()

        if updated_flags.has_key(dest_file.path):
            updated_flags[dest_file.path] = True
    
    for path in [ path for path, updated in updated_flags.items() if not updated ]:
        file = File.objects.get(plugin=dest_plugin, path=path)
        file.is_enabled = False
        file.save()
    
    return HttpResponse(simplejson.dumps({"status":"ok", "next":reverse("sdk_instrument_workspace")}))
    

"""
This publishes the plugin, and set its name and description.
If request.user is AnonymousUser, return "login".
"""
@csrf_exempt
@login_required
@reject_invalid_code
def sdk_publish_api_handler(request, code, plugin):
    
    if request.user != plugin.user:
        return get_failure_response()
    
    form = PluginForm(request.POST)
    
    if form.is_valid():
        plugin.is_public = True
        plugin.name = form.cleaned_data['name']
        plugin.description = form.cleaned_data['description']
        plugin.save()
        return HttpResponse(simplejson.dumps({"status": "ok",
                                              "next": reverse("sdk_instrument_player", args=[plugin.code]) 
                                              }))
        return get_success_response()
    
    return get_failure_response()

"""
requset.method = "POST" or "DELETE"
"""
@csrf_exempt
@login_required
@reject_invalid_code
def sdk_restful_api_handler(request, code, plugin):
    
    if not is_writable(request.user, plugin):
        print "is not writable"
        return get_failure_response()

    if request.method == "POST" :
        form = FilesForm(request.POST, request.FILES)
        
        if( len(request.FILES) == 0 ):
            print "files are empty"
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
def sdk_private_filelist_api_handler(request, code, plugin):
    if plugin.is_public or request.user!=plugin.user:
        return get_failure_response()
    
    paths = [ file.path for file in File.objects.filter(plugin=plugin, is_enabled=True).all() ]
    return HttpResponse(simplejson.dumps(paths))    


@login_required
@reject_invalid_code
def sdk_private_get_api_handler(request, code, path, plugin):
    if plugin.is_public or request.user!=plugin.user:
        return get_failure_response()
    
    try:
        file = File.objects.get(plugin=plugin, path__exact=path, is_enabled=True)
    except ObjectDoesNotExist:
        return get_failure_response()
        
    return HttpResponse(file.content.read(), content_type=mimetypes.guess_type(path))


"""
Preset restful api
"""
@csrf_exempt
@login_required
@reject_invalid_code
def sdk_preset_post_api_handler(request, code, plugin):
    if plugin.is_public or request.user!=plugin.user:
        return get_failure_response()
    
    if request.method == "POST" :
        form = PresetForm(request.POST)
        if form.is_valid():
            preset_code = get_unique_preset_code()
            preset = Preset.objects.create(user=request.user,
                                  plugin=plugin,
                                  code=preset_code,
                                  name=form.cleaned_data['name'],
                                  value=form.cleaned_data['value'],
                                  is_enabled=True)
            #preset.save()
            return HttpResponse( simplejson.dumps({"status":"ok", "code":preset_code}) )
        
    return get_failure_response()

@csrf_exempt
@login_required
@reject_invalid_code
def sdk_preset_delete_api_handler(request, code, plugin):
    if plugin.is_public or request.user!=plugin.user:
        return get_failure_response()
    
    
    if request.method == "POST" :
        preset_code = request.POST.get("preset_code", False)
        try :
            preset = Preset.objects.get(user=request.user,
                               plugin=plugin,
                               code=preset_code,
                               is_enabled=True)
            preset.is_enabled=False
            preset.save()
            
            return get_success_response()
        except ObjectDoesNotExist:
            return get_failure_response()
        
    return get_failure_response()


@login_required
@reject_invalid_code
def sdk_private_presetlist_handler(request, code, plugin):
    if plugin.is_public or request.user!=plugin.user:
        return get_failure_response()
    
    preset_infos = [ {'name': preset.name, 'code': preset.code, 'value': preset.value} for preset in Preset.objects.filter(plugin=plugin, is_enabled=True).all() ]
    return HttpResponse(simplejson.dumps(preset_infos))    
