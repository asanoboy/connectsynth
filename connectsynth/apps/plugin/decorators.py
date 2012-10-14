from functools import wraps
from django.http import HttpResponse
#from helpers import get_plugin_if_exists, get_failure_response 

from common.models import Repository

"""
If plugin corresponding to input 'code' exists, 
add **kwargs a instance of Repository model.

Otherwise return HttpResponse means invalid. 
"""
def reject_invalid_code(f):
    def wrapped(*args, **kwargs):
        if "code" in kwargs:
            
            repos = Repository.objects.filter(code=kwargs['code'], is_enabled=True)
            
            if repos.count()==0:
                return HttpResponse("Not Found")
            
            kwargs["repo_model"] = repos[0]
            
        return f(*args, **kwargs) 
    return wraps(f)(wrapped)