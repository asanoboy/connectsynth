from django.conf.urls import patterns, include, url

urlpatterns = patterns('sdk.views',
    ### private ###
    
    url(r'^workspace/instrument/$', 
            'sdk_instrument_workspace_handler', name="sdk_instrument_workspace"),
    url(r'^workspace/extend_instrument/(?P<code>.+)/$', 
            'sdk_extend_instrument_handler', name="sdk_extend_instrument"),
    
    url(r'^workspace/plugin/(?P<code>[^/]+)/$', 
            'sdk_restful_api_handler', name="sdk_restful_api"),
    url(r'^workspace/plugin/(?P<code>[^/]+)/(?P<path>.+)$', 
            'sdk_private_get_api_handler', name="sdk_private_get_api"),
    
    # preset
    url(r'^workspace/preset/post/(?P<code>[^/]+)/$', 
            'sdk_preset_post_api_handler', name="sdk_preset_post_api"),
    url(r'^workspace/preset/delete/(?P<code>[^/]+)/$', 
            'sdk_preset_delete_api_handler', name="sdk_preset_delete_api"),
    url(r'^workspace/preset/list/(?P<code>[^/]+)/$', 
            'sdk_private_presetlist_handler', name="sdk_private_presetlist"),
    
    url(r'^workspace/filelist/(?P<code>.+)/$', 
            'sdk_private_filelist_api_handler', name="sdk_private_filelist_api"),
                       
    # publish
    url(r'^workspace/publish/(?P<code>.+)/$', 
            'sdk_publish_api_handler', name="sdk_publish_api"),
    
    ### public ###
    
    url(r'^plugin/(?P<code>[^/]+)/(?P<path>.*)$',  # allow path empty in order to validate reverse('sdk_get_api', args=['']) <= empty string
            'sdk_get_api_handler', name="sdk_get_api"),
    url(r'^filelist/(?P<code>.+)/$', 
            'sdk_filelist_api_handler', name="sdk_filelist_api"),
    url(r'^instrument/(?P<code>.+)/$', 
            'sdk_instrument_player_handler', name="sdk_instrument_player"),
                       
    url(r'^instrument/presetlist/(?P<code>[^/]+)/$', 
            'sdk_presetlist_handler', name="sdk_presetlist"),
    
)