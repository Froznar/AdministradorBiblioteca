
from django.contrib import admin
from django.urls import path, include
from books import views

from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),

    path('token-auth/', obtain_jwt_token),
    path('autentication/', include('autentication.urls')),
    
    url(r'^api/books/$', views.books_list),
    url(r'^api/books/(?P<id>[0-9]+)$', views.book_detail),
]
