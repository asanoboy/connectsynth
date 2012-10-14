from django import forms
from common.models import Plugin

class PluginForm(forms.ModelForm):
    class Meta:
        model = Plugin
        fields = ('name', 'description')
        
class FilesForm(forms.Form):
    file = forms.FileField()