from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.generic import ListView
from common.models import Plugin

"""
[DEVELOPMENT]
Show list of public plugins.

[PRODUCT]
Pending
"""
class InstrumentListView(ListView):
    """queryset = Plugin.objects.filter(is_public=True, 
                                         #type='instrument'
                                         )
    """
    def get_queryset(self):
        return Plugin.objects.filter(is_public=True, 
                                         #type='instrument'
                                         )
    template_name = "toppage.html"

def notfound_handler(request):
    return HttpResponse("Not found")