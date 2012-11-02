from functools import wraps
from django.http import HttpResponse
from helpers import get_plugin_if_exists, get_failure_response 

"""
If plugin corresponding to input 'code' exists, 
add **kwargs a instance of Plugin model.

Otherwise return HttpResponse means invalid. 
"""
def reject_invalid_code(f):
    def wrapped(*args, **kwargs):
        if "code" in kwargs:
            plugin = get_plugin_if_exists(kwargs['code'])
            
            if not plugin:
                return get_failure_response()
            
            kwargs["plugin"] = plugin
            
        return f(*args, **kwargs) 
    return wraps(f)(wrapped)


"""
Addition to reject_invalid_code, 
reject the case that request.user is not plugin.user.
"""
def reject_invalid_or_unowned_code(f):
    def wrapped(request, *args, **kwargs):
        if "code" in kwargs:
            plugin = get_plugin_if_exists(kwargs['code'])
            
            if not plugin:
                return get_failure_response()
            
            if request.user != plugin.user:
                return get_failure_response()
            
            kwargs["plugin"] = plugin
            
        return f(request, *args, **kwargs) 
    return wraps(f)(wrapped)