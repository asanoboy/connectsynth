from django.shortcuts import render_to_response
from django.template import RequestContext


def open_sequencer_handler(request):
    return render_to_response('sequencer.html', {
        }, context_instance=RequestContext(request))
