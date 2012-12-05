from django.conf.urls import patterns, include, url
from django.conf import settings
import views
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = []

#if not settings.DEBUG:
#    urlpatterns += patterns('',
#        url(r'^static/develop', views.raise_error404),
#    )

urlpatterns += patterns('',
    # Examples:
    # url(r'^connectsynth/', include('connectsynth.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    url(r'^admin/', include(admin.site.urls)),
    
    url(r'^app/', include('sdk.urls')),
    #url(r'^plugin/', include('plugin.urls')),
    url(r'^auth/', include('autho.urls')),
    #url(r'^account/', include('account.urls')),
    url(r'', include('public.urls')),
)
