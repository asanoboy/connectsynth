from django.db import models
from django.contrib.auth.models import User
import os.path

class TwitterUser(models.Model):
    user = models.OneToOneField(User)
    twitterid = models.IntegerField(max_length=100, unique=True)
    profile_image_url = models.CharField(max_length=200)
    screen_name = models.CharField(max_length=100)
    createdat = models.DateTimeField( auto_now_add=True )
    updatedat = models.DateTimeField( auto_now=True )
    

class Plugin(models.Model):
    user = models.ForeignKey(User, null=True)
    code = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=100, null=True)
    is_public = models.BooleanField(default=True)
    is_enabled = models.BooleanField(default=True)
    parent = models.ForeignKey('self', null=True)
    createdat = models.DateTimeField( auto_now_add=True )
    updatedat = models.DateTimeField( auto_now=True )
    
    class Admin:
        pass
"""
def get_plugin_image_upload_path(self, filename):
    return os.path.join("plugin", "image", self.code, filename)

def get_plugin_upload_path(self, filename):
    return os.path.join("plugin", "repository", self.repo.code, filename)
    

class Repository(models.Model):
    user = models.ForeignKey(User, editable=False)
    path = models.CharField(max_length=100, unique=True, editable=False)
    code = models.CharField(max_length=100, unique=True, editable=False)
    name = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=500, null=True)
    is_public = models.BooleanField(default=False, editable=False)
    is_enabled = models.BooleanField(default=True)
    image = models.ImageField(null=True, upload_to=get_plugin_image_upload_path)
    type = models.CharField(max_length=100, 
                            choices=(
                                     ("i", "Instrument"),
                                     ("e", "Effect"),
                                     ),
                            default="i"
                            )
    createdat = models.DateTimeField( auto_now_add=True )
    updatedat = models.DateTimeField( auto_now=True )

class RepositoryFile(models.Model):
    file = models.FileField(upload_to="repository_file")
    repo = models.ForeignKey(Repository)
    path = models.CharField(max_length=100, unique=True, editable=False)
    is_enabled = models.BooleanField(default=True)

"""
"""
class Repository(models.Model):
    user = models.ForeignKey(User, editable=False)
    path = models.CharField(max_length=100, unique=True, editable=False)
    code = models.CharField(max_length=100, unique=True, editable=False)
    createdat = models.DateTimeField( auto_now_add=True )
    updatedat = models.DateTimeField( auto_now=True )
    is_enabled = models.BooleanField(default=True)
    
    class Meta:
        abstract = True

class Workspace(Repository):
    type = models.CharField(max_length=20, 
                            choices=(
                                     ("i", "Instrument"),
                                     ("e", "Effect"),
                                     ),
                            )
    pass


class Instrument(Repository):
    name = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=500, null=True)
    image = models.ImageField(null=True, upload_to='image/instrument')
    pass

class Effect(Repository):
    name = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=500, null=True)
    image = models.ImageField(null=True, upload_to='image/effect')
    pass

class Preset(models.Model):
    user = models.ForeignKey(User, editable=False)
    code = models.CharField(max_length=100, unique=True, editable=False)
    json = models.TextField()
    name = models.CharField(max_length=100)
    is_enable = models.BooleanField(default=True)
    createdat = models.DateTimeField( auto_now_add=True )
    updatedat = models.DateTimeField( auto_now=True )
    
    class Meta:
        abstract = True

class InstrumentPreset(Preset):
    instrument = models.ForeignKey(Instrument)
    pass

class EffectPreset(Preset):
    effect = models.ForeignKey(Effect)
    pass

class Track(models.Model):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=500, null=True)
    image = models.ImageField(null=True, upload_to='image/track')
    parent = models.ForeignKey("self", null=True)
    pass

class TrackPart(models.Model):
    track = models.ForeignKey(Track)
    idx = models.IntegerField()
    instrument_preset = models.ForeignKey(InstrumentPreset)
    effect_preset = models.ManyToManyField(EffectPreset, through='TrackEffectPreset')
    midi = models.FileField(upload_to="midi")
    pass

class TrackEffectPreset(models.Model):
    track_part = models.ForeignKey(TrackPart)
    effect_preset = models.ForeignKey(EffectPreset)
    idx = models.IntegerField()

"""
