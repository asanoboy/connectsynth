from settings_base import *
import os

if os.environ.has_key('AWS_ACCESS_KEY_ID') and os.environ.has_key('AWS_SECRET_ACCESS_KEY') and os.environ.has_key('AWS_STORAGE_BUCKET_NAME'):
    AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
    AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
    AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto.S3BotoStorage'

if os.environ.has_key("DEBUG") and os.environ["DEBUG"]=="1":
    DEBUG = True
    