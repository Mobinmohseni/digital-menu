from django.urls import path

from .views import CategoryDetailView, CategoryListView, MenuItemDetailView, MenuItemListView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('categories/<slug:slug>/', CategoryDetailView.as_view(), name='category-detail'),
    path('menu-items/', MenuItemListView.as_view(), name='menu-item-list'),
    path('menu-items/<slug:slug>/', MenuItemDetailView.as_view(), name='menu-item-detail'),
]
