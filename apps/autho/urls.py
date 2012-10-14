from django.conf.urls import patterns, include, url

urlpatterns = patterns('autho.views',
    url(r'^login/$', 'login_page_handler', name="autho_login_page"),
    url(r'^login_/$', 'login_handler', name="autho_login"),
    url(r'^logout_/$', 'logout_handler', name="autho_logout"),
    url(r'^register_/$', 'register_handler', name="autho_register"),
    url(r'^unregister_/$', 'unregister_handler', name="autho_unregister"),


    url(r'^twitter/auth/$', 'autho_twitter_auth_handler', name="autho_twitter_auth"),
    url(r'^twitter/callback/$', 'autho_twitter_callback_handler', name="autho_twitter_callback"),
    
)