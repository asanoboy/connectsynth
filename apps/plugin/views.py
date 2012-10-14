import git, mimetypes, os.path

from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from common.helpers import get_plugin_file_path, get_json_response
from common.models import Repository#, Preset
from forms import ExternalRepositoryForm, RepositoryPublishForm, PostArchiveForm
from helpers import create_repo_path, create_repo_code, create_repo_from_zip
from decorators import reject_invalid_code

"""
"""
@reject_invalid_code
def launch_instrument_handler(request, code, repo_model):
    if not repo_model.is_public:
        return HttpResponseNotFound("not found") #TODO:
    
    return render_to_response('instrument_player.html', {
        "code": code,
        "is_test": False
    }, context_instance=RequestContext(request))


@reject_invalid_code
def get_plugin_handler(request, code, path, repo_model):
    if not repo_model.is_public:
        return HttpResponseNotFound("not found") #TODO:
    mimetype = mimetypes.guess_type(path)
    
    repo_files = RepositoryFile.objects.filter(repo=repo_model, path=path)
    
    if repo_files.count() != 1:
        return HttpResponseNotFound("not found") #TODO:
    
    repo_file = repo_files.get(0)
    return HttpResponse(repo_file.file.read(), content_type=mimetype)
"""    
    #fullpath = get_plugin_file_path(path)
    fullpath = get_plugin_file_path(repo_model, path)
    try:
        file = open(fullpath, 'r')
    except:
        return HttpResponseNotFound("not found") #TODO:
    
    
    return HttpResponse(file.read(), content_type=mimetype)
"""
@reject_invalid_code
def get_presets_handler(request, code, repo_model):
    pass
    #presetList = [{'name':preset.name, 'value':preset.json} for preset in Preset.objects.filter(repo=repo_model, is_public=True)]


@login_required
@reject_invalid_code
def launch_instrument_test_handler(request, code, repo_model):
    if repo_model.is_public:
        return HttpResponseNotFound("not found") #TODO:
    
    if request.user != repo_model.user:
        return HttpResponseNotFound("not found") #TODO:
    
    return render_to_response('instrument_player.html', {
        "code": code,
        "is_test": True
    }, context_instance=RequestContext(request))


@login_required
@reject_invalid_code
def get_plugin_test_handler(request, code, path, repo_model):
    if repo_model.is_public:
        return HttpResponseNotFound("not found") #TODO:

    mimetype = mimetypes.guess_type(path)
    
    repo_files = RepositoryFile.objects.filter(repo=repo_model, path=path)
    
    if repo_files.count() != 1:
        return HttpResponseNotFound("not found") #TODO:
    
    repo_file = repo_files.get(0)
    return HttpResponse(repo_file.file.read(), content_type=mimetype)
    
"""    
    fullpath = get_plugin_file_path(repo_model, path)
    try:
        file = open(fullpath, 'r')
    except:
        return HttpResponseNotFound(fullpath) #TODO:
    
    return HttpResponse(file.read(), content_type=mimetype)
"""

@login_required
def upload_instrument_archive_handler(request):
    
    if request.method=="POST":
        '''if not 'archive' in request.FILES:
            return get_json_response({"status":"0"})
        '''
        form = PostArchiveForm(request.POST, request.FILES)
        
        if form.is_valid():
        
            file = request.FILES['archive']
            
            type = mimetypes.guess_type(file.name)
            
            if type[0]=='application/zip':
                repo_model = Repository(user=request.user, 
                                path=create_repo_path(),
                                code=create_repo_code(),
                                is_public=False,
                                type="i"
                                )
                repo_model.save()
                if create_repo_from_zip( file, repo_model ):

                #if create_repo_from_zip( file, get_plugin_file_path(repo_model) ):
                    #repo = git.Repo.init(get_plugin_file_path(repo_model))
                    
                    return get_json_response({"status":"1", 
                                              "code":repo_model.code,
                                              "re":reverse("launch_instrument_test", args=[repo_model.code])})
            
        
    return get_json_response({"status":"0"})
    
"""
@login_required
def clone_instrument_external_handler(request):
    
    if request.method=="POST":
        form = ExternalRepositoryForm(request.POST)
        
        if form.is_valid():
            repo_model = Repository(user=request.user, 
                                    path=create_repo_path(),
                                    code=create_repo_code(),
                                    is_public=False,
                                    type="i"
                                    )
            repo = git.Repo.clone_from(url=form.cleaned_data['url'], 
                                to_path=get_plugin_file_path(repo_model))
            
            if form.cleaned_data['tag'] in [ tag.name for tag in repo.tags ]:
                repo.git.checkout(form.cleaned_data['tag'])
                repo_model.save()
                return get_json_response({"status":"1", 
                                          "code":repo_model.code,
                                          "re":reverse("launch_instrument_test", args=[repo_model.code])})
            else:
                # invalid
                repo_model.is_enabled = False
                repo_model.save()
                return get_json_response({"status":"0"})
        
        else:
            # invalid
            return get_json_response({"status":"0"})
    
    return get_json_response({"status":"0"})
"""
@login_required
@reject_invalid_code
def publish_instrument_handler(request, code, repo_model):
    
    if request.method=="POST":
        if request.user!=repo_model.user:
            return get_json_response({"status":"0"})
        
        form = RepositoryPublishForm(request.POST, request.FILES)
        
        if form.is_valid():
            
            new_repo = Repository(user=request.user,
                                  path=create_repo_path(),
                                  code=create_repo_code(),
                                  name=form.cleaned_data['name'],
                                  description=form.cleaned_data['description'],
                                  image=request.FILES['image'],
                                  is_public=True,
                                  type="i"
                                  )
            
            repo = git.Repo.clone_from(url=get_plugin_file_path(repo_model), 
                                to_path=get_plugin_file_path(new_repo))
            
            new_repo.save()
            return get_json_response({"status":"1", "code":new_repo.code})
        else:
            return get_json_response(form.errors)
        
    elif request.method=="GET":
        return render_to_response('publish_form.html', {
            "code": code,
            "form": RepositoryPublishForm()
        }, context_instance=RequestContext(request))
    
    return get_json_response({"status":"0"})

@login_required
@reject_invalid_code
def disable_instrument_handler(request, code, repo_model):
    
    if request.method=="POST":
        if request.user!=repo_model.user:
            return get_json_response({"status":"0"})
        
        if not repo_model.is_public:
            return get_json_response({"status":"0"})
        
        repo_model.is_enabled = False
        repo_model.save()
        
        return get_json_response({"status":"1"})
    
    return get_json_response({"status":"0"})

@login_required
def my_instrument_handler(request):
    
    plugins = Repository.objects.filter(user=request.user, is_public=True, is_enabled=True)
    
    return render_to_response('myinstrument.html', {
        "object_list": plugins,
        "archive_form": PostArchiveForm(),
        "remote_form": ExternalRepositoryForm()
    }, context_instance=RequestContext(request))
    
@login_required
@reject_invalid_code
def publish_preset_handler(request, code, repo_model):
    pass
    
