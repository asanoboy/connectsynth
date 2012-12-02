from django.db import models
from common.models import Plugin
from django.contrib.auth.models import User
import os.path


def get_plugin_upload_path(self, filename):
    return os.path.join("plugin", "repository", self.plugin.code, filename)


class File(models.Model):
    plugin = models.ForeignKey(Plugin)
    path = models.CharField(max_length=100)
    content = models.FileField(upload_to=get_plugin_upload_path)
    is_enabled = models.BooleanField(default=True)
    createdat = models.DateTimeField( auto_now_add=True )
    updatedat = models.DateTimeField( auto_now=True )
    
    class Admin:
        pass

class Preset(models.Model):
    user = models.ForeignKey(User)
    plugin = models.ForeignKey(Plugin)
    value = models.TextField()
    code = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100, null=True)
    is_enabled = models.BooleanField(default=True)
    createdat = models.DateTimeField( auto_now_add=True )
    updatedat = models.DateTimeField( auto_now=True )
    
    class Admin:
        pass
