import uuid, git, tempfile
import zipfile, os
from common.models import Repository, RepositoryFile
from django.core.files import File

def create_repo_path():
    while True:
        path = str(uuid.uuid4())+".git"
        if Repository.objects.filter(path=path).count()==0:
            return path

def create_repo_code():
    while True:
        code = str(uuid.uuid4())
        if Repository.objects.filter(code=code).count()==0:
            return code



def _create_repo_from_zip(source, path_to):
    try:
        zf = zipfile.ZipFile(source, 'r')
    except:
        return False
    
    names = [name for name in zf.namelist() if os.path.basename(name)=="main.js"]
    if len( names ) != 1:
        return False
    
    main_dirname = os.path.dirname(names[0])
    
    if not os.path.isdir(path_to):
        os.makedirs(path_to)
    
    repo = git.Repo.init(path_to)
    
    for name in zf.namelist():
        
        #deperture_name = os.path.join(path_to, os.sep.join(name.split(os.sep)[1:]))
        if name.find(main_dirname) != 0:
            continue;
        
        shortened_name = name[len(main_dirname):]
        deperture_name = os.path.join(path_to, shortened_name)

        if not os.path.isdir(os.path.dirname(deperture_name)):
            os.makedirs(os.path.dirname(deperture_name))
        newfile = file(deperture_name, "wb")
        newfile.write(zf.read(name))
        newfile.close()
        repo.index.add([shortened_name])
    
    repo.index.commit("Add Plugin")
    
    return True

def create_repo_from_zip(source, repo):
    
    try:
        zf = zipfile.ZipFile(source, 'r')
    except:
        return False
    
    names = [name for name in zf.namelist() if os.path.basename(name)=="main.js"]
    if len( names ) != 1:
        return False
    
    #main_dirname = os.path.dirname(names[0])
    
    #if not os.path.isdir(path_to):
    #    os.makedirs(path_to)
    
    #repo = git.Repo.init(path_to)
    
    for name in zf.namelist():
        print name
        tmpfile = tempfile.TemporaryFile()
        tmpfile.write(zf.read(name))
        tmpfile.seek(0)
        file = File(tmpfile, name=name)
        repofile = RepositoryFile(repo=repo, file=file, path=name)
        repofile.save()
    
    return True