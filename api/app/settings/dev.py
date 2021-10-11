from app.settings.base import *
import configparser

config = configparser.ConfigParser(interpolation=None)
config.read('./config.ini')
dev_config = config['DEV']

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = dev_config.get("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = int(dev_config.get("DEBUG", 0))

ALLOWED_HOSTS = dev_config.get("DJANGO_ALLOWED_HOSTS").split(" ")

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": dev_config.get("SQL_ENGINE", "django.db.backends.sqlite3"),
        "NAME": dev_config.get("SQL_DATABASE", BASE_DIR / "db.sqlite3"),
        "USER": dev_config.get("SQL_USER", "user"),
        "PASSWORD": dev_config.get("SQL_PASSWORD", "password"),
        "HOST": dev_config.get("SQL_HOST", "localhost"),
        "PORT": dev_config.get("SQL_PORT", "5432"),
    }
}
