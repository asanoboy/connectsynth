from django.http import HttpResponseRedirect

class ForceSslMiddleware(object):
    
    def process_request(self, request):
        print "secure" if request.is_secure() else "not secure"
        print request.META
        
        if request.META['wsgi.url_scheme']!='https':
            next = "https://%s%s" %(
                request.META['HTTP_HOST'],
                request.META['PATH_INFO']
            )
            print next
            return HttpResponseRedirect(next)
        
        return None