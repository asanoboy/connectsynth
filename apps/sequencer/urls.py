from django.conf.urls import patterns, include, url


urlpatterns = patterns('sequencer.views',
    ### private ###
    url(r'^$',\
            'open_sequencer_handler', \
            name="open_sequencer"),
)
