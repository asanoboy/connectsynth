from django.conf.urls import patterns, include, url

urlpatterns = patterns('sdk.views',
    ### private ###
    
    url(r'^workspace/instrument/$', 
            'sdk_instrument_workspace_handler', name="sdk_instrument_workspace"),
    url(r'^workspace/extend_instrument/(?P<code>.+)/$', 
            'sdk_extend_instrument_handler', name="sdk_extend_instrument"),
    
    # publish
    url(r'^workspace/publish/(?P<code>.+)/$', 
            'sdk_publish_api_handler', name="sdk_publish_api"),
    
    ### public ###
    
    url(r'^instrument/(?P<code>.+)/$', 
            'sdk_instrument_player_handler', name="sdk_instrument_player"),
)

# PRESET API
urlpatterns += patterns('sdk.views.preset',
    url(r'^preset/post/(?P<code>[^/]+)/$', 
            'sdk_preset_post_handler', name="sdk_preset_post"),
    url(r'^preset/delete/(?P<code>[^/]+)/$', 
            'sdk_preset_delete_handler', name="sdk_preset_delete"),
    url(r'^preset/list/(?P<code>[^/]+)/$', 
            'sdk_preset_list_handler', name="sdk_preset_list"),
)

# PLUGIN API
urlpatterns += patterns('sdk.views.plugin',
    url(r'^plugin/filelist/(?P<code>.+)/$', 
            'sdk_plugin_filelist_api_handler', name="sdk_plugin_filelist_api"),
    url(r'^plugin/description/(?P<code>[^/]+)/$', 
            'sdk_plugin_description_api_handler', name="sdk_plugin_description_api"),
    url(r'^plugin/information/(?P<code>[^/]+)/$', 
            'sdk_plugin_information_api_handler', name="sdk_plugin_information_api"),
    url(r'^plugin/delete/(?P<code>.+)/$', 
            'sdk_plugin_delete_handler', name="sdk_plugin_delete"),
                        
    url(r'^plugin/(?P<code>[^/]+)/$', 
            'sdk_plugin_api_handler', name="sdk_plugin_api"),
    url(r'^plugin/(?P<code>[^/]+)/(?P<path>.*)$', # allow path empty in order to validate reverse('sdk_get_api', args=['']) <= empty string
            'sdk_plugin_get_api_handler', name="sdk_plugin_get_api"),
    
    
)