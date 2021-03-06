from settings_base import *

DEBUG = True
TEMPLATE_DEBUG = DEBUG

# override
DATABASES = {    
    'default': {
        'ENGINE': 'django.db.backends.sqlite3', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': os.path.join(BASE_DIR, 'sqlite.db'),                      # Or path to database file if using sqlite3.
        'USER': '',                      # Not used with sqlite3.
        'PASSWORD': '',                  # Not used with sqlite3.
        'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    },
}

# If use mod_wsgi, enable STATIC_ROOT
#STATIC_ROOT = os.path.join(BASE_DIR, 'static')

INTERNAL_IPS = ('192.168.1.42','127.0.0.1')

if DEBUG:
    STATIC_ROOT = ''
else:
    STATIC_ROOT = os.path.join(BASE_DIR, 'static')