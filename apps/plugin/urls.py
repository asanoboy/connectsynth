from django.conf.urls import patterns, include, url

urlpatterns = patterns('plugin.views',
    
    # Not Required Singin.
    url(r'^instrument/(?P<code>[^/]+)/$', 'launch_instrument_handler', name="launch_instrument"),
    url(r'^file/(?P<code>[^/]+)/(?P<path>.+)$', 'get_plugin_handler', name="get_plugin"),
    
    # Required Singin.
    url(r'^instrument_test/(?P<code>[^/]+)/$', 'launch_instrument_test_handler', name="launch_instrument_test"),
    url(r'^file_test/(?P<code>[^/]+)/(?P<path>.+)$', 'get_plugin_test_handler', name="get_plugin_test"),
    #url(r'^clone/instrument/external/$', 'clone_instrument_external_handler', name="clone_instrument_external"),
    url(r'^upload/instrument/archive/$', 'upload_instrument_archive_handler', name="upload_instrument_archive"),
    
    url(r'^publish/instrument/(?P<code>[^/]+)/$', 'publish_instrument_handler', name="publish_instrument"),
    url(r'^disable/instrument/(?P<code>[^/]+)/$', 'disable_instrument_handler', name="disable_instrument"),
    
    url(r'^myinstrument/$', 'my_instrument_handler', name="my_instrument"),
    
    
)