from django.conf.urls import patterns, include, url

urlpatterns = patterns('account.views',
    url(r'^$', 'account_top_handler', name="account_top"),
)