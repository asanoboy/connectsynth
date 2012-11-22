from django.http import Http404

def raise_error404(request):
    print 'hoge'
    raise Http404  
