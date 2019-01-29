from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
class Team(models.Model):
    number = models.IntegerField()
    name = models.CharField(max_length = 255)

    def __str__(self):
        return str(self.number) + ": " + str(self.name)
class MatchStartStatus(models.Model):
    status = models.CharField(max_length = 255) 
    
    @property
    @classmethod
    def defaults(cls):
        return ("Level 1", "Level 2")

class MatchEndStatus(models.Model):
    status = models.CharField(max_length = 255) 
    
    @property
    @classmethod
    def defaults(cls):
        return ("Level 1", "Level 2", "Level 3", "Missed End Game", "Disabled", "Incapacitated")

class GameTime(models.Model):
    time = models.CharField(max_length = 255)

    @property
    @classmethod
    def defaults(cls):
        return ("Sandstorm", "Teleop")

class CargoFrom(models.Model):
    location = models.CharField(max_length = 255)

    @property
    @classmethod
    def defaults(cls):
        return ('Prepopulated', 'Ground')

class HatchFrom(models.Model):
    location = models.CharField(max_length = 255)

    @property
    @classmethod
    def defaults(cls):
        return ('Prepopulated', 'Ground', 'Loading Station')

class ScoreLocation(models.Model):
    location = models.CharField(max_length = 255)

    @property
    @classmethod
    def defaults(cls):
        return ('Cargo Ship', 'Rocket Level 1', 'Rocket Level 2', 'Rocket Level 3', 'Dropped')

class CargoScored(models.Model):
    when = models.ForeignKey('GameTime', on_delete=models.CASCADE)
    got_from = models.ForeignKey('CargoFrom', on_delete=models.CASCADE)
    scored_where = models.ForeignKey('ScoreLocation', on_delete=models.CASCADE)
    match = models.ForeignKey('ScoutedMatch', on_delete=models.CASCADE, null=True)

class HatchScored(models.Model):
    when = models.ForeignKey('GameTime', on_delete=models.CASCADE)
    got_from = models.ForeignKey('HatchFrom', on_delete=models.CASCADE)
    scored_where = models.ForeignKey('ScoreLocation', on_delete=models.CASCADE)
    match = models.ForeignKey('ScoutedMatch', on_delete=models.CASCADE, null=True)

class Tournament(models.Model):
    name = models.CharField(max_length=200, default="UNAMED")
    event_code = models.CharField(max_length=200, default="UNAMED")

    def __str__(self):
        return self.name


class ScoutedMatch(models.Model):
    number = models.IntegerField()
    tournament = models.ForeignKey('Tournament', on_delete=models.CASCADE)
    team = models.ForeignKey('Team', on_delete=models.CASCADE)
    start_status = models.ForeignKey('MatchStartStatus', on_delete=models.CASCADE)
    end_status = models.ForeignKey('MatchEndStatus', on_delete=models.CASCADE)
    scouted_by = models.ForeignKey('MyUser', on_delete=models.CASCADE)

class MyUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    team = models.ForeignKey('Team', on_delete=models.CASCADE, null=True)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return str(self.team) + ": " + self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_perms(self, list, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
