#!/usr/local/bin/python
import os, sys
sys.path.append('/usr/local/beni/projects/connectsynth')

os.environ['DJANGO_SETTINGS_MODULE'] = 'connectsynth.settings'

import django.core.handlers.wsgi

application = django.core.handlers.wsgi.WSGIHandler()

