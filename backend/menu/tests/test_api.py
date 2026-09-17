from decimal import Decimal

from django.urls import reverse
from rest_framework.test import APITestCase

from menu.models import Category, MenuItem


class MenuAPITests(APITestCase):
    def setUp(self):
        self.active = Category.objects.create(name='Coffee', slug='coffee', is_active=True)
        self.inactive = Category.objects.create(name='Hidden', slug='hidden', is_active=False)
        MenuItem.objects.create(category=self.active, name='Espresso', slug='espresso', price=Decimal('120000'), is_available=True)
        MenuItem.objects.create(category=self.active, name='Sold Out', slug='sold-out', price=Decimal('100000'), is_available=False)
        MenuItem.objects.create(category=self.inactive, name='Hidden Item', slug='hidden-item', price=Decimal('100000'), is_available=True)

    def test_categories_only_active(self):
        response = self.client.get(reverse('category-list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual([x['slug'] for x in response.data], ['coffee'])

    def test_category_detail_by_slug(self):
        response = self.client.get(reverse('category-detail', kwargs={'slug': 'coffee'}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['slug'], 'coffee')

    def test_inactive_category_returns_404(self):
        response = self.client.get(reverse('category-detail', kwargs={'slug': 'hidden'}))
        self.assertEqual(response.status_code, 404)

    def test_menu_items_only_available_and_active_category(self):
        response = self.client.get(reverse('menu-item-list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual([x['slug'] for x in response.data], ['espresso'])
        self.assertEqual(response.data[0]['category']['slug'], 'coffee')

    def test_category_filter(self):
        response = self.client.get(reverse('menu-item-list'), {'category': 'coffee'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual([x['slug'] for x in response.data], ['espresso'])

    def test_menu_item_detail(self):
        response = self.client.get(reverse('menu-item-detail', kwargs={'slug': 'espresso'}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['price'], '120000.00')
