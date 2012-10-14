from git import Repo
import os.path
import sys
from django.http import HttpResponse
from django.utils import simplejson

from connectsynth.settings import REPO_ROOT_PRODUCT, REPO_ROOT_TEST

REPO_ROOT = REPO_ROOT_PRODUCT if not "django.test" in sys.modules else REPO_ROOT_TEST

def get_repo(repository_model):
    try:
        if repository_model.is_public:
            repo = Repo(os.path.join(REPO_ROOT, "public", repository_model.path))
        else:
            repo = Repo(os.path.join(REPO_ROOT, "private", repository_model.path))
    except:
        return False
    
    return repo 

def get_plugin_file_path(repository_model, path=""):
    if repository_model.is_public:
        return os.path.join(REPO_ROOT, "public", repository_model.path, path)
    else:
        return os.path.join(REPO_ROOT, "private", repository_model.path, path)

def get_json_response(obj):
    return HttpResponse(simplejson.dumps(obj))