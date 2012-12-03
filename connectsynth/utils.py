from django.http import HttpResponseRedirect

class ForceSslMiddleware(object):
    
    def process_request(self, request):
        print request.META['wsgi.url_scheme']
        
        if request.META['wsgi.url_scheme']!='https':
            return HttpResponseRedirect("https://%s%s" %(
                request.META['HTTP_HOST'],
                request.META['PATH_INFO']
            ))
        
        return None