import hashlib
from common.models import TwitterUser
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.core.exceptions import ObjectDoesNotExist

def twitter_login(request, me):#twitterid, screen_name):
    
    password = hashlib.md5(str(me.id)).hexdigest()
    
    try:
        twitter_user = TwitterUser.objects.get(twitterid=me.id)
        user = twitter_user.user
    except ObjectDoesNotExist:
        username = hashlib.md5(me.screen_name).hexdigest()
        username = username[0:20] # The admin.User.username is limited under 30 chars. 
        user = User.objects.create_user(
                username=username,
                email='', 
                password=password)
        twitter_user = TwitterUser.objects.create(twitterid=me.id,
                                                  user=user,
                                                  screen_name=me.screen_name,
                                                  profile_image_url=me.profile_image_url)
    if user.is_active:
        login_user = authenticate(username=user.username, 
                                  password=password)
        
        if login_user.is_active:
            login(request, login_user)
            return True
    
    return False    