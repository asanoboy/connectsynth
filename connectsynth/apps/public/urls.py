from django.conf.urls import patterns, include, url
from views import InstrumentListView

urlpatterns = patterns('public.views',
    #url(r'^$', 'toppage_handler', name="toppage"),
    url(r'^$', InstrumentListView.as_view(), name="toppage"),
    url(r'^notfound/$', "notfound_handler", name="notfound"),
)