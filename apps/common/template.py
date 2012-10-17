from models import TwitterUser
from django.core.exceptions import ObjectDoesNotExist

def context(request):
    
    profile_image_url = ''
    screen_name = ''
    if request.user.is_authenticated():
        try:
            twuser = TwitterUser.objects.get(user=request.user)
            profile_image_url = twuser.profile_image_url
            screen_name = twuser.screen_name
        except ObjectDoesNotExist:
            pass
        
    
    return {'screen_name':screen_name,
            'profile_image_url':profile_image_url,
            'is_logged_in': request.user.is_authenticated()}
    