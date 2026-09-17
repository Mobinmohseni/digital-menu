from decimal import Decimal

from django.core.management.base import BaseCommand

from menu.models import Category, MenuItem


class Command(BaseCommand):
    help = 'Create/update sample categories and menu items.'

    def handle(self, *args, **options):
        data = {
            'coffee': {
                'name': 'Coffee', 'description': 'Hot and cold coffee drinks.', 'sort_order': 1,
                'items': [
                    ('espresso', 'Espresso', 'Classic single espresso.', '120000.00', 1, True),
                    ('americano', 'Americano', 'Espresso with hot water.', '140000.00', 2, False),
                    ('cappuccino', 'Cappuccino', 'Espresso with steamed milk and foam.', '180000.00', 3, True),
                ],
            },
            'tea': {
                'name': 'Tea', 'description': 'Tea and herbal infusions.', 'sort_order': 2,
                'items': [
                    ('black-tea', 'Black Tea', 'Fresh brewed black tea.', '90000.00', 1, False),
                    ('herbal-tea', 'Herbal Tea', 'Aromatic herbal infusion.', '110000.00', 2, False),
                ],
            },
            'desserts': {
                'name': 'Desserts', 'description': 'Fresh desserts and sweet treats.', 'sort_order': 3,
                'items': [
                    ('cheesecake', 'Cheesecake', 'Creamy cheesecake with berry sauce.', '220000.00', 1, True),
                    ('chocolate-cake', 'Chocolate Cake', 'Rich chocolate cake.', '200000.00', 2, False),
                ],
            },
        }

        for slug, category_data in data.items():
            items = category_data.pop('items')
            category, _ = Category.objects.update_or_create(
                slug=slug,
                defaults={**category_data, 'is_active': True},
            )
            for item_slug, name, description, price, sort_order, featured in items:
                MenuItem.objects.update_or_create(
                    slug=item_slug,
                    defaults={
                        'category': category,
                        'name': name,
                        'description': description,
                        'price': Decimal(price),
                        'sort_order': sort_order,
                        'is_available': True,
                        'is_featured': featured,
                    },
                )

        self.stdout.write(self.style.SUCCESS('Sample menu data created/updated successfully.'))
