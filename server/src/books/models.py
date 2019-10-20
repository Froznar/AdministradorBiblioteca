from django.db import models

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    publication_date = models.DateTimeField(auto_now_add=True, )
    edition = models.CharField(max_length=255)
    img_src = models.CharField(max_length=255)
    stock = models.PositiveSmallIntegerField(default=0)

    def __str__(self):
        return self.title