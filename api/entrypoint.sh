#!/bin/sh

python generatekey.py
python manage.py makemigrations
python manage.py migrate

exec "$@"
