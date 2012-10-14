from django import forms
from common.models import Repository

class ExternalRepositoryForm(forms.Form):
    url = forms.CharField(max_length=200)
    tag = forms.CharField(max_length=200)
    
    
class RepositoryPublishForm(forms.ModelForm):
    class Meta:
        model = Repository
        fields = ('name', 'description', 'image')

class PostArchiveForm(forms.Form):
    archive = forms.FileField()