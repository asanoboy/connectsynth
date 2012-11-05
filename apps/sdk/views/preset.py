from django.http import HttpResponse
from django.utils import simplejson
from decorators import reject_invalid_code, reject_invalid_or_unowned_code
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from helpers import get_failure_response, get_success_response, get_unique_preset_code
from sdk.models import Preset
from forms import PresetForm
"""
Preset restful api
"""
@csrf_exempt
@login_required
@reject_invalid_or_unowned_code
def sdk_preset_post_handler(request, code, plugin):
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
@reject_invalid_or_unowned_code
def sdk_preset_delete_handler(request, code, plugin):
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


@reject_invalid_code
def sdk_preset_list_handler(request, code, plugin):
    
    if not plugin.is_public and request.user!=plugin.user:
        return get_failure_response()
    
    preset_infos = [ {'name': preset.name, 'code': preset.code, 'value': preset.value} for preset in Preset.objects.filter(plugin=plugin, is_enabled=True).all() ]
    return HttpResponse(simplejson.dumps(preset_infos))   