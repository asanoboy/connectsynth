from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.template import RequestContext

from common.models import Plugin

"""
[DEVELOPMENT]
Show the list of user own plugins. 

[PRODUCT]
Pending
"""
@login_required
def account_top_handler(request):
    
    plugins = Plugin.objects.filter(user=request.user, is_public=True, is_enabled=True)
    
    return render_to_response('account_top.html', {
        "object_list": plugins
    }, context_instance=RequestContext(request))