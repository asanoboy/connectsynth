from django import forms
from common.models import Plugin
from sdk.models import Preset

class PluginForm(forms.ModelForm):
    class Meta:
        model = Plugin
        fields = ('name', 'description')

class PluginDescriptionForm(forms.ModelForm):
    class Meta:
        model = Plugin
        fields = ('description',)

class PresetForm(forms.ModelForm):
    class Meta:
        model = Preset
        fields = ('name', 'value')
        
class FilesForm(forms.Form):
    file = forms.FileField()