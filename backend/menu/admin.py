from django.contrib import admin

from .models import Category, MenuItem


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'sort_order', 'is_active', 'created_at', 'updated_at')
    list_filter = ('is_active', 'created_at', 'updated_at')
    search_fields = ('name', 'slug', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('sort_order', 'name')
    list_editable = ('sort_order', 'is_active')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_available', 'is_featured', 'sort_order', 'updated_at')
    list_filter = ('category', 'is_available', 'is_featured', 'created_at', 'updated_at')
    search_fields = ('name', 'slug', 'description', 'category__name')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('category__sort_order', 'sort_order', 'name')
    list_editable = ('price', 'is_available', 'is_featured', 'sort_order')
    list_select_related = ('category',)
    readonly_fields = ('created_at', 'updated_at')
