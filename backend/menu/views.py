from rest_framework import generics

from .models import Category, MenuItem
from .serializers import CategorySerializer, MenuItemSerializer


class ActiveCategoryQuerySetMixin:
    def get_queryset(self):
        return Category.objects.filter(is_active=True).prefetch_related('items')


class CategoryListView(ActiveCategoryQuerySetMixin, generics.ListAPIView):
    serializer_class = CategorySerializer


class CategoryDetailView(ActiveCategoryQuerySetMixin, generics.RetrieveAPIView):
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class MenuItemListView(generics.ListAPIView):
    serializer_class = MenuItemSerializer

    def get_queryset(self):
        queryset = MenuItem.objects.filter(
            category__is_active=True,
            is_available=True,
        ).select_related('category')
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category, category__is_active=True)
        return queryset


class MenuItemDetailView(generics.RetrieveAPIView):
    serializer_class = MenuItemSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return MenuItem.objects.filter(
            category__is_active=True,
            is_available=True,
        ).select_related('category')
