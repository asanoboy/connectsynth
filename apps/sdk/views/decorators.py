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