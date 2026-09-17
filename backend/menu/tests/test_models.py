from decimal import Decimal

from django.test import TestCase

from menu.models import Category, MenuItem


class MenuModelTests(TestCase):
    def test_category_str_and_ordering(self):
        category = Category.objects.create(name='Coffee', slug='coffee', sort_order=1)
        self.assertEqual(str(category), 'Coffee')

    def test_menu_item_price_is_decimal(self):
        category = Category.objects.create(name='Coffee', slug='coffee')
        item = MenuItem.objects.create(category=category, name='Espresso', slug='espresso', price=Decimal('120000.50'))
        self.assertEqual(item.price, Decimal('120000.50'))
