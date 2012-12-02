from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import render_to_response
#from django.core.urlresolvers import reverse
from django.views.decorators.csrf import csrf_exempt

from django.core.exceptions import ObjectDoesNotExist

from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse

from helpers import twitter_login

import tweepy

CONSUMER_KEY = settings.TWITTER_CONSUMER_KEY
CONSUMER_SECRET = settings.TWITTER_CONSUMER_SECRET

"""
Show login form page.
"""
def login_page_handler(request):
    form = AuthenticationForm()
    return render_to_response('login_document.html', {
        'form': form,
 #       'reverse': reverse,
    }, context_instance=RequestContext(request))
    
    
"""
Following 4 handlers assume that POST request is AJAX, and do not redirect.
Redirect handling depends on ajax request caller. 
"""
def login_handler(request):
    if request.method == "POST":
        form = AuthenticationForm(None, request.POST or None)
        if form.is_valid():
            user = authenticate(
                username=form.cleaned_data['username'], 
                password=form.cleaned_data['password'])
            if user.is_active:
                login(request, user)
                return HttpResponse('1')
            else:
                #TODO: Show that account is not active.
                return HttpResponse(form.errors)   
            
        else:
            #TODO: Show errors.
            return HttpResponse(str(form.errors))
                
    elif request.method == "GET":
        form = AuthenticationForm()
        return render_to_response('login.html', {
            'form': form,
        }, context_instance=RequestContext(request))
    else:
        pass    

def logout_handler(request):
    logout(request)
    return HttpResponse('1')
    

def register_handler(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = User.objects.create_user(
                username=form.cleaned_data['username'],
                email=form.cleaned_data['username'], 
                password=form.cleaned_data['password1'])
            if user.is_active:
                #login(request, user)
                user = authenticate(
                    username=form.cleaned_data['username'], 
                    password=form.cleaned_data['password1'])
                if user.is_active:
                    login(request, user)
                    return HttpResponse('1')
            else:
                #TODO: SYSTEM ERROR!!
                return HttpResponse('0')   
            
        else:
            #TODO: Show errors.
            # print form.errors
            return HttpResponse('0')
        
    elif request.method == "GET":
        form = UserCreationForm()
        return render_to_response('register.html', {
            'form': form
        }, context_instance=RequestContext(request))
    else:
        pass


def unregister_handler(reqeust):
    if request.method == "POST":
        user = request.user
        if user.is_authenticated():
            user.is_active = False
            user.save()
    
        return HttpResponse('1')
    
    else:
        return HttpResponse('0')




def autho_twitter_auth_handler(request):
    
    url=request.GET.get("next")
    if url:
        request.session['next'] = url
    
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    """, "%s://%s%s" % (
                            "https", 
                            request.META['HTTP_HOST'], 
                            reverse("autho_twitter_callback")) )
    """
    try:
        auth_url = auth.get_authorization_url()
    except tweepy.TweepError:
        print "Error!"
    
    request.session['request_token'] = (auth.request_token.key, auth.request_token.secret)
    return HttpResponseRedirect(auth_url)


def autho_twitter_callback_handler(request):
    
    verifier = request.GET.get('oauth_verifier')
    
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    
    token = request.session.get('request_token')
    if not token:
        return HttpResponse("invalid request")
        
    del request.session['request_token']
    auth.set_request_token(token[0], token[1])
    
    try:
        auth.get_access_token(verifier)
    except tweepy.TweepError as (errno):
        print "Error! (%s):" % (errno)
    
    request.session['twkey'] = auth.access_token.key
    request.session['twsecret'] = auth.access_token.secret
    
    api = tweepy.API(auth)
    
    try:
        me = api.me()
    except tweepy.TweepError:
        return HttpResponse( "invalid access" )
    
    #return HttpResponse( reduce(lambda a, b: a+"<br/>"+b, dir(me)) )
    
    if twitter_login(request, me):#me.id, me.screen_name):
        #return HttpResponseRedirect( request.session.get('next') or reverse("toppage") )
        return HttpResponseRedirect( reverse("toppage") )
    else:
        return HttpResponse( "invalid access" )

