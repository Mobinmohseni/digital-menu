from django.db import migrations, models
import django.core.validators
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('slug', models.SlugField(allow_unicode=True, max_length=140, unique=True)),
                ('description', models.TextField(blank=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='categories/%Y/%m/')),
                ('sort_order', models.PositiveIntegerField(db_index=True, default=0)),
                ('is_active', models.BooleanField(db_index=True, default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={'ordering': ['sort_order', 'name']},
        ),
        migrations.CreateModel(
            name='MenuItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=160)),
                ('slug', models.SlugField(allow_unicode=True, max_length=180, unique=True)),
                ('description', models.TextField(blank=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=12, validators=[django.core.validators.MinValueValidator(0)])),
                ('image', models.ImageField(blank=True, null=True, upload_to='menu-items/%Y/%m/')),
                ('is_available', models.BooleanField(db_index=True, default=True)),
                ('is_featured', models.BooleanField(db_index=True, default=False)),
                ('sort_order', models.PositiveIntegerField(db_index=True, default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='items', to='menu.category')),
            ],
            options={'ordering': ['sort_order', 'name']},
        ),
        migrations.AddIndex(model_name='category', index=models.Index(fields=['is_active', 'sort_order'], name='menu_catego_is_acti_4a0f31_idx')),
        migrations.AddIndex(model_name='menuitem', index=models.Index(fields=['category', 'is_available', 'sort_order'], name='menu_menuite_catego_5bd99b_idx')),
        migrations.AddIndex(model_name='menuitem', index=models.Index(fields=['is_featured', 'is_available'], name='menu_menuite_is_feat_8a67d7_idx')),
    ]
