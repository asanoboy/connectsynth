from django.http import HttpResponse
from django.conf import settings
import base64

ID = settings.STAGING_HTTP_BASIC_AUTH_ID or False
PW = settings.STAGING_HTTP_BASIC_AUTH_PW or False

class AuthMiddleware(object):
    
    def process_request(self, request):
        
        if not ID or not PW:
            return None
        
        if request.META.has_key('HTTP_AUTHORIZATION'):
            (method, encoded) = request.META['HTTP_AUTHORIZATION'].split()
            if method.lower() == 'basic':
    
                (username, password) = base64.b64decode(encoded).split(":")
                if username == ID and password == PW:
                    return None
    
        response = HttpResponse(status=401)
        response['WWW-Authenticate'] = 'Basic realm="Secret File"'
        return response
