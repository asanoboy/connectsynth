from django.http import HttpResponseRedirect

class ForceSslMiddleware(object):
    
    def process_request(self, request):
        
        if request.META['wsgi.url_scheme']=='http':
            return HttpResponseRedirect("https://%s%s" %(
                request.META['HTTP_HOST'],
                request.META['PATH_INFO']
            ))
        
        return None